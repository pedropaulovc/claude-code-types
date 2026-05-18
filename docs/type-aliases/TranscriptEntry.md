[**claude-code-types**](../README.md)

***

[claude-code-types](../README.md) / TranscriptEntry

# Type Alias: TranscriptEntry

> **TranscriptEntry** = [`UserEntry`](../interfaces/UserEntry.md) \| [`AssistantEntry`](../interfaces/AssistantEntry.md) \| [`SystemEntry`](../interfaces/SystemEntry.md) \| [`AttachmentEntry`](../interfaces/AttachmentEntry.md) \| [`AgentNameEntry`](../interfaces/AgentNameEntry.md) \| [`AiTitleEntry`](../interfaces/AiTitleEntry.md) \| [`CustomTitleEntry`](../interfaces/CustomTitleEntry.md) \| [`PermissionModeEntry`](../interfaces/PermissionModeEntry.md) \| [`FileHistorySnapshotEntry`](../interfaces/FileHistorySnapshotEntry.md) \| [`LastPromptEntry`](../interfaces/LastPromptEntry.md) \| [`PrLinkEntry`](../interfaces/PrLinkEntry.md) \| [`ProgressEntry`](../interfaces/ProgressEntry.md) \| [`QueueOperationEntry`](../interfaces/QueueOperationEntry.md) \| [`SavedHookContextEntry`](../interfaces/SavedHookContextEntry.md) \| [`SummaryEntry`](../interfaces/SummaryEntry.md)

Discriminated union of all JSONL line types. Switch on `entry.type` to narrow.
