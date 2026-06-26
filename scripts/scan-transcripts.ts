/**
 * Comprehensive transcript scanner — the tool to run before every release.
 *
 * Walks every JSONL file under `~/.claude/projects/` (or `--dir <path>`),
 * collects the observed value of every discriminator / union the package
 * models, and diffs it against what `index.d.ts` currently declares. Anything
 * the types don't yet cover is reported with a count and a representative
 * sample so it can be added quickly.
 *
 * Coverage:
 *   - top-level entry `type`            (TranscriptEntry)
 *   - `system.subtype`                  (SystemSubtype)
 *   - `attachment.type`                 (Attachment)
 *   - tool_use `name`, non-MCP          (BuiltinToolName)   + MCP server tally
 *     (bare-logged MCP tools — a lone `firecrawl_scrape` next to the prefixed
 *      `mcp__..._firecrawl_scrape` — are recognized as MCP, not built-in)
 *   - `server_tool_use.name`            (ServerToolUseBlock.name)
 *   - assistant `message.model`         (Model)
 *   - `stop_reason`                     (StopReason)
 *   - permission modes                  (PermissionMode)
 *   - `queue-operation.operation`       (QueueOperationEntry.operation)
 *   - `cache_miss_reason.type`          (CacheMissReasonType)
 *   - assistant / user / tool_result content block `type`s
 *   - citation `type`s                  (TextCitation)
 *   - image source `media_type`         (Base64ImageSource.media_type)
 *   - undeclared top-level fields per entry type (candidate new optional fields)
 *
 * Usage:
 *   npm run scan                 # human report, scans ~/.claude/projects
 *   npm run scan -- --dir PATH   # scan a specific directory
 *   npm run scan -- --dts PATH   # diff against a specific index.d.ts (default: this package's)
 *   npm run scan -- --json       # machine-readable delta report
 *   npm run scan -- --no-samples # omit sample JSON for new values
 *
 * Exit code: 1 if any new discriminator/union value is found (so it can gate a
 * release or CI), 0 if the types fully cover the corpus. Undeclared fields are
 * reported as warnings and do not by themselves set a non-zero exit.
 */

import { readFileSync, readdirSync, statSync } from 'fs';
import { join } from 'path';
import { homedir } from 'os';
import { extractTypes, discriminatorsOf, defaultDtsPath, type ExtractedTypes } from './lib/extract-types.ts';

// --------------------------------------------------------------------------
// args
// --------------------------------------------------------------------------
const argv = process.argv.slice(2);
function flag(name: string): boolean { return argv.includes(name); }
function opt(name: string): string | undefined {
  const i = argv.indexOf(name);
  return i >= 0 ? argv[i + 1] : undefined;
}
const SCAN_DIR = opt('--dir') ?? join(homedir(), '.claude', 'projects');
const DTS_PATH = opt('--dts') ?? defaultDtsPath();
const AS_JSON = flag('--json');
const SHOW_SAMPLES = !flag('--no-samples');

// --------------------------------------------------------------------------
// observed-value collector: value -> count, plus one representative sample
// --------------------------------------------------------------------------
interface Sample { file: string; line: number; json: string; }
class Tally {
  counts = new Map<string, number>();
  samples = new Map<string, Sample>();
  add(value: string | undefined | null, sample?: Sample) {
    if (value === undefined || value === null) return;
    this.counts.set(value, (this.counts.get(value) ?? 0) + 1);
    if (sample && !this.samples.has(value)) this.samples.set(value, sample);
  }
}

const T = {
  entryType: new Tally(),
  systemSubtype: new Tally(),
  attachmentType: new Tally(),
  tool: new Tally(),
  mcpServer: new Tally(),
  serverTool: new Tally(),
  model: new Tally(),
  stopReason: new Tally(),
  permissionMode: new Tally(),
  queueOp: new Tally(),
  cacheMiss: new Tally(),
  assistantBlock: new Tally(),
  userBlock: new Tally(),
  toolResultBlock: new Tally(),
  citation: new Tally(),
  imageMedia: new Tally(),
};
// bare suffixes of every MCP tool seen (the `tool` of `mcp__server__tool`).
// Some skills/plugins log an MCP tool by its bare name with no `mcp__` prefix
// (e.g. "firecrawl_scrape"); used post-scan to keep those out of the
// built-in-tool bucket. See reclassification below.
const mcpToolNames = new Set<string>();
// type -> set of top-level keys seen
const fieldsByType = new Map<string, Set<string>>();
// type -> field -> first representative value (truncated JSON)
const fieldSamples = new Map<string, Map<string, string>>();

