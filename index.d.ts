/**
 * Type definitions for Claude Code chat history JSONL files.
 *
 * Claude Code stores conversation history at:
 *   `~/.claude/projects/<project-slug>/<session-id>.jsonl`
 *
 * Each line is a JSON object conforming to the {@link TranscriptEntry} union type.
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
 *
 * @packageDocumentation
 */

// ---------------------------------------------------------------------------
// Top-level entry union
// ---------------------------------------------------------------------------

/** Discriminated union of all JSONL line types. Switch on `entry.type` to narrow. */
export type TranscriptEntry =
  | UserEntry
  | AssistantEntry
  | SystemEntry
  | AttachmentEntry
  | AgentNameEntry
  | AgentSettingEntry
  | AiTitleEntry
  | BridgeSessionEntry
  | CustomTitleEntry
  | ModeEntry
  | PermissionModeEntry
  | FileHistorySnapshotEntry
  | LastPromptEntry
  | PrLinkEntry
  | ProgressEntry
  | QueueOperationEntry
  | SavedHookContextEntry
  | SummaryEntry
  | WorktreeStateEntry;

// ---------------------------------------------------------------------------
// Shared base fields (present on most entries that represent conversation turns)
// ---------------------------------------------------------------------------

interface EntryBase {
  /** Unique identifier for this entry. */
  uuid: string;
  /** UUID of the parent entry in the conversation tree, or `null` for root. */
  parentUuid: string | null;
  /** Whether this entry is on a side-chain (branched conversation path). */
  isSidechain: boolean;
  sessionId: string;
  /** ISO 8601 timestamp. */
  timestamp: string;
  /** Working directory at the time this entry was created. */
  cwd: string;
  /** Claude Code version string (e.g. `"1.0.33"`). */
  version: string;
  gitBranch?: string;
  /** Project slug derived from the working directory. */
  slug?: string;
  /** Present on entries produced by subagents / Task tool invocations (e.g. `"a4044e6"`). */
  agentId?: string;
  teamName?: string;
  /** How the session was started (e.g. `"cli"`). */
  entrypoint?: string;
  /** Name of the agent that produced this entry (e.g. `"implementer"`, `"tester"`). */
  agentName?: string;
  userType: 'external';
  /** Present when this session was forked from another. */
  forkedFrom?: ForkedFromRef;
}

// ---------------------------------------------------------------------------
// User entry
// ---------------------------------------------------------------------------

/** Human message or tool result delivered back to the model. */
export interface UserEntry extends EntryBase {
  type: 'user';
  message: UserMessage;
  isMeta?: boolean;
  /** When `true`, this message is a compaction summary replacing earlier history. */
  isCompactSummary?: boolean;
  /** When `true`, this message is shown in the transcript UI but not sent to the API. */
  isVisibleInTranscriptOnly?: boolean;
  imagePasteIds?: string[];
  /** Unique identifier for this prompt. */
  promptId?: string;
  /** Origin of this user message (e.g. task notifications). */
  origin?: { kind: string };
  permissionMode?: PermissionMode;
  planContent?: string;
  thinkingMetadata?: ThinkingMetadata;
  todos?: Todo[];
  /** Present when this user message is a tool result being delivered back. */
  toolUseResult?: unknown;
  /** UUID of the assistant message whose tool_use triggered this result. */
  sourceToolAssistantUUID?: string;
  /** ID of the tool_use content block this result corresponds to. */
  sourceToolUseID?: string;
}

/** The `message` payload inside a {@link UserEntry}. */
export interface UserMessage {
  role: 'user';
  content: string | UserContentBlock[];
}

/** Content blocks that can appear in a user message. */
export type UserContentBlock =
  | TextBlock
  | ImageBlock
  | DocumentBlock
  | ToolResultBlock;

// ---------------------------------------------------------------------------
// Assistant entry
// ---------------------------------------------------------------------------

