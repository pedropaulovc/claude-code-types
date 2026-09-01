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
  | AtisLatchEntry
  | AgentNameEntry
  | AgentSettingEntry
  | AiTitleEntry
  | BridgeSessionEntry
  | CustomTitleEntry
  | FileHistoryDeltaEntry
  | FileHistorySnapshotEntry
  | ForkContextRefEntry
  | FrameLinkEntry
  | LastPromptEntry
  | ModeEntry
  | PermissionModeEntry
  | PrLinkEntry
  | ProgressEntry
  | QueueOperationEntry
  | RelocatedEntry
  | ResultEntry
  | SavedHookContextEntry
  | StartedEntry
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
  /** Session identifier; matches the JSONL filename (e.g. `"025df9d0-abb5-4df9-84c3-1038d59e6d95"`). */
  sessionId?: string;
  /** Snake-case duplicate of {@link EntryBase.sessionId}; same value, emitted on newer entries. */
  session_id?: string;
  /** ISO 8601 timestamp (e.g. `"2026-06-04T23:51:02.971Z"`). */
  timestamp: string;
  /** Working directory at the time this entry was created (e.g. `"/home/pedro/src/agent-plugins"`). */
  cwd: string;
  /** Claude Code version string (e.g. `"1.0.33"`). */
  version: string;
  /** Git branch checked out when this entry was created (e.g. `"main"`, `"HEAD"`). */
  gitBranch?: string;
  /** Project slug derived from the working directory (e.g. `"linked-sleeping-harbor"`). */
  slug?: string;
  /** Present on entries produced by subagents / Task tool invocations (e.g. `"a4044e6"`). */
  agentId?: string;
  /** Name of the team this entry belongs to, for multi-agent sessions (e.g. `"web-ui"`). */
  teamName?: string;
  /** How the session was started (e.g. `"cli"`). */
  entrypoint?: string;
  /** Name of the agent that produced this entry (e.g. `"implementer"`, `"tester"`). */
  agentName?: string;
  userType: 'external';
  /**
   * Kind of session this entry belongs to. `"bg"` marks a background
   * (detached) session; absent for normal foreground sessions. Non-exhaustive.
   */
  sessionKind?: 'bg' | (string & {});
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
  /** Unique identifier for this prompt (e.g. `"bbcf7b1f-30c4-4a38-86b7-ae83f3479cd8"`). */
  promptId?: string;
  /** Anthropic message ID (`msg_…`) of the assistant turn this message interrupted. */
  interruptedMessageId?: string;
  /** Origin of this user message (e.g. `{ kind: "task-notification" }`, `{ kind: "human" }`). */
  origin?: { kind: string };
  permissionMode?: PermissionMode;
  /** Why a tool call was denied, when this user message carries a denial (e.g. `"permission-rule"`). Non-exhaustive. */
  toolDenialKind?: 'permission-rule' | (string & {});
  planContent?: string;
  thinkingMetadata?: ThinkingMetadata;
  todos?: Todo[];
  /** Present when this user message is a tool result being delivered back. */
  toolUseResult?: unknown;
  /** UUID of the assistant message whose tool_use triggered this result. */
  sourceToolAssistantUUID?: string;
  /** ID of the tool_use content block this result corresponds to. */
  sourceToolUseID?: string;
  /** Structured metadata returned by an MCP tool alongside its result. Shape is server-specific. */
  mcpMeta?: unknown;
  /** How the prompt was supplied (e.g. `"typed"`). */
  promptSource?: string;
  /** Scheduling priority for a queued message (e.g. `"later"`). */
  queuePriority?: string;
  /** Reason a tool invocation was denied, when recorded. */
  toolDenialKind?: string;
  /** Whether this prompt came through the turn companion. */
  turnCompanion?: boolean;
  /** Feedback supplied by the user for this turn. */
  userFeedback?: string;
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
  /** Anthropic API request ID for this response (e.g. `"req_011Cbj7kXLRcS73ygn6noLDL"`). */
  requestId?: string;
  /** Present when the API returned an error instead of a response. */
  apiError?: unknown;
  /** Error code when the API call failed (e.g. `"rate_limit"`, `"authentication_failed"`). */
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
  /** MCP server whose tool produced this response (e.g. `"claude.ai Firecrawl"`). */
  attributionMcpServer?: string;
  /** MCP tool that produced this response (e.g. `"firecrawl_scrape"`). */
  attributionMcpTool?: string;
  /** Internal flag for transcript carrier-message healing. */
  healsDistinctCarrier?: boolean;
  /** Model backing the advisor tool for this turn (e.g. `"claude-fable-5"`). See {@link Model}. */
  advisorModel?: Model;
  /** Effort setting used for this response, when present. */
  effort?: string;
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
  | WebSearchToolResultBlock
  | AdvisorToolResultBlock;

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
  /** Rendered event text (e.g. `"Conversation compacted"`, `"<local-command-stdout></local-command-stdout>"`). */
  content?: string;
  /** Severity of the event (e.g. `"suggestion"`, `"info"`, `"error"`). */
  level?: string;
  /** Milliseconds the turn took (subtype `turn_duration`; e.g. `122557`). */
  durationMs?: number;
  /** Error message (subtype `api_error`). */
  error?: string;
  cause?: string;
  /** Retry attempt number for a failed API request (e.g. `1`, `2`). */
  retryAttempt?: number;
  /** Backoff before the next retry, in milliseconds (e.g. `566.72`). */
  retryInMs?: number;
  /** Maximum retry attempts configured (e.g. `10`). */
  maxRetries?: number;
  /** Subtype `compact_boundary`. */
  compactMetadata?: CompactMetadata;
  /** Subtype `microcompact_boundary`. */
  microcompactMetadata?: MicrocompactMetadata;
  /** Subtype `stop_hook_summary` (e.g. `1`, `2`). */
  hookCount?: number;
  hookErrors?: unknown[];
  hookInfos?: unknown[];
  hasOutput?: boolean;
  stopReason?: string;
  preventedContinuation?: boolean;
  toolUseID?: string;
  logicalParentUuid?: string;
  /** Additional context strings contributed by hooks for this event. */
  hookAdditionalContext?: unknown[];
  /** URL for remote control bridge (subtype `bridge_status`; e.g. `"https://claude.ai/code/session_01HQnAuHE4arEJ3FpwPaLNah"`). */
  url?: string;
  /** Number of messages in the turn (subtype `turn_duration`; e.g. `39`). */
  messageCount?: number;
  /** Number of background agents still running (subtype `turn_duration`; e.g. `1`). */
  pendingBackgroundAgentCount?: number;
  /** Number of workflows still running (subtype `turn_duration`; e.g. `1`). */
  pendingWorkflowCount?: number;
  choice?: string;
  fallbackModel?: string;
  originalModel?: string;
  persistedAsDefault?: boolean;
  /** Reason a connection retry or fallback was initiated. */
  source?: string;
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
  | 'turn_duration'
  | 'agents_killed'
  | 'model_consent_fallback';

