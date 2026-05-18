**claude-code-types**

***

# claude-code-types

Type definitions for Claude Code chat history JSONL files.

Claude Code stores conversation history at:
  `~/.claude/projects/<project-slug>/<session-id>.jsonl`

Each line is a JSON object conforming to the [TranscriptEntry](type-aliases/TranscriptEntry.md) union type.

## Example

```ts
import type { TranscriptEntry } from 'claude-code-types';
import { readFileSync } from 'fs';

const entries: TranscriptEntry[] = readFileSync(path, 'utf-8')
  .split('\n')
  .filter(Boolean)
  .map(line => JSON.parse(line) as TranscriptEntry);

for (const entry of entries) {
  switch (entry.type) {
    case 'user':       console.log(entry.message.content); break;
    case 'assistant':  console.log(entry.message.model);   break;
    case 'system':     console.log(entry.subtype);         break;
  }
}
```

## Interfaces

- [AgentNameEntry](interfaces/AgentNameEntry.md)
- [AiTitleEntry](interfaces/AiTitleEntry.md)
- [AssistantEntry](interfaces/AssistantEntry.md)
- [AssistantMessage](interfaces/AssistantMessage.md)
- [AttachmentEntry](interfaces/AttachmentEntry.md)
- [Base64DocumentSource](interfaces/Base64DocumentSource.md)
- [Base64ImageSource](interfaces/Base64ImageSource.md)
- [CacheCreation](interfaces/CacheCreation.md)
- [CacheMissReason](interfaces/CacheMissReason.md)
- [CitationCharLocation](interfaces/CitationCharLocation.md)
- [CitationContentBlockLocation](interfaces/CitationContentBlockLocation.md)
- [CitationPageLocation](interfaces/CitationPageLocation.md)
- [CitationSearchResultLocation](interfaces/CitationSearchResultLocation.md)
- [CitationWebSearchResultLocation](interfaces/CitationWebSearchResultLocation.md)
- [CommandPermissionsAttachment](interfaces/CommandPermissionsAttachment.md)
- [CompactFileReferenceAttachment](interfaces/CompactFileReferenceAttachment.md)
- [CompactMetadata](interfaces/CompactMetadata.md)
- [CompanionIntroAttachment](interfaces/CompanionIntroAttachment.md)
- [CustomTitleEntry](interfaces/CustomTitleEntry.md)
- [DateChangeAttachment](interfaces/DateChangeAttachment.md)
- [DeferredToolsDeltaAttachment](interfaces/DeferredToolsDeltaAttachment.md)
- [DiagnosticFile](interfaces/DiagnosticFile.md)
- [DiagnosticItem](interfaces/DiagnosticItem.md)
- [DiagnosticPosition](interfaces/DiagnosticPosition.md)
- [DiagnosticsAttachment](interfaces/DiagnosticsAttachment.md)
- [DirectoryAttachment](interfaces/DirectoryAttachment.md)
- [DocumentBlock](interfaces/DocumentBlock.md)
- [EditedTextFileAttachment](interfaces/EditedTextFileAttachment.md)
- [EntryBase](interfaces/EntryBase.md)
- [FileAttachment](interfaces/FileAttachment.md)
- [FileBackup](interfaces/FileBackup.md)
- [FileHistorySnapshot](interfaces/FileHistorySnapshot.md)
- [FileHistorySnapshotEntry](interfaces/FileHistorySnapshotEntry.md)
- [ForkedFromRef](interfaces/ForkedFromRef.md)
- [GoalStatusAttachment](interfaces/GoalStatusAttachment.md)
- [HookAdditionalContextAttachment](interfaces/HookAdditionalContextAttachment.md)
- [HookBlockingErrorAttachment](interfaces/HookBlockingErrorAttachment.md)
- [HookSuccessAttachment](interfaces/HookSuccessAttachment.md)
- [ImageBlock](interfaces/ImageBlock.md)
- [LastPromptEntry](interfaces/LastPromptEntry.md)
- [MessageDiagnostics](interfaces/MessageDiagnostics.md)
- [MicrocompactMetadata](interfaces/MicrocompactMetadata.md)
- [NestedMemoryAttachment](interfaces/NestedMemoryAttachment.md)
- [PermissionModeEntry](interfaces/PermissionModeEntry.md)
- [PlainTextSource](interfaces/PlainTextSource.md)
- [PlanModeAttachment](interfaces/PlanModeAttachment.md)
- [PlanModeExitAttachment](interfaces/PlanModeExitAttachment.md)
- [PlanModeReentryAttachment](interfaces/PlanModeReentryAttachment.md)
- [PrLinkEntry](interfaces/PrLinkEntry.md)
- [ProgressData](interfaces/ProgressData.md)
- [ProgressEntry](interfaces/ProgressEntry.md)
- [QueuedCommandAttachment](interfaces/QueuedCommandAttachment.md)
- [QueueOperationEntry](interfaces/QueueOperationEntry.md)
- [RedactedThinkingBlock](interfaces/RedactedThinkingBlock.md)
- [SavedHookContextEntry](interfaces/SavedHookContextEntry.md)
- [ServerToolUsage](interfaces/ServerToolUsage.md)
- [ServerToolUseBlock](interfaces/ServerToolUseBlock.md)
- [SkillListingAttachment](interfaces/SkillListingAttachment.md)
- [SummaryEntry](interfaces/SummaryEntry.md)
- [SystemEntry](interfaces/SystemEntry.md)
- [TaskReminderAttachment](interfaces/TaskReminderAttachment.md)
- [TextBlock](interfaces/TextBlock.md)
- [ThinkingBlock](interfaces/ThinkingBlock.md)
- [ThinkingMetadata](interfaces/ThinkingMetadata.md)
- [Todo](interfaces/Todo.md)
- [ToolResultBlock](interfaces/ToolResultBlock.md)
- [ToolUseBlock](interfaces/ToolUseBlock.md)
- [UltrathinkEffortAttachment](interfaces/UltrathinkEffortAttachment.md)
- [UrlDocumentSource](interfaces/UrlDocumentSource.md)
- [UrlImageSource](interfaces/UrlImageSource.md)
- [Usage](interfaces/Usage.md)
- [UserEntry](interfaces/UserEntry.md)
- [UserMessage](interfaces/UserMessage.md)
- [WebSearchResultError](interfaces/WebSearchResultError.md)
- [WebSearchResultItem](interfaces/WebSearchResultItem.md)
- [WebSearchToolResultBlock](interfaces/WebSearchToolResultBlock.md)

## Type Aliases

- [AssistantContentBlock](type-aliases/AssistantContentBlock.md)
- [Attachment](type-aliases/Attachment.md)
- [AttachmentType](type-aliases/AttachmentType.md)
- [BuiltinToolName](type-aliases/BuiltinToolName.md)
- [CacheMissReasonType](type-aliases/CacheMissReasonType.md)
- [Model](type-aliases/Model.md)
- [ParseLine](type-aliases/ParseLine.md)
- [PermissionMode](type-aliases/PermissionMode.md)
- [StopReason](type-aliases/StopReason.md)
- [SystemSubtype](type-aliases/SystemSubtype.md)
- [TextCitation](type-aliases/TextCitation.md)
- [TranscriptEntry](type-aliases/TranscriptEntry.md)
- [UserContentBlock](type-aliases/UserContentBlock.md)