/** Model response, including text, thinking, and tool calls. */
export interface AssistantEntry extends EntryBase {
  type: 'assistant';
  message: AssistantMessage;
  /** Anthropic API request ID for this response. */
  requestId?: string;
  /** Present when the API returned an error instead of a response. */
  apiError?: unknown;
  error?: string;
  isApiErrorMessage?: boolean;
  /** HTTP status code from a failed API response (e.g. `403`). */
  apiErrorStatus?: number;
  /** Full error response text from a failed API call. */
  errorDetails?: string;
  /** Agent type that produced this response (e.g. `"general-purpose"`). */
  attributionAgent?: string;
  /** Skill that produced this response (e.g. `"gstack-entrepreneur:office-hours"`). */
  attributionSkill?: string;
  /** Plugin that produced this response (e.g. `"gstack-entrepreneur"`). */
  attributionPlugin?: string;
}

/**
 * The `message` payload inside an {@link AssistantEntry}.
 *
 * Mirrors the Anthropic Messages API response shape. Note that `stop_reason`
 * is `null` in streaming `message_start` events and only populated in
 * `message_delta`. Stored entries may retain the `null` from partial snapshots.
 */
export interface AssistantMessage {
  role: 'assistant';
  /** Anthropic message ID (e.g. `"msg_01XFDUDYJgAACzvnptvVoYEL"`). Format may change over time. */
  id?: string;
  type?: 'message';
  /** Model that generated this response. See {@link Model}. */
  model?: Model;
  content: AssistantContentBlock[];
  /** `null` during streaming until the final `message_delta` event. */
  stop_reason: StopReason | null;
  stop_sequence?: string | null;
  /** Additional details about why the model stopped. May be `null` during streaming. */
  stop_details?: unknown;
  usage?: Usage;
  /**
   * Present when the code execution tool (beta) was used. Contains `id` and
   * `expires_at` for container reuse. Typed as `unknown` because the schema
   * is still in beta.
   */
  container?: unknown;
  /**
   * Present when context editing strategies were applied (beta).
   * Contains `applied_edits` describing which tool uses or thinking turns
   * were cleared. Typed as `unknown` because the schema is still in beta.
   */
  context_management?: unknown;
  /** Diagnostics about prompt caching behavior for this response. */
  diagnostics?: MessageDiagnostics;
}

/** Content blocks that can appear in an assistant message. */
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

/**
 * Internal system events. Uses `Partial<EntryBase>` — not all base fields
 * are guaranteed present. Switch on `subtype` to determine which optional
 * fields are relevant:
 *
 * - `api_error`: `error`, `cause`, `retryAttempt`, `retryInMs`, `maxRetries`
 * - `compact_boundary`: `compactMetadata`
 * - `microcompact_boundary`: `microcompactMetadata`
 * - `turn_duration`: `durationMs`
 * - `stop_hook_summary`: `hookCount`, `hookErrors`, `hookInfos`, `hasOutput`, `stopReason`, `preventedContinuation`
 */
export interface SystemEntry extends Partial<EntryBase> {
  type: 'system';
  subtype: SystemSubtype;
  isMeta?: boolean;
  content?: string;
  level?: string;
  /** Milliseconds the turn took (subtype `turn_duration`). */
  durationMs?: number;
  /** Error message (subtype `api_error`). */
  error?: string;
  cause?: string;
  retryAttempt?: number;
  retryInMs?: number;
  maxRetries?: number;
  /** Subtype `compact_boundary`. */
  compactMetadata?: CompactMetadata;
  /** Subtype `microcompact_boundary`. */
  microcompactMetadata?: MicrocompactMetadata;
  /** Subtype `stop_hook_summary`. */
  hookCount?: number;
  hookErrors?: unknown[];
  hookInfos?: unknown[];
  hasOutput?: boolean;
  stopReason?: string;
  preventedContinuation?: boolean;
  toolUseID?: string;
  logicalParentUuid?: string;
  /** URL for remote control bridge (subtype `bridge_status`). */
  url?: string;
  /** Number of messages in the turn (subtype `turn_duration`). */
  messageCount?: number;
}

/** Discriminator values for {@link SystemEntry.subtype}. */
export type SystemSubtype =
  | 'api_error'
  | 'compact_boundary'
  | 'informational'
  | 'local_command'
  | 'microcompact_boundary'
  | 'bridge_status'
  | 'away_summary'
  | 'scheduled_task_fire'
  | 'stop_hook_summary'
  | 'turn_duration';

// ---------------------------------------------------------------------------
// Agent name (records the agent name for a session)
// ---------------------------------------------------------------------------