function truncate(obj: unknown, depth = 0): unknown {
  if (typeof obj === 'string') return obj.length > 120 ? obj.slice(0, 120) + `…(${obj.length})` : obj;
  if (Array.isArray(obj)) return obj.slice(0, 2).map((x) => truncate(x, depth + 1));
  if (obj && typeof obj === 'object') {
    const o: Record<string, unknown> = {};
    for (const k of Object.keys(obj as object)) o[k] = depth > 3 ? '…' : truncate((obj as any)[k], depth + 1);
    return o;
  }
  return obj;
}

// --------------------------------------------------------------------------
// walk one parsed entry
// --------------------------------------------------------------------------
function walk(entry: any, file: string, line: number) {
  const sample = (): Sample => ({ file, line, json: JSON.stringify(truncate(entry)) });
  const type: string | undefined = entry.type;
  T.entryType.add(type, sample());

  if (typeof type === 'string') {
    const keys = fieldsByType.get(type) ?? new Set<string>();
    let samples = fieldSamples.get(type);
    if (!samples) { samples = new Map<string, string>(); fieldSamples.set(type, samples); }
    for (const k of Object.keys(entry)) {
      keys.add(k);
      if (!samples.has(k) && entry[k] !== undefined && entry[k] !== null)
        samples.set(k, JSON.stringify(truncate(entry[k])));
    }
    fieldsByType.set(type, keys);
  }

  if (type === 'system') T.systemSubtype.add(entry.subtype, sample());
  if (type === 'attachment' && entry.attachment) T.attachmentType.add(entry.attachment.type, { file, line, json: JSON.stringify(truncate(entry.attachment)) });
  if (type === 'permission-mode') T.permissionMode.add(entry.permissionMode, sample());
  if (entry.permissionMode) T.permissionMode.add(entry.permissionMode);
  if (type === 'queue-operation') T.queueOp.add(entry.operation, sample());

  const msgs: any[] = [];
  if (entry.message && typeof entry.message === 'object') msgs.push(entry.message);
  if (type === 'progress' && entry.data?.message?.message) msgs.push(entry.data.message.message);

  for (const m of msgs) {
    if (m.role === 'assistant' || m.model) {
      T.model.add(m.model);
      T.stopReason.add(m.stop_reason);
      const cm = m.diagnostics?.cache_miss_reason?.type;
      if (cm) T.cacheMiss.add(cm);
    }
    if (!Array.isArray(m.content)) continue;
    for (const b of m.content) {
      if (!b || typeof b !== 'object') continue;
      const bt: string = b.type;
      if (m.role === 'assistant') T.assistantBlock.add(bt); else T.userBlock.add(bt);
      if (bt === 'tool_use') {
        const n: string = b.name ?? '';
        if (n.startsWith('mcp__')) {
          const parts = n.split('__');
          T.mcpServer.add(parts[1]);
          const suffix = parts.slice(2).join('__');
          if (suffix) mcpToolNames.add(suffix);
        } else {
          T.tool.add(n, { file, line, json: JSON.stringify(truncate(b)) });
        }
      }
      if (bt === 'server_tool_use') T.serverTool.add(b.name);
      if (bt === 'image' && b.source?.media_type) T.imageMedia.add(b.source.media_type);
      if (bt === 'tool_result' && Array.isArray(b.content))
        for (const rb of b.content) if (rb?.type) T.toolResultBlock.add(rb.type);
      if (bt === 'text' && Array.isArray(b.citations))
        for (const c of b.citations) if (c?.type) T.citation.add(c.type);
    }
  }
}