// ---------------------------------------------------------------------------
// Standalone metadata entries
// ---------------------------------------------------------------------------

/** Records the active ATIS state for a session. */
export interface AtisLatchEntry {
  type: 'atis-latch';
  atis: string;
  sessionId: string;
}

/** Records an incremental file-history backup. */
export interface FileHistoryDeltaEntry {
  type: 'file-history-delta';
  messageId: string;
  snapshotMessageId: string;
  trackingPath: string;
  backup: FileHistoryDeltaBackup;
  timestamp: string;
}

/** Backup metadata carried by a {@link FileHistoryDeltaEntry}. */
export interface FileHistoryDeltaBackup {
  backupFileName: string | null;
  version: number;
  backupTime: string;
  realParentDir: string;
}

/** References the source session and message for a forked context. */
export interface ForkContextRefEntry {
  type: 'fork-context-ref';
  agentId: string;
  parentSessionId: string;
  parentLastUuid: string;
  contextLength: number;
}

/** Links a session to an artifact frame. */
export interface FrameLinkEntry {
  type: 'frame-link';
  sessionId: string;
  path: string;
  frameUrl: string;
  timestamp: string;
}

/** Records that a session moved back to its original working directory. */
export interface RelocatedEntry {
  type: 'relocated';
  sessionId: string;
  relocatedCwd: string;
}

// ---------------------------------------------------------------------------
// Agent name (records the agent name for a session)
// ---------------------------------------------------------------------------