/** Records the agent name for a session. */
export interface AgentNameEntry {
  type: 'agent-name';
  agentName: string;
  sessionId: string;
}

// ---------------------------------------------------------------------------
// Custom title (user-assigned session title)
// ---------------------------------------------------------------------------

/** Records a custom title assigned to a session. */
export interface CustomTitleEntry {
  type: 'custom-title';
  customTitle: string;
  sessionId: string;
}

// ---------------------------------------------------------------------------
// Last prompt (persisted prompt for session resumption)
// ---------------------------------------------------------------------------

/** Records the last prompt text for session resumption. */
export interface LastPromptEntry {
  type: 'last-prompt';
  lastPrompt: string;
  sessionId: string;
  /** UUID of the leaf message this prompt corresponds to. */
  leafUuid?: string;
}

// ---------------------------------------------------------------------------
// File history snapshot (undo/restore tracking)
// ---------------------------------------------------------------------------

/**
 * Tracks file backups for undo/restore. The `messageId` may collide with the
 * immediately following message's `uuid`.
 */
export interface FileHistorySnapshotEntry {
  type: 'file-history-snapshot';
  messageId: string;
  /** `false` for initial snapshot, `true` for incremental updates. */
  isSnapshotUpdate: boolean;
  snapshot: FileHistorySnapshot;
}

/** Snapshot of all tracked file backups at a point in time. */
export interface FileHistorySnapshot {
  messageId: string;
  timestamp: string;
  /** Map of original file path to backup info. */
  trackedFileBackups: Record<string, FileBackup>;
}

/** Backup metadata for a single tracked file. */
export interface FileBackup {
  backupFileName: string;
  version: number;
  backupTime: string;
}

// ---------------------------------------------------------------------------
// PR link
// ---------------------------------------------------------------------------

/** Records a pull request created or linked during the session. */
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

/**
 * Streaming updates from a subagent / Task tool invocation.
 *
 * **Caveat:** Progress entries can be very large (multi-MB) because they may
 * include full `normalizedMessages` snapshots. The `parentToolUseID` may
 * reference UUIDs that don't exist elsewhere in the file.
 */
export interface ProgressEntry extends Partial<EntryBase> {
  type: 'progress';
  data: ProgressData;
  parentToolUseID?: string;
  toolUseID?: string;
}

/** Payload inside a {@link ProgressEntry}. */
export interface ProgressData {
  message: {
    type: 'user' | 'assistant';
    message: UserMessage | AssistantMessage;
    uuid?: string;
    timestamp?: string;
    /** Anthropic API request ID (present on assistant progress messages). */
    requestId?: string;
    /** Tool result payload (present on user progress messages). */
    toolUseResult?: unknown;
  };
}

// ---------------------------------------------------------------------------
// Queue operation (messages typed while agent is busy)
// ---------------------------------------------------------------------------

/** Messages queued by the user while the agent is processing a turn. */
export interface QueueOperationEntry {
  type: 'queue-operation';
  operation: 'enqueue' | 'dequeue' | 'popAll' | 'remove';
  sessionId: string;
  timestamp: string;
  /** Queue message content. Not present on `remove` operations. */
  content?: string;
}

// ---------------------------------------------------------------------------
// Saved hook context
// ---------------------------------------------------------------------------

/** Persisted context from a hook execution. */
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

/** Conversation summary used for context compaction. */
export interface SummaryEntry {
  type: 'summary';
  summary: string;
  /** UUID of the leaf message this summary covers up to. */
  leafUuid: string;
}

// ---------------------------------------------------------------------------
// Attachment entry (context injected into the conversation)
// ---------------------------------------------------------------------------

/**
 * Context attachment injected into the conversation by hooks, tools, or the
 * system. The `attachment` object is a discriminated union — switch on
 * `attachment.type` to narrow.
 */
export interface AttachmentEntry extends EntryBase {
  type: 'attachment';
  attachment: Attachment;
}