// --------------------------------------------------------------------------
// file discovery + scan
// --------------------------------------------------------------------------
function findJsonl(dir: string): string[] {
  const out: string[] = [];
  let entries: string[];
  try { entries = readdirSync(dir); } catch { return out; }
  for (const e of entries) {
    const full = join(dir, e);
    const st = statSync(full, { throwIfNoEntry: false });
    if (!st) continue;
    if (st.isDirectory()) out.push(...findJsonl(full));
    else if (e.endsWith('.jsonl')) out.push(full);
  }
  return out;
}

const files = findJsonl(SCAN_DIR);
let totalLines = 0, parseErrors = 0;
for (const file of files) {
  let data: string;
  try { data = readFileSync(file, 'utf-8'); } catch { continue; }
  const lines = data.split('\n');
  for (let i = 0; i < lines.length; i++) {
    const s = lines[i].trim();
    if (!s || !s.startsWith('{')) continue;
    totalLines++;
    let entry: any;
    try { entry = JSON.parse(s); } catch { parseErrors++; continue; }
    try { walk(entry, file, i + 1); } catch { /* tolerate malformed shapes */ }
  }
}

// --------------------------------------------------------------------------
// reclassify bare-logged MCP tools out of the built-in bucket
//
// MCP tools are normally logged as `mcp__server__tool`, but a skill/plugin can
// invoke one programmatically and have it logged by its bare name (e.g. a lone
// "firecrawl_scrape" alongside hundreds of "mcp__claude_ai_Firecrawl__firecrawl_scrape").
// Those are not Claude Code built-ins, so don't report them as new
// BuiltinToolName members. Data-driven: only names that also appear as a known
// MCP tool suffix in this corpus are dropped.
// --------------------------------------------------------------------------
for (const name of [...T.tool.counts.keys()]) {
  if (!mcpToolNames.has(name)) continue;
  T.tool.counts.delete(name);
  T.tool.samples.delete(name);
}

// --------------------------------------------------------------------------
// diff observed vs declared (index.d.ts is the source of truth)
// --------------------------------------------------------------------------
const types: ExtractedTypes = extractTypes(DTS_PATH);
function fieldLits(iface: string, prop: string): Set<string> {
  return types.fieldLiterals.get(iface)?.get(prop) ?? new Set();
}

interface Category {
  label: string;
  declaredAs: string;   // where to add the new value
  observed: Tally;
  known: Set<string>;
}
const categories: Category[] = [
  { label: 'entry type',            declaredAs: 'TranscriptEntry union + new interface',     observed: T.entryType,       known: discriminatorsOf(types, 'TranscriptEntry') },
  { label: 'system.subtype',        declaredAs: 'SystemSubtype',                              observed: T.systemSubtype,   known: types.literalUnions.get('SystemSubtype') ?? new Set() },
  { label: 'attachment.type',       declaredAs: 'Attachment union + new interface',           observed: T.attachmentType,  known: discriminatorsOf(types, 'Attachment') },
  { label: 'tool name (built-in)',  declaredAs: 'BuiltinToolName',                            observed: T.tool,            known: types.literalUnions.get('BuiltinToolName') ?? new Set() },
  { label: 'server_tool_use.name',  declaredAs: 'ServerToolUseBlock.name',                    observed: T.serverTool,      known: fieldLits('ServerToolUseBlock', 'name') },
  { label: 'model',                 declaredAs: 'Model',                                      observed: T.model,           known: types.literalUnions.get('Model') ?? new Set() },
  { label: 'stop_reason',           declaredAs: 'StopReason',                                 observed: T.stopReason,      known: types.literalUnions.get('StopReason') ?? new Set() },
  { label: 'permission mode',       declaredAs: 'PermissionMode',                             observed: T.permissionMode,  known: types.literalUnions.get('PermissionMode') ?? new Set() },
  { label: 'queue operation',       declaredAs: 'QueueOperationEntry.operation',              observed: T.queueOp,         known: fieldLits('QueueOperationEntry', 'operation') },
  { label: 'cache_miss_reason.type',declaredAs: 'CacheMissReasonType',                        observed: T.cacheMiss,       known: types.literalUnions.get('CacheMissReasonType') ?? new Set() },
  { label: 'assistant content block', declaredAs: 'AssistantContentBlock union',             observed: T.assistantBlock,  known: discriminatorsOf(types, 'AssistantContentBlock') },
  { label: 'user content block',    declaredAs: 'UserContentBlock union',                     observed: T.userBlock,       known: discriminatorsOf(types, 'UserContentBlock') },
  { label: 'tool_result block',     declaredAs: 'ToolResultContentBlock union',               observed: T.toolResultBlock, known: discriminatorsOf(types, 'ToolResultContentBlock') },
  { label: 'citation type',         declaredAs: 'TextCitation union',                         observed: T.citation,        known: discriminatorsOf(types, 'TextCitation') },
  { label: 'image media_type',      declaredAs: 'Base64ImageSource.media_type',               observed: T.imageMedia,      known: fieldLits('Base64ImageSource', 'media_type') },
];

