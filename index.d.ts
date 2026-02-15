/**
 * Type definitions for Claude Code chat history JSONL files.
 *
 * Claude Code stores conversation history at:
 *   ~/.claude/projects/<project-slug>/<session-id>.jsonl
 *
 * Each line is a JSON object conforming to the `TranscriptEntry` union type.
 *
 * Usage:
 *   import type { TranscriptEntry } from 'claude-code-types';
 *   const entry: TranscriptEntry = JSON.parse(line);
 */

// ---------------------------------------------------------------------------
// Top-level entry union
// ---------------------------------------------------------------------------

export type TranscriptEntry =
  | UserEntry
  | AssistantEntry
  | SystemEntry
  | FileHistorySnapshotEntry
  | PrLinkEntry
  | ProgressEntry
  | QueueOperationEntry
  | SavedHookContextEntry
  | SummaryEntry;

// ---------------------------------------------------------------------------
// Shared base fields (present on most entries that represent conversation turns)
// ---------------------------------------------------------------------------

interface EntryBase {
  uuid: string;
  parentUuid: string | null;
  isSidechain: boolean;
  sessionId: string;
  timestamp: string;
  cwd: string;
  version: string;
  gitBranch?: string;
  slug?: string;
  teamName?: string;
  userType: 'external';
}

// ---------------------------------------------------------------------------
// User entry
// ---------------------------------------------------------------------------

export interface UserEntry extends EntryBase {
  type: 'user';
  message: UserMessage;
  isMeta?: boolean;
  isCompactSummary?: boolean;
  isVisibleInTranscriptOnly?: boolean;
  imagePasteIds?: string[];
  permissionMode?: PermissionMode;
  planContent?: string;
  thinkingMetadata?: ThinkingMetadata;
  todos?: Todo[];
  /** Present when this user message is a tool result being delivered back */
  toolUseResult?: unknown;
  /** UUID of the assistant message whose tool_use triggered this result */
  sourceToolAssistantUUID?: string;
  /** ID of the tool_use content block this result corresponds to */
  sourceToolUseID?: string;
}

export interface UserMessage {
  role: 'user';
  content: string | UserContentBlock[];
}

export type UserContentBlock =
  | TextBlock
  | ImageBlock
  | DocumentBlock
  | ToolResultBlock;

// ---------------------------------------------------------------------------
// Assistant entry
// ---------------------------------------------------------------------------

export interface AssistantEntry extends EntryBase {
  type: 'assistant';
  message: AssistantMessage;
  requestId?: string;
  /** Present when the API returned an error instead of a response */
  apiError?: unknown;
  error?: string;
  isApiErrorMessage?: boolean;
}

export interface AssistantMessage {
  role: 'assistant';
  id?: string;
  type?: 'message';
  model?: Model;
  content: AssistantContentBlock[];
  stop_reason: StopReason | null;
  stop_sequence?: string | null;
  usage?: Usage;
  container?: unknown;
  context_management?: unknown;
}

export type AssistantContentBlock =
  | TextBlock
  | ThinkingBlock
  | RedactedThinkingBlock
  | ToolUseBlock
  | ServerToolUseBlock
  | WebSearchToolResultBlock;

// ---------------------------------------------------------------------------
// System entry (multiple subtypes)
// ---------------------------------------------------------------------------

export interface SystemEntry extends Partial<EntryBase> {
  type: 'system';
  subtype: SystemSubtype;
  isMeta?: boolean;
  content?: string;
  level?: string;
  /** turn_duration */
  durationMs?: number;
  /** api_error */
  error?: string;
  cause?: string;
  retryAttempt?: number;
  retryInMs?: number;
  maxRetries?: number;
  /** compact_boundary */
  compactMetadata?: CompactMetadata;
  /** microcompact_boundary */
  microcompactMetadata?: MicrocompactMetadata;
  /** stop_hook_summary */
  hookCount?: number;
  hookErrors?: unknown[];
  hookInfos?: unknown[];
  hasOutput?: boolean;
  stopReason?: string;
  preventedContinuation?: boolean;
  toolUseID?: string;
  logicalParentUuid?: string;
}

export type SystemSubtype =
  | 'api_error'
  | 'compact_boundary'
  | 'informational'
  | 'local_command'
  | 'microcompact_boundary'
  | 'stop_hook_summary'
  | 'turn_duration';

// ---------------------------------------------------------------------------
// File history snapshot (undo/restore tracking)
// ---------------------------------------------------------------------------