/** Discriminated union of attachment payloads. Switch on `type` to narrow. */
export type Attachment =
  | HookSuccessAttachment
  | HookAdditionalContextAttachment
  | HookBlockingErrorAttachment
  | TaskReminderAttachment
  | DeferredToolsDeltaAttachment
  | McpInstructionsDeltaAttachment
  | QueuedCommandAttachment
  | SkillListingAttachment
  | InvokedSkillsAttachment
  | DynamicSkillAttachment
  | AgentMentionAttachment
  | WorkflowKeywordRequestAttachment
  | PlanFileReferenceAttachment
  | DiagnosticsAttachment
  | EditedTextFileAttachment
  | CommandPermissionsAttachment
  | NestedMemoryAttachment
  | PlanModeAttachment
  | PlanModeExitAttachment
  | PlanModeReentryAttachment
  | UltrathinkEffortAttachment
  | GoalStatusAttachment
  | FileAttachment
  | DirectoryAttachment
  | DateChangeAttachment
  | CompanionIntroAttachment
  | CompactFileReferenceAttachment;

/** Discriminator values for {@link Attachment}. */
export type AttachmentType = Attachment['type'];

export interface HookSuccessAttachment {
  type: 'hook_success';
  hookName: string;
  hookEvent: string;
  toolUseID: string;
  content: string;
  stdout: string;
  stderr: string;
  exitCode: number;
  command: string;
  durationMs: number;
}

export interface HookAdditionalContextAttachment {
  type: 'hook_additional_context';
  content: string[];
  hookName: string;
  hookEvent: string;
  toolUseID: string;
}

export interface HookBlockingErrorAttachment {
  type: 'hook_blocking_error';
  hookName: string;
  hookEvent: string;
  toolUseID: string;
  blockingError: { blockingError: string; command: string };
}

export interface TaskReminderAttachment {
  type: 'task_reminder';
  content: unknown[];
  itemCount: number;
}

export interface DeferredToolsDeltaAttachment {
  type: 'deferred_tools_delta';
  addedNames: string[];
  addedLines: string[];
  removedNames: string[];
  readdedNames?: string[];
  pendingMcpServers?: string[];
}

/** Notes MCP server instruction blocks added to or removed from context. */
export interface McpInstructionsDeltaAttachment {
  type: 'mcp_instructions_delta';
  /** MCP server display names whose instructions were added. */
  addedNames: string[];
  /** The instruction text blocks added (parallel to `addedNames`). */
  addedBlocks: string[];
  removedNames: string[];
}

export interface QueuedCommandAttachment {
  type: 'queued_command';
  prompt: string;
  commandMode: string;
  source_uuid?: string;
}

export interface SkillListingAttachment {
  type: 'skill_listing';
  content: string;
  skillCount: number;
  isInitial: boolean;
}

/** Full content of skills invoked during the turn, injected into context. */
export interface InvokedSkillsAttachment {
  type: 'invoked_skills';
  skills: InvokedSkill[];
}

/** A single skill's resolved content within an {@link InvokedSkillsAttachment}. */
export interface InvokedSkill {
  name: string;
  /** Source of the skill (e.g. `"userSettings:codex"`). */
  path: string;
  content: string;
}

/** Announces dynamically-discovered skills from a project skills directory. */
export interface DynamicSkillAttachment {
  type: 'dynamic_skill';
  skillDir: string;
  skillNames: string[];
  displayPath: string;
}

/** Records an `@`-mention of a subagent type in the user's message. */
export interface AgentMentionAttachment {
  type: 'agent_mention';
  /** The mentioned subagent type (e.g. `"claude-code-guide"`). */
  agentType: string;
}

/** Marker that the user's message contained the `workflow` keyword. */
export interface WorkflowKeywordRequestAttachment {
  type: 'workflow_keyword_request';
}

/** Injects the contents of a plan file referenced in the conversation. */
export interface PlanFileReferenceAttachment {
  type: 'plan_file_reference';
  planFilePath: string;
  planContent: string;
}

export interface DiagnosticsAttachment {
  type: 'diagnostics';
  files: DiagnosticFile[];
  isNew: boolean;
}

export interface DiagnosticFile {
  uri: string;
  diagnostics: DiagnosticItem[];
}

export interface DiagnosticItem {
  message: string;
  severity: string;
  range: { start: DiagnosticPosition; end: DiagnosticPosition };
  source?: string;
  code?: string;
}

export interface DiagnosticPosition {
  line: number;
  character: number;
}

export interface EditedTextFileAttachment {
  type: 'edited_text_file';
  filename: string;
  snippet: string;
}

export interface CommandPermissionsAttachment {
  type: 'command_permissions';
  allowedTools: string[];
}