interface NewValue { value: string; count: number; sample?: Sample; }
const newByCategory = new Map<string, NewValue[]>();
for (const c of categories) {
  const news: NewValue[] = [];
  for (const [value, count] of c.observed.counts) {
    if (c.known.has(value)) continue;
    news.push({ value, count, sample: c.observed.samples.get(value) });
  }
  if (news.length) newByCategory.set(c.label, news.sort((a, b) => b.count - a.count));
}

// undeclared top-level fields per known entry type
const entryIfaceByType = new Map<string, string>();
for (const [iface, disc] of types.interfaceType) entryIfaceByType.set(disc, iface);
interface FieldGap { type: string; fields: { name: string; sample?: string }[]; }
const fieldGaps: FieldGap[] = [];
for (const [type, keys] of fieldsByType) {
  const iface = entryIfaceByType.get(type);
  if (!iface) continue; // unknown entry type — already reported above
  const declared = types.interfaceFields.get(iface) ?? new Set();
  const undeclared = [...keys].filter((k) => !declared.has(k)).sort();
  if (undeclared.length)
    fieldGaps.push({ type, fields: undeclared.map((name) => ({ name, sample: fieldSamples.get(type)?.get(name) })) });
}

// --------------------------------------------------------------------------
// report
// --------------------------------------------------------------------------
const newCount = [...newByCategory.values()].reduce((n, v) => n + v.length, 0);

if (AS_JSON) {
  console.log(JSON.stringify({
    scanned: { dir: SCAN_DIR, files: files.length, lines: totalLines, parseErrors },
    newValues: Object.fromEntries(newByCategory),
    undeclaredFields: fieldGaps,
  }, null, 2));
  process.exit(newCount > 0 ? 1 : 0);
}

console.log(`Scanned ${files.length} files / ${totalLines} lines (${parseErrors} parse errors) in ${SCAN_DIR}\n`);

if (newCount === 0) {
  console.log('✓ index.d.ts covers every discriminator/union value observed in the corpus.');
} else {
  console.log(`⚠ ${newCount} value(s) NOT covered by index.d.ts:\n`);
  for (const [label, news] of newByCategory) {
    const where = categories.find((c) => c.label === label)!.declaredAs;
    console.log(`  ${label}  →  add to: ${where}`);
    for (const n of news) {
      console.log(`    • ${JSON.stringify(n.value)}  (${n.count}×)`);
      if (SHOW_SAMPLES && n.sample) console.log(`        sample: ${n.sample.json}`);
    }
    console.log('');
  }
}

if (fieldGaps.length) {
  console.log(`\nℹ Undeclared top-level fields on known entry types (candidate new optional fields):`);
  for (const g of fieldGaps) {
    console.log(`  ${g.type}:`);
    for (const f of g.fields) {
      console.log(`    • ${f.name}${SHOW_SAMPLES && f.sample ? `   e.g. ${f.sample}` : ''}`);
    }
  }
}

process.exit(newCount > 0 ? 1 : 0);