export interface FileHistorySnapshotEntry {
  type: 'file-history-snapshot';
  messageId: string;
  isSnapshotUpdate: boolean;
  snapshot: FileHistorySnapshot;
}

export interface FileHistorySnapshot {
  messageId: string;
  timestamp: string;
  trackedFileBackups: Record<string, FileBackup>;
}

export interface FileBackup {
  backupFileName: string;
  version: number;
  backupTime: string;
}

// ---------------------------------------------------------------------------
// PR link
// ---------------------------------------------------------------------------

export interface PrLinkEntry {
  type: 'pr-link';
  sessionId: string;
  timestamp: string;
  prNumber: number;
  prUrl: string;
  prRepository: string;
}

// ---------------------------------------------------------------------------
// Progress (streaming updates for subagent / Task tool)
// ---------------------------------------------------------------------------

export interface ProgressEntry extends Partial<EntryBase> {
  type: 'progress';
  data: ProgressData;
  parentToolUseID?: string;
  toolUseID?: string;
}

export interface ProgressData {
  message: {
    type: 'user' | 'assistant';
    message: UserMessage | AssistantMessage;
    uuid?: string;
    timestamp?: string;
  };
}

// ---------------------------------------------------------------------------
// Queue operation (messages typed while agent is busy)
// ---------------------------------------------------------------------------

export interface QueueOperationEntry {
  type: 'queue-operation';
  operation: 'enqueue' | 'dequeue';
  sessionId: string;
  timestamp: string;
  content: string;
}

// ---------------------------------------------------------------------------
// Saved hook context
// ---------------------------------------------------------------------------

export interface SavedHookContextEntry extends Partial<EntryBase> {
  type: 'saved_hook_context';
  content: string[];
  hookEvent?: string;
  hookName?: string;
  toolUseID?: string;
}

// ---------------------------------------------------------------------------
// Summary
// ---------------------------------------------------------------------------

export interface SummaryEntry {
  type: 'summary';
  summary: string;
  leafUuid: string;
}

// ---------------------------------------------------------------------------
// Content blocks
// ---------------------------------------------------------------------------

export interface TextBlock {
  type: 'text';
  text: string;
  citations?: TextCitation[] | null;
}

export interface ThinkingBlock {
  type: 'thinking';
  thinking: string;
  signature: string;
}

export interface RedactedThinkingBlock {
  type: 'redacted_thinking';
  data: string;
}

export interface ToolUseBlock {
  type: 'tool_use';
  id: string;
  name: BuiltinToolName | (string & {});
  input: Record<string, unknown>;
  /** Present in progress/streaming entries */
  caller?: { type: string };
}

export interface ToolResultBlock {
  type: 'tool_result';
  tool_use_id: string;
  content?: string | TextBlock[];
  is_error?: boolean;
}

export interface ImageBlock {
  type: 'image';
  source: Base64ImageSource | UrlImageSource;
}

export interface DocumentBlock {
  type: 'document';
  source: Base64DocumentSource | PlainTextSource | UrlDocumentSource;
  title?: string | null;
  context?: string | null;
}

export interface ServerToolUseBlock {
  type: 'server_tool_use';
  id: string;
  name: 'web_search';
  input: Record<string, unknown>;
}

export interface WebSearchToolResultBlock {
  type: 'web_search_tool_result';
  tool_use_id: string;
  content: WebSearchResultError | WebSearchResultItem[];
}

// ---------------------------------------------------------------------------
// Media sources
// ---------------------------------------------------------------------------

export interface Base64ImageSource {
  type: 'base64';
  media_type: 'image/jpeg' | 'image/png' | 'image/gif' | 'image/webp';
  data: string;
}

export interface UrlImageSource {
  type: 'url';
  url: string;
}

export interface Base64DocumentSource {
  type: 'base64';
  media_type: 'application/pdf';
  data: string;
}

export interface PlainTextSource {
  type: 'text';
  media_type: 'text/plain';
  data: string;
}

export interface UrlDocumentSource {
  type: 'url';
  url: string;
}

// ---------------------------------------------------------------------------
// Citations
// ---------------------------------------------------------------------------

export type TextCitation =
  | CitationCharLocation
  | CitationPageLocation
  | CitationContentBlockLocation
  | CitationWebSearchResultLocation;

export interface CitationCharLocation {
  type: 'char_location';
  cited_text: string;
  document_index: number;
  document_title: string | null;
  start_char_index: number;
  end_char_index: number;
  file_id: string | null;
}