/** Records the agent name for a session. */
export interface AgentNameEntry {
  type: 'agent-name';
  /** Human-readable agent/session name (e.g. `"azure-observability-migration"`, `"YouTube mirror"`). */
  agentName: string;
  sessionId: string;
}

// ---------------------------------------------------------------------------
// Custom title (user-assigned session title)
// ---------------------------------------------------------------------------

/** Records a custom title assigned to a session. */
export interface CustomTitleEntry {
  type: 'custom-title';
  /** User-assigned session title (e.g. `"YouTube mirror"`, `"add-custom-bio-suffix"`). */
  customTitle: string;
  sessionId: string;
}

// ---------------------------------------------------------------------------
// Last prompt (persisted prompt for session resumption)
// ---------------------------------------------------------------------------

/** Records the last prompt text for session resumption. */
export interface LastPromptEntry {
  type: 'last-prompt';
  /** The most recent user prompt text (e.g. `"continue"`, `"pr"`). */
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
  /** ISO 8601 timestamp of the snapshot (e.g. `"2026-05-26T15:08:00.982Z"`). */
  timestamp: string;
  /** Map of original file path to backup info. */
  trackedFileBackups: Record<string, FileBackup>;
}

/** Backup metadata for a single tracked file. */
export interface FileBackup {
  /** Name of the stored backup file, suffixed with the version tag (e.g. `"1d9302781d4ff254@v2"`). */
  backupFileName: string;
  /** Monotonic backup version for this file (e.g. `1`, `2`). */
  version: number;
  /** ISO 8601 time the backup was taken (e.g. `"2026-05-26T17:18:28.461Z"`). */
  backupTime: string;
}

// ---------------------------------------------------------------------------
// PR link
// ---------------------------------------------------------------------------