export interface NestedMemoryAttachment {
  type: 'nested_memory';
  path: string;
  content: {
    path: string;
    type: string;
    content: string;
    contentDiffersFromDisk: boolean;
  };
  displayPath: string;
}

export interface PlanModeAttachment {
  type: 'plan_mode';
  reminderType: string;
  isSubAgent: boolean;
  planFilePath: string;
  planExists: boolean;
}

export interface PlanModeExitAttachment {
  type: 'plan_mode_exit';
  planFilePath: string;
  planExists: boolean;
}

export interface PlanModeReentryAttachment {
  type: 'plan_mode_reentry';
  planFilePath: string;
}

export interface UltrathinkEffortAttachment {
  type: 'ultrathink_effort';
  level?: string;
}

export interface GoalStatusAttachment {
  type: 'goal_status';
  met: boolean;
  condition: string;
  sentinel?: boolean;
  reason?: string;
  iterations?: number;
  durationMs?: number;
  tokens?: number;
}

export interface FileAttachment {
  type: 'file';
  filename: string;
  content: {
    type: string;
    file: {
      filePath: string;
      content: string;
      numLines: number;
      startLine: number;
      totalLines: number;
    };
  };
  displayPath: string;
}

export interface DirectoryAttachment {
  type: 'directory';
  path: string;
  content: string;
  displayPath: string;
}

export interface DateChangeAttachment {
  type: 'date_change';
  newDate: string;
}

export interface CompanionIntroAttachment {
  type: 'companion_intro';
  name: string;
  species: string;
}

export interface CompactFileReferenceAttachment {
  type: 'compact_file_reference';
  filename: string;
  displayPath: string;
}

// ---------------------------------------------------------------------------
// Simple metadata entries
// ---------------------------------------------------------------------------

/** AI-generated session title. */
export interface AiTitleEntry {
  type: 'ai-title';
  aiTitle: string;
  sessionId: string;
}

/** Records a permission mode change during the session. */
export interface PermissionModeEntry {
  type: 'permission-mode';
  permissionMode: PermissionMode;
  sessionId: string;
}

/** Records an interaction-mode change during the session (distinct from {@link PermissionMode}). */
export interface ModeEntry {
  type: 'mode';
  /** Observed value: `"normal"`. Non-exhaustive. */
  mode: 'normal' | (string & {});
  sessionId: string;
}

/** Records which agent definition is active for the session (e.g. `"claude"`). */
export interface AgentSettingEntry {
  type: 'agent-setting';
  agentSetting: string;
  sessionId: string;
}

/**
 * Links a local session to a remote control bridge session (used by the
 * remote-control / companion bridge).
 */
export interface BridgeSessionEntry {
  type: 'bridge-session';
  sessionId: string;
  /** Bridge session identifier (e.g. `"cse_01BsxutLocJEYNXZXi3tPb4D"`). */
  bridgeSessionId: string;
  /** Last synced sequence number on the bridge stream. */
  lastSequenceNum: number;
}

/** Records git worktree state when a session runs inside a managed worktree. */
export interface WorktreeStateEntry {
  type: 'worktree-state';
  worktreeSession: WorktreeSession;
  sessionId: string;
}

/** Details of a managed git worktree created for a session. */
export interface WorktreeSession {
  /** Working directory before switching into the worktree. */
  originalCwd: string;
  worktreePath: string;
  worktreeName: string;
  worktreeBranch: string;
  /** Branch that was checked out before the worktree was created. */
  originalBranch: string;
  /** HEAD commit SHA at the time the worktree was created. */
  originalHeadCommit: string;
  sessionId: string;
}

// ---------------------------------------------------------------------------
// Content blocks
// ---------------------------------------------------------------------------

/** Plain text content block. Used in both user and assistant messages. */
export interface TextBlock {
  type: 'text';
  text: string;
  /**
   * Present only when the request included documents with `citations: { enabled: true }`.
   * `cited_text` does not count toward output or input tokens.
   */
  citations?: TextCitation[] | null;
}

/**
 * Extended thinking content block.
 *
 * The `signature` field contains a cryptographic signature used to verify
 * authenticity. **Modifying a thinking block will cause the API to reject it.**
 *
 * During tool use cycles, thinking blocks must be returned with the
 * corresponding tool results. They can only be dropped after the full
 * tool use cycle completes.
 */