export interface CitationPageLocation {
  type: 'page_location';
  cited_text: string;
  document_index: number;
  document_title: string | null;
  start_page_number: number;
  end_page_number: number;
  file_id: string | null;
}

export interface CitationContentBlockLocation {
  type: 'content_block_location';
  cited_text: string;
  document_index: number;
  document_title: string | null;
  start_block_index: number;
  end_block_index: number;
  file_id: string | null;
}

export interface CitationWebSearchResultLocation {
  type: 'web_search_result_location';
  cited_text: string;
  encrypted_index: string;
  title: string | null;
  url: string;
}

// ---------------------------------------------------------------------------
// Web search results
// ---------------------------------------------------------------------------

export interface WebSearchResultError {
  type: 'web_search_error';
  error_code: string;
  message: string;
}

export interface WebSearchResultItem {
  type: 'web_search_result';
  url: string;
  title: string;
  encrypted_content: string;
  page_age?: string | null;
}

// ---------------------------------------------------------------------------
// Usage & metadata
// ---------------------------------------------------------------------------

export interface Usage {
  input_tokens: number;
  output_tokens: number;
  cache_creation_input_tokens?: number | null;
  cache_read_input_tokens?: number | null;
  cache_creation?: CacheCreation | null;
  server_tool_use?: ServerToolUsage | null;
  service_tier?: 'standard' | 'priority' | 'batch' | null;
  inference_geo?: string | null;
}

export interface CacheCreation {
  ephemeral_5m_input_tokens: number;
  ephemeral_1h_input_tokens: number;
}

export interface ServerToolUsage {
  web_search_requests: number;
}

export interface CompactMetadata {
  trigger: 'auto' | 'manual';
  preTokens: number;
}

export interface MicrocompactMetadata {
  trigger: 'auto' | 'manual';
  preTokens: number;
  tokensSaved: number;
  compactedToolIds: string[];
}

export interface ThinkingMetadata {
  maxThinkingTokens: number;
}

export interface Todo {
  content: string;
  status: string;
  activeForm?: string;
}

// ---------------------------------------------------------------------------
// Enums / unions
// ---------------------------------------------------------------------------

export type Model =
  | 'claude-opus-4-6'
  | 'claude-opus-4-5-20251101'
  | 'claude-sonnet-4-5-20250929'
  | 'claude-haiku-4-5-20251001'
  | '<synthetic>'
  | (string & {});

export type StopReason =
  | 'end_turn'
  | 'max_tokens'
  | 'stop_sequence'
  | 'tool_use'
  | 'pause_turn'
  | 'refusal';

export type PermissionMode =
  | 'default'
  | 'plan'
  | 'acceptEdits'
  | 'dontAsk'
  | 'bypassPermissions';

/** Built-in Claude Code tools (non-exhaustive — MCP tools use `mcp__<server>__<tool>` pattern) */
export type BuiltinToolName =
  | 'AskUserQuestion'
  | 'Bash'
  | 'Edit'
  | 'EnterPlanMode'
  | 'ExitPlanMode'
  | 'Glob'
  | 'Grep'
  | 'KillShell'
  | 'ListMcpResourcesTool'
  | 'NotebookEdit'
  | 'Read'
  | 'ReadMcpResourceTool'
  | 'SendMessage'
  | 'Skill'
  | 'Task'
  | 'TaskCreate'
  | 'TaskGet'
  | 'TaskList'
  | 'TaskOutput'
  | 'TaskStop'
  | 'TaskUpdate'
  | 'TodoWrite'
  | 'WebFetch'
  | 'WebSearch'
  | 'Write';

// ---------------------------------------------------------------------------
// Parser helper type
// ---------------------------------------------------------------------------

/**
 * Parse a single JSONL line into a typed TranscriptEntry.
 *
 * @example
 * ```ts
 * import type { TranscriptEntry } from 'claude-code-types';
 * import { readFileSync } from 'fs';
 *
 * const entries: TranscriptEntry[] = readFileSync(path, 'utf-8')
 *   .split('\n')
 *   .filter(Boolean)
 *   .map(line => JSON.parse(line) as TranscriptEntry);
 *
 * for (const entry of entries) {
 *   switch (entry.type) {
 *     case 'user':       console.log(entry.message.content); break;
 *     case 'assistant':  console.log(entry.message.model);   break;
 *     case 'system':     console.log(entry.subtype);         break;
 *   }
 * }
 * ```
 */
export type ParseLine = (line: string) => TranscriptEntry | null;