/** Records a pull request created or linked during the session. */
export interface PrLinkEntry {
  type: 'pr-link';
  sessionId: string;
  /** ISO 8601 timestamp (e.g. `"2026-06-01T16:11:35.851Z"`). */
  timestamp: string;
  /** Pull request number (e.g. `6`, `233`). */
  prNumber: number;
  /** Full URL of the pull request (e.g. `"https://github.com/pedropaulovc/youtube-mirror/pull/6"`). */
  prUrl: string;
  /** `owner/repo` slug the PR belongs to (e.g. `"vezzadev/roster"`, `"pedropaulovc/el400"`). */
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
    /** Anthropic API request ID, present on assistant progress messages (e.g. `"req_011CYtSi4qm3EzqdsYFJ9Ydk"`). */
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
// Workflow journal entries (started / result)
// ---------------------------------------------------------------------------

/**
 * Marks the start of a cached workflow/agent step. Paired with a
 * {@link ResultEntry} sharing the same `key`, this forms the journal the
 * Workflow tool uses to resume runs without re-executing completed steps.
 */
export interface StartedEntry {
  type: 'started';
  /** Content-hash cache key (e.g. `"v2:<sha256>"`) identifying the step. */
  key: string;
  /** Identifier of the agent that ran the step (e.g. `"ac3124bd2ff9eed73"`). */
  agentId: string;
}

/**
 * Cached result of a workflow/agent step, keyed to the matching
 * {@link StartedEntry} by `key`. The `result` payload is step-specific — for
 * agents invoked with a schema it is the validated structured output.
 */
export interface ResultEntry {
  type: 'result';
  /** Content-hash cache key matching the corresponding {@link StartedEntry}. */
  key: string;
  /** Identifier of the agent that ran the step (e.g. `"ad689afee63e70b14"`). */
  agentId: string;
  /** Step-specific return value (shape depends on the agent/step). */
  result: unknown;
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
  | CompactFileReferenceAttachment
  | OutputStyleAttachment
  | AgentListingDeltaAttachment
  | AutoModeAttachment
  | AutoModeExitAttachment
  | TaskStatusAttachment
  | TotalTokensReminderAttachment
  | ReadTruncationNoticeAttachment
  | ContextTipAttachment
  | HookSystemMessageAttachment;

/** Discriminator values for {@link Attachment}. */
export type AttachmentType = Attachment['type'];

export interface TotalTokensReminderAttachment {
  type: 'total_tokens_reminder';
  text: string;
}

/** Notice emitted when a file view was truncated. */
export interface ReadTruncationNoticeAttachment {
  type: 'read_truncation_notice';
  banner: string;
  toolUseID: string;
}

/** Contextual tip shown by Claude Code. */
export interface ContextTipAttachment {
  type: 'context_tip';
  tip: {
    tip: string;
    featureId: string;
    action: string;
  };
}

/** Message emitted by a hook as system-provided context. */
export interface HookSystemMessageAttachment {
  type: 'hook_system_message';
  content: string;
  hookName: string;
  toolUseID: string;
  hookEvent: string;
}

export interface HookSuccessAttachment {
  type: 'hook_success';
  /** Hook matcher that fired (e.g. `"PreToolUse:Bash"`, `"Stop"`). */
  hookName: string;
  /** Hook lifecycle event (e.g. `"PreToolUse"`, `"PostToolUse"`, `"SessionStart"`, `"Stop"`). */
  hookEvent: string;
  toolUseID: string;
  content: string;
  stdout: string;
  stderr: string;
  /** Process exit code of the hook command (e.g. `0`). */
  exitCode: number;
  command: string;
  durationMs: number;
}

export interface HookAdditionalContextAttachment {
  type: 'hook_additional_context';
  content: string[];
  /** Hook matcher that fired (e.g. `"PreToolUse:Bash"`). */
  hookName: string;
  /** Hook lifecycle event (e.g. `"PreToolUse"`). */
  hookEvent: string;
  toolUseID: string;
}

export interface HookBlockingErrorAttachment {
  type: 'hook_blocking_error';
  /** Hook matcher that fired (e.g. `"Stop"`). */
  hookName: string;
  /** Hook lifecycle event (e.g. `"Stop"`). */
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
  /** Tool names newly deferred (e.g. `"CronCreate"`, `"Monitor"`, `"mcp__plugin_cloudflare_cloudflare-api__execute"`). */
  addedNames: string[];
  addedLines: string[];
  removedNames: string[];
  readdedNames?: string[];
  pendingMcpServers?: string[];
}

/** Notes MCP server instruction blocks added to or removed from context. */
export interface McpInstructionsDeltaAttachment {
  type: 'mcp_instructions_delta';
  /** MCP server display names whose instructions were added (e.g. `"claude.ai Firecrawl"`, `"plugin:cloudflare:cloudflare-bindings"`). */
  addedNames: string[];
  /** The instruction text blocks added (parallel to `addedNames`). */
  addedBlocks: string[];
  removedNames: string[];
}

export interface QueuedCommandAttachment {
  type: 'queued_command';
  /** The queued user prompt text (e.g. `"pr"`). */
  prompt: string;
  /** Origin of the queued command (e.g. `"prompt"`, `"task-notification"`). */
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
  /** Skill name (e.g. `"playwright-cli"`, `"codex"`). */
  name: string;
  /** Source of the skill (e.g. `"userSettings:codex"`). */
  path: string;
  content: string;
}

/** Announces dynamically-discovered skills from a project skills directory. */
export interface DynamicSkillAttachment {
  type: 'dynamic_skill';
  /** Absolute path to the discovered skills directory (e.g. `"/home/pedro/src/playwright/.claude/skills"`). */
  skillDir: string;
  /** Names of the discovered skills (e.g. `"playwright-dev"`). */
  skillNames: string[];
  /** Repo-relative display path for the directory (e.g. `"playwright/.claude/skills"`). */
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
  /** Absolute path to the plan file (e.g. `"/home/pedro/.claude/plans/skill-default-description-is-humble-lark.md"`). */
  planFilePath: string;
  planContent: string;
}

export interface DiagnosticsAttachment {
  type: 'diagnostics';
  files: DiagnosticFile[];
  isNew: boolean;
}

export interface DiagnosticFile {
  /** Absolute path of the diagnosed file (e.g. `"/tmp/jsonl-to-md/convert.ts"`). */
  uri: string;
  diagnostics: DiagnosticItem[];
}

export interface DiagnosticItem {
  /** Diagnostic message (e.g. `"Cannot find module 'fs' or its corresponding type declarations."`). */
  message: string;
  /** Severity label (e.g. `"Error"`, `"Hint"`). */
  severity: string;
  range: { start: DiagnosticPosition; end: DiagnosticPosition };
  /** Diagnostic source/provider (e.g. `"typescript"`). */
  source?: string;
  /** Diagnostic code (e.g. `"2307"`, `"6133"`). */
  code?: string;
}

export interface DiagnosticPosition {
  line: number;
  character: number;
}

export interface EditedTextFileAttachment {
  type: 'edited_text_file';
  /** Absolute path of the edited file (e.g. `"/home/pedro/src/entrepreneurship/ideas/ai-team-protocol/design.md"`). */
  filename: string;
  snippet: string;
}

export interface CommandPermissionsAttachment {
  type: 'command_permissions';
  /** Tools the command is permitted to use (e.g. `"Bash"`, `"Read"`, `"Edit"`, `"AskUserQuestion"`). */
  allowedTools: string[];
}

export interface NestedMemoryAttachment {
  type: 'nested_memory';
  /** Absolute path to the nested memory file (e.g. `"/home/pedro/src/roster/docs/gstack/CLAUDE.md"`). */
  path: string;
  content: {
    path: string;
    /** Memory scope (e.g. `"Project"`). */
    type: string;
    content: string;
    contentDiffersFromDisk: boolean;
  };
  /** Repo-relative display path (e.g. `"docs/gstack/CLAUDE.md"`). */
  displayPath: string;
}

export interface PlanModeAttachment {
  type: 'plan_mode';
  /** Verbosity of the plan-mode reminder (e.g. `"full"`, `"sparse"`). */
  reminderType: string;
  isSubAgent: boolean;
  /** Absolute path to the plan file (e.g. `"/home/pedro/.claude/plans/skill-default-description-is-humble-lark.md"`). */
  planFilePath: string;
  planExists: boolean;
}

export interface PlanModeExitAttachment {
  type: 'plan_mode_exit';
  /** Absolute path to the plan file (e.g. `"/home/pedro/.claude/plans/skill-default-description-is-humble-lark.md"`). */
  planFilePath: string;
  planExists: boolean;
}

export interface PlanModeReentryAttachment {
  type: 'plan_mode_reentry';
  /** Absolute path to the plan file (e.g. `"/home/pedro/.claude/plans/create-new-azure-rg-async-hopcroft.md"`). */
  planFilePath: string;
}

export interface UltrathinkEffortAttachment {
  type: 'ultrathink_effort';
  /** Reasoning effort level (e.g. `"high"`). */
  level?: string;
}

export interface GoalStatusAttachment {
  type: 'goal_status';
  met: boolean;
  /** The goal condition being evaluated (e.g. `"cicd green"`, `"merge all dependabot prs"`). */
  condition: string;
  sentinel?: boolean;
  reason?: string;
  iterations?: number;
  durationMs?: number;
  tokens?: number;
}

export interface FileAttachment {
  type: 'file';
  /** Absolute path of the attached file (e.g. `"/home/pedro/src/entrepreneurship/ideas/field-service-trust-layer/design.md"`). */
  filename: string;
  content: {
    /** Content kind (e.g. `"text"`). */
    type: string;
    file: {
      filePath: string;
      content: string;
      numLines: number;
      startLine: number;
      totalLines: number;
    };
  };
  /** Repo-relative display path (e.g. `"ideas/field-service-trust-layer/design.md"`). */
  displayPath: string;
}

export interface DirectoryAttachment {
  type: 'directory';
  /** Absolute path of the listed directory (e.g. `"/home/pedro/src/entrepreneurship/ideas/roster"`). */
  path: string;
  content: string;
  /** Display path for the directory (e.g. `"ideas/roster"`). */
  displayPath: string;
}

export interface DateChangeAttachment {
  type: 'date_change';
  /** The new local date (e.g. `"2026-05-17"`). */
  newDate: string;
}

export interface CompanionIntroAttachment {
  type: 'companion_intro';
  /** Companion's name (e.g. `"Clatter"`). */
  name: string;
  /** Companion's species (e.g. `"cat"`). */
  species: string;
}

export interface CompactFileReferenceAttachment {
  type: 'compact_file_reference';
  /** Absolute path of the referenced file (e.g. `"/home/pedro/src/entrepreneurship/ideas/roster/office-hours/2026-05-18/generate-html.js"`). */
  filename: string;
  /** Repo-relative display path (e.g. `"generate-html.js"`). */
  displayPath: string;
}

/** Records the active output style for the session (e.g. `"Learning"`). */
export interface OutputStyleAttachment {
  type: 'output_style';
  style: string;
}

/**
 * Notes changes to the available subagent type listing injected into context.
 * Parallel to the `deferred_tools_delta` / `mcp_instructions_delta` deltas.
 */
export interface AgentListingDeltaAttachment {
  type: 'agent_listing_delta';
  /** Subagent type names added to the listing (e.g. `"claude"`, `"Explore"`). */
  addedTypes: string[];
  /** The listing text blocks added (parallel to `addedTypes`). */
  addedLines: string[];
  removedTypes: string[];
  /** `true` for the initial full listing, absent/`false` for incremental deltas. */
  isInitial?: boolean;
  /** Whether to show the note about running agents concurrently. */
  showConcurrencyNote?: boolean;
}

/** Reminder injected when the session is running in auto mode. */
export interface AutoModeAttachment {
  type: 'auto_mode';
  /** Cadence of the reminder (e.g. `"once"`). */
  reminderType: string;
}

/** Marker that the session exited auto mode. */
export interface AutoModeExitAttachment {
  type: 'auto_mode_exit';
}

/** Status update for a background task / local agent. */
export interface TaskStatusAttachment {
  type: 'task_status';
  taskId: string;
  /** Kind of task (e.g. `"local_agent"`). */
  taskType: string;
  description: string;
  /** Current status (e.g. `"running"`). */
  status: string;
  /** Summary of progress since the last update, or `null`. */
  deltaSummary: string | null;
  /** Path to the file capturing the task's output. */
  outputFilePath: string;
}

/** A contextual feature tip surfaced to the user based on their recent actions. */
export interface ContextTipAttachment {
  type: 'context_tip';
  tip: {
    /** The tip text shown to the user. */
    tip: string;
    /** Identifier for the feature being suggested (e.g. `"diff-request"`, `"manual-polling"`). */
    featureId: string;
    /** Suggested command or action (e.g. `"/diff"`, `"/loop 2m check CI status"`). */
    action: string;
  };
}

// ---------------------------------------------------------------------------
// Simple metadata entries
// ---------------------------------------------------------------------------

/** AI-generated session title. */
export interface AiTitleEntry {
  type: 'ai-title';
  /** AI-generated session title (e.g. `"Query Claude code guide natural language hooks"`). */
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
  /** Bridge session identifier (e.g. `"cse_01VoHgHgLQTzAFZ6SeK4RVPQ"`). */
  bridgeSessionId: string;
  /** Last synced sequence number on the bridge stream (e.g. `0`). */
  lastSequenceNum: number;
  ownerAccountUuid?: string;
  ownerOrganizationUuid?: string;
}

/** Records git worktree state when a session runs inside a managed worktree. */
export interface WorktreeStateEntry {
  type: 'worktree-state';
  worktreeSession: WorktreeSession;
  sessionId: string;
}

/** Details of a managed git worktree created for a session. */
export interface WorktreeSession {
  /** Working directory before switching into the worktree (e.g. `"/home/pedro/src/agent-plugins"`). */
  originalCwd: string;
  /** Absolute path of the worktree (e.g. `"/home/pedro/src/agent-plugins/.claude/worktrees/linked-sniffing-star"`). */
  worktreePath: string;
  /** Generated worktree name (e.g. `"linked-sniffing-star"`). */
  worktreeName: string;
  /** Branch checked out in the worktree (e.g. `"worktree-linked-sniffing-star"`). */
  worktreeBranch: string;
  /** Branch that was checked out before the worktree was created (e.g. `"skill/subagent-test-backdoor-discipline"`). */
  originalBranch: string;
  /** HEAD commit SHA at the time the worktree was created (e.g. `"dc5675c941a15a501cbc4f2baab95b5f59b2cc33"`). */
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
  /** Prefixed with `toolu_` (e.g. `"toolu_01WkEuw4UahJKiAQmN9evsjX"`). */
  id: string;
  /** Tool name (e.g. `"Bash"`, `"Read"`, `"mcp__claude_ai_Firecrawl__firecrawl_scrape"`). */
  name: BuiltinToolName | (string & {});
  input: Record<string, unknown>;
  /** Present in progress/streaming entries only — not part of the Anthropic API. */
  caller?: { type: string };
}

/** Tool result delivered in a user message. */
export interface ToolResultBlock {
  type: 'tool_result';
  /** ID of the {@link ToolUseBlock} this result answers (e.g. `"toolu_01LgypxQhHygemucfGy5bonV"`). */
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
  /** Referenced tool name (e.g. `"SendMessage"`, `"TaskUpdate"`, `"Monitor"`). */
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
 * Covers web search and the advisor (stronger-reviewer) tool.
 */
export interface ServerToolUseBlock {
  type: 'server_tool_use';
  /** Prefixed with `srvtoolu_` (e.g. `"srvtoolu_01B3C4D5..."`). */
  id: string;
  name: 'web_search' | 'advisor';
  input: Record<string, unknown>;
}

/** Result from a server-side web search tool invocation. */
export interface WebSearchToolResultBlock {
  type: 'web_search_tool_result';
  tool_use_id: string;
  content: WebSearchResultError | WebSearchResultItem[];
}

/** Result from a server-side advisor tool invocation. */
export interface AdvisorToolResultBlock {
  type: 'advisor_tool_result';
  /** ID of the {@link ServerToolUseBlock} (`srvtoolu_…`) this result corresponds to. */
  tool_use_id: string;
  content: AdvisorToolResultContent;
}

export type AdvisorToolResultContent =
  | AdvisorToolResultError
  | AdvisorRedactedResult
  | Record<string, unknown>;

/** Error returned by the server-side advisor tool (e.g. when unavailable). */
export interface AdvisorToolResultError {
  type: 'advisor_tool_result_error';
  /** e.g. `"unavailable"`. */
  error_code: string;
}

export interface AdvisorRedactedResult {
  type: 'advisor_redacted_result';
  encrypted_content: string;
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
  /** Uncached input tokens (e.g. `4014`). */
  input_tokens: number;
  /** Generated output tokens (e.g. `501`). */
  output_tokens: number;
  /** Tokens written to cache (e.g. `6109`). `0` when prompt caching is not configured. */
  cache_creation_input_tokens?: number | null;
  /** Tokens read from cache (e.g. `16436`). `0` when prompt caching is not configured. */
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
  /** Tokens written to the 5-minute cache tier (e.g. `13581`). */
  ephemeral_5m_input_tokens: number;
  /** Tokens written to the 1-hour cache tier (e.g. `6109`). */
  ephemeral_1h_input_tokens: number;
}

/** Server-side tool usage counters. */
export interface ServerToolUsage {
  /** Count of server-side web search requests (e.g. `0`). */
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
  /** Session the fork branched from (e.g. `"500bf69b-26d6-4a20-b480-3a4c90095c52"`). */
  sessionId: string;
  /** UUID of the message forked from (e.g. `"bdc0c8b4-ae1d-4652-9028-0c5e6d5dd981"`). */
  messageUuid: string;
}

/** Metadata emitted with `compact_boundary` system entries. */
export interface CompactMetadata {
  trigger: 'auto' | 'manual';
  /** Token count before compaction (e.g. `167199`). */
  preTokens: number;
  /** Token count after compaction (e.g. `5547`). */
  postTokens?: number;
  /** Duration of the compaction in milliseconds (e.g. `30586`). */
  durationMs?: number;
  /** Tool names discovered before compaction (e.g. `["ExitPlanMode"]`). */
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
  /** Lifecycle state (e.g. `"in_progress"`). */
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
  | 'claude-fable-5'
  | 'claude-mythos-5'
  | 'claude-opus-5'
  | 'claude-sonnet-5'
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
  | 'Artifact'
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
  | 'firecrawl_scrape'
  | 'Glob'
  | 'Grep'
  | 'KillShell'
  | 'ListMcpResourcesTool'
  | 'LSP'
  | 'Monitor'
  | 'NotebookEdit'
  | 'PowerShell'
  | 'PushNotification'
  | 'Read'
  | 'ReadMcpResourceTool'
  | 'RemoteTrigger'
  | 'ScheduleWakeup'
  | 'SendMessage'
  | 'SendUserFile'
  | 'SendUserMessage'
  | 'ShareOnboardingGuide'
  | 'Skill'
  | 'StructuredOutput'
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
  | 'Workflow'
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