export interface ThinkingBlock {
  type: 'thinking';
  thinking: string;
  /** Cryptographic signature — do not modify. */
  signature: string;
}

/**
 * Redacted thinking block (content hidden by safety classifiers).
 * The `data` field is encrypted and must be passed back to the API as-is.
 */
export interface RedactedThinkingBlock {
  type: 'redacted_thinking';
  data: string;
}

/**
 * Tool invocation by the model.
 *
 * For Claude Code built-in tools, `name` will be a {@link BuiltinToolName}.
 * MCP tools use the pattern `mcp__<server>__<tool>`.
 */
export interface ToolUseBlock {
  type: 'tool_use';
  /** Prefixed with `toolu_` (e.g. `"toolu_01A09q90qw..."`). */
  id: string;
  name: BuiltinToolName | (string & {});
  input: Record<string, unknown>;
  /** Present in progress/streaming entries only — not part of the Anthropic API. */
  caller?: { type: string };
}

/** Tool result delivered in a user message. */
export interface ToolResultBlock {
  type: 'tool_result';
  tool_use_id: string;
  content?: string | ToolResultContentBlock[];
  is_error?: boolean;
}

/** Content blocks that can appear inside a tool result. */
export type ToolResultContentBlock =
  | TextBlock
  | ImageBlock
  | ToolReferenceBlock;

/** Reference to a tool, used inside tool result content arrays. */
export interface ToolReferenceBlock {
  type: 'tool_reference';
  tool_name: string;
}

/** Image content block in a user message. */
export interface ImageBlock {
  type: 'image';
  source: Base64ImageSource | UrlImageSource;
}

/** Document content block in a user message (PDF, plain text, or URL). */
export interface DocumentBlock {
  type: 'document';
  source: Base64DocumentSource | PlainTextSource | UrlDocumentSource;
  title?: string | null;
  context?: string | null;
}

/**
 * Server-side tool invocation (executed by the Anthropic API, not locally).
 * Currently limited to web search.
 */
export interface ServerToolUseBlock {
  type: 'server_tool_use';
  /** Prefixed with `srvtoolu_` (e.g. `"srvtoolu_01B3C4D5..."`). */
  id: string;
  name: 'web_search';
  input: Record<string, unknown>;
}

/** Result from a server-side web search tool invocation. */
export interface WebSearchToolResultBlock {
  type: 'web_search_tool_result';
  tool_use_id: string;
  content: WebSearchResultError | WebSearchResultItem[];
}

// ---------------------------------------------------------------------------
// Media sources
// ---------------------------------------------------------------------------

/** Base64-encoded image source. */
export interface Base64ImageSource {
  type: 'base64';
  media_type: 'image/jpeg' | 'image/png' | 'image/gif' | 'image/webp';
  data: string;
}

/** URL-referenced image source. */
export interface UrlImageSource {
  type: 'url';
  url: string;
}

/** Base64-encoded PDF document source. */
export interface Base64DocumentSource {
  type: 'base64';
  media_type: 'application/pdf';
  data: string;
}

/** Plain text document source. */
export interface PlainTextSource {
  type: 'text';
  media_type: 'text/plain';
  data: string;
}

/** URL-referenced document source. */
export interface UrlDocumentSource {
  type: 'url';
  url: string;
}

// ---------------------------------------------------------------------------
// Citations
// ---------------------------------------------------------------------------

/** Discriminated union of all citation location types. */
export type TextCitation =
  | CitationCharLocation
  | CitationPageLocation
  | CitationContentBlockLocation
  | CitationWebSearchResultLocation
  | CitationSearchResultLocation;

/**
 * Citation from a plain text document.
 * Character indices are 0-based; `end_char_index` is exclusive.
 */
export interface CitationCharLocation {
  type: 'char_location';
  cited_text: string;
  document_index: number;
  document_title: string | null;
  start_char_index: number;
  /** Exclusive upper bound. */
  end_char_index: number;
  /** Non-null only when the document was provided via the Files API. */
  file_id: string | null;
}

/**
 * Citation from a PDF document.
 * Page numbers are 1-based; `end_page_number` is exclusive.
 */
