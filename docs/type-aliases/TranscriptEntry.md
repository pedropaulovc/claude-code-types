[**claude-code-types**](../README.md)

***

[claude-code-types](../README.md) / TranscriptEntry

# Type Alias: TranscriptEntry

> **TranscriptEntry** = [`UserEntry`](../interfaces/UserEntry.md) \| [`AssistantEntry`](../interfaces/AssistantEntry.md) \| [`SystemEntry`](../interfaces/SystemEntry.md) \| [`AttachmentEntry`](../interfaces/AttachmentEntry.md) \| [`AtisLatchEntry`](../interfaces/AtisLatchEntry.md) \| [`AgentNameEntry`](../interfaces/AgentNameEntry.md) \| [`AgentSettingEntry`](../interfaces/AgentSettingEntry.md) \| [`AiTitleEntry`](../interfaces/AiTitleEntry.md) \| [`BridgeSessionEntry`](../interfaces/BridgeSessionEntry.md) \| [`CustomTitleEntry`](../interfaces/CustomTitleEntry.md) \| [`FileHistoryDeltaEntry`](../interfaces/FileHistoryDeltaEntry.md) \| [`FileHistorySnapshotEntry`](../interfaces/FileHistorySnapshotEntry.md) \| [`ForkContextRefEntry`](../interfaces/ForkContextRefEntry.md) \| [`FrameLinkEntry`](../interfaces/FrameLinkEntry.md) \| [`LastPromptEntry`](../interfaces/LastPromptEntry.md) \| [`ModeEntry`](../interfaces/ModeEntry.md) \| [`PermissionModeEntry`](../interfaces/PermissionModeEntry.md) \| [`PrLinkEntry`](../interfaces/PrLinkEntry.md) \| [`ProgressEntry`](../interfaces/ProgressEntry.md) \| [`QueueOperationEntry`](../interfaces/QueueOperationEntry.md) \| [`RelocatedEntry`](../interfaces/RelocatedEntry.md) \| [`ResultEntry`](../interfaces/ResultEntry.md) \| [`SavedHookContextEntry`](../interfaces/SavedHookContextEntry.md) \| [`StartedEntry`](../interfaces/StartedEntry.md) \| [`SummaryEntry`](../interfaces/SummaryEntry.md) \| [`WorktreeStateEntry`](../interfaces/WorktreeStateEntry.md)

Discriminated union of all JSONL line types. Switch on `entry.type` to narrow.
