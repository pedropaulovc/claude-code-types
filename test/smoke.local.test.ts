/**
 * Smoke test: parse every JSONL file in ~/.claude/projects/ and validate
 * that each line has a known `type` discriminator.
 *
 * Exits with code 1 if any line fails to parse or has an unknown type.
 */

import { readFileSync, readdirSync, statSync } from 'fs';
import { join } from 'path';
import { homedir } from 'os';
import type { TranscriptEntry } from '../index';

const KNOWN_TYPES = new Set([
  'user',
  'assistant',
  'system',
  'file-history-snapshot',
  'pr-link',
  'progress',
  'queue-operation',
  'saved_hook_context',
  'summary',
]);

function findJsonlFiles(dir: string): string[] {
  const results: string[] = [];
  try {
    for (const entry of readdirSync(dir)) {
      const full = join(dir, entry);
      const stat = statSync(full, { throwIfNoEntry: false });
      if (!stat) continue;
      if (stat.isDirectory()) {
        results.push(...findJsonlFiles(full));
        continue;
      }
      if (entry.endsWith('.jsonl')) {
        results.push(full);
      }
    }
  } catch {
    // skip inaccessible directories
  }
  return results;
}

const projectsDir = join(homedir(), '.claude', 'projects');
const files = findJsonlFiles(projectsDir);

if (files.length === 0) {
  console.log('No .jsonl files found in', projectsDir, '— skipping (CI)');
  process.exit(0);
}

let totalFiles = 0;
let totalLines = 0;
let totalErrors = 0;
const typeCounts = new Map<string, number>();

for (const file of files) {
  totalFiles++;
  const lines = readFileSync(file, 'utf-8').split('\n').filter(Boolean);

  for (let i = 0; i < lines.length; i++) {
    totalLines++;
    let entry: TranscriptEntry;
    try {
      entry = JSON.parse(lines[i]) as TranscriptEntry;
    } catch (err) {
      console.error(`  PARSE ERROR: ${file}:${i + 1}: ${err}`);
      totalErrors++;
      continue;
    }

    const type = (entry as { type?: string }).type;
    if (!type) {
      console.error(`  MISSING TYPE: ${file}:${i + 1}`);
      totalErrors++;
      continue;
    }

    typeCounts.set(type, (typeCounts.get(type) ?? 0) + 1);

    if (!KNOWN_TYPES.has(type)) {
      console.error(`  UNKNOWN TYPE "${type}": ${file}:${i + 1}`);
      totalErrors++;
    }
  }
}

console.log(`\nFiles:  ${totalFiles}`);
console.log(`Lines:  ${totalLines}`);
console.log(`Errors: ${totalErrors}`);
console.log('\nType distribution:');
for (const [type, count] of [...typeCounts.entries()].sort((a, b) => b[1] - a[1])) {
  const pct = ((count / totalLines) * 100).toFixed(1);
  console.log(`  ${type.padEnd(25)} ${String(count).padStart(8)}  (${pct}%)`);
}

if (totalErrors > 0) {
  console.error(`\nFAILED: ${totalErrors} errors`);
  process.exit(1);
}

console.log('\nPASSED');