export interface CitationPageLocation {
  type: 'page_location';
  cited_text: string;
  document_index: number;
  document_title: string | null;
  start_page_number: number;
  /** Exclusive upper bound. */
  end_page_number: number;
  /** Non-null only when the document was provided via the Files API. */
  file_id: string | null;
}

/**
 * Citation from a custom content document.
 * Block indices are 0-based; `end_block_index` is exclusive.
 */
export interface CitationContentBlockLocation {
  type: 'content_block_location';
  cited_text: string;
  document_index: number;
  document_title: string | null;
  start_block_index: number;
  /** Exclusive upper bound. */
  end_block_index: number;
  /** Non-null only when the document was provided via the Files API. */
  file_id: string | null;
}

/** Citation from a web search result. */
export interface CitationWebSearchResultLocation {
  type: 'web_search_result_location';
  cited_text: string;
  encrypted_index: string;
  title: string | null;
  url: string;
}

/**
 * Citation from a `search_result` content block (RAG applications).
 * Block indices are 0-based; `end_block_index` is exclusive.
 */
export interface CitationSearchResultLocation {
  type: 'search_result_location';
  cited_text: string;
  source: string;
  title: string | null;
  search_result_index: number;
  start_block_index: number;
  /** Exclusive upper bound. */
  end_block_index: number;
}

// ---------------------------------------------------------------------------
// Web search results
// ---------------------------------------------------------------------------

/** Error returned by the server-side web search tool. */
export interface WebSearchResultError {
  type: 'web_search_error';
  error_code: string;
  message: string;
}

/** A single web search result item. */
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

/**
 * Token usage for a single API response.
 *
 * **Total billable input tokens** = `input_tokens + cache_creation_input_tokens + cache_read_input_tokens`.
 *
 * **Caveat:** `cache_read_input_tokens` can be inflated when server tools
 * (e.g. web search) are used, because the API accumulates cache reads from
 * multiple internal calls.
 */
export interface Usage {
  input_tokens: number;
  output_tokens: number;
  /** Tokens written to cache. `0` when prompt caching is not configured. */
  cache_creation_input_tokens?: number | null;
  /** Tokens read from cache. `0` when prompt caching is not configured. */
  cache_read_input_tokens?: number | null;
  /** Breakdown of cache creation by TTL. */
  cache_creation?: CacheCreation | null;
  /** Present only when web search was used. */
  server_tool_use?: ServerToolUsage | null;
  service_tier?: 'standard' | 'priority' | 'batch' | null;
  /** Geographic region where inference ran (e.g. `"us-west-2"`). */
  inference_geo?: string | null;
  /** Speed tier used for this response (e.g. `"standard"`). */
  speed?: string | null;
  /** Iteration details when server-side tool loops are involved. */
  iterations?: unknown[];
}

/** Cache creation breakdown by TTL tier. */
export interface CacheCreation {
  ephemeral_5m_input_tokens: number;
  ephemeral_1h_input_tokens: number;
}

/** Server-side tool usage counters. */
export interface ServerToolUsage {
  web_search_requests: number;
}

/** Diagnostics about prompt caching behavior for a response. */
export interface MessageDiagnostics {
  cache_miss_reason: CacheMissReason;
}

/** Reason why the prompt cache was not hit. */
export interface CacheMissReason {
  type: CacheMissReasonType;
}

/** Discriminator values for {@link CacheMissReason}. */
export type CacheMissReasonType =
  | 'messages_changed'
  | 'model_changed'
  | 'previous_message_not_found'
  | 'system_changed'
  | 'tools_changed'
  | 'unavailable';

/** Reference to the session and message this session was forked from. */
export interface ForkedFromRef {
  sessionId: string;
  messageUuid: string;
}

/** Metadata emitted with `compact_boundary` system entries. */
export interface CompactMetadata {
  trigger: 'auto' | 'manual';
  /** Token count before compaction. */
  preTokens: number;
  /** Token count after compaction. */
  postTokens?: number;
  /** Duration of the compaction in milliseconds. */
  durationMs?: number;
  /** Tool names discovered before compaction. */
  preCompactDiscoveredTools?: string[];
  /** Preserved message segment boundaries. */
  preservedSegment?: { headUuid: string; anchorUuid: string; tailUuid: string };
  /** Preserved message UUIDs. */
  preservedMessages?: { anchorUuid: string; uuids: string[] };
}

/** Metadata emitted with `microcompact_boundary` system entries. */
export interface MicrocompactMetadata {
  trigger: 'auto' | 'manual';
  /** Token count before compaction. */
  preTokens: number;
  tokensSaved: number;
  compactedToolIds: string[];
}

/** Configuration for extended thinking budget. */
export interface ThinkingMetadata {
  maxThinkingTokens: number;
}

/** A todo item tracked in the Claude Code task list. */
export interface Todo {
  content: string;
  status: string;
  /** Present continuous form shown in the spinner (e.g. `"Running tests"`). */
  activeForm?: string;
}

// ---------------------------------------------------------------------------
// Enums / unions
// ---------------------------------------------------------------------------

/**
 * Anthropic model identifiers. This list is non-exhaustive — Anthropic
 * regularly adds new model IDs. Some models have aliases that resolve to the
 * same underlying model (e.g. `"claude-sonnet-4-0"` and `"claude-sonnet-4-20250514"`).
 *
 * The `"<synthetic>"` value is specific to Claude Code for locally-generated messages.
 */
export type Model =
  | 'claude-opus-4-8'
  | 'claude-opus-4-7'
  | 'claude-opus-4-6'
  | 'claude-sonnet-4-6'
  | 'claude-opus-4-5-20251101'
  | 'claude-sonnet-4-5-20250929'
  | 'claude-haiku-4-5-20251001'
  | '<synthetic>'
  | (string & {});

/**
 * Reason the model stopped generating.
 *
 * - `end_turn` — Natural stopping point. May have empty `content` array.
 * - `max_tokens` — Hit `max_tokens` limit or the model's maximum.
 * - `stop_sequence` — Generated one of the provided `stop_sequences`.
 * - `tool_use` — Model invoked one or more tools.
 * - `pause_turn` — Server-side sampling loop hit its iteration limit while executing server tools; pass the response back as-is to continue.
 * - `refusal` — Streaming classifiers intervened for potential policy violation.
 */
export type StopReason =
  | 'end_turn'
  | 'max_tokens'
  | 'stop_sequence'
  | 'tool_use'
  | 'pause_turn'
  | 'refusal';

/** Claude Code permission mode set by the user. */
export type PermissionMode =
  | 'default'
  | 'plan'
  | 'auto'
  | 'acceptEdits'
  | 'dontAsk'
  | 'bypassPermissions';

/**
 * Built-in Claude Code tools. This list is non-exhaustive and may change
 * between Claude Code versions. MCP tools use the `mcp__<server>__<tool>` pattern.
 */
export type BuiltinToolName =
  | 'Agent'
  | 'AskUserQuestion'
  | 'Bash'
  | 'CronCreate'
  | 'CronDelete'
  | 'CronList'
  | 'Edit'
  | 'EnterPlanMode'
  | 'EnterWorktree'
  | 'ExitPlanMode'
  | 'ExitWorktree'
  | 'Glob'
  | 'Grep'
  | 'KillShell'
  | 'ListMcpResourcesTool'
  | 'LSP'
  | 'Monitor'
  | 'NotebookEdit'
  | 'PushNotification'
  | 'Read'
  | 'ReadMcpResourceTool'
  | 'RemoteTrigger'
  | 'ScheduleWakeup'
  | 'SendMessage'
  | 'SendUserFile'
  | 'ShareOnboardingGuide'
  | 'Skill'
  | 'Task'
  | 'TaskCreate'
  | 'TaskGet'
  | 'TaskList'
  | 'TaskOutput'
  | 'TaskStop'
  | 'TaskUpdate'
  | 'TeamCreate'
  | 'TeamDelete'
  | 'TodoWrite'
  | 'ToolSearch'
  | 'WebFetch'
  | 'WebSearch'
  | 'Write';

// ---------------------------------------------------------------------------
// Parser helper type
// ---------------------------------------------------------------------------

/**
 * Signature for a function that parses a single JSONL line into a typed entry.
 *
 * @example
 * ```ts
 * const parseLine: ParseLine = (line) => {
 *   try { return JSON.parse(line) as TranscriptEntry; }
 *   catch { return null; }
 * };
 * ```
 */
export type ParseLine = (line: string) => TranscriptEntry | null;
