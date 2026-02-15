[**claude-code-types**](../README.md)

***

[claude-code-types](../globals.md) / TranscriptEntry

# Type Alias: TranscriptEntry

> **TranscriptEntry** = [`UserEntry`](../interfaces/UserEntry.md) \| [`AssistantEntry`](../interfaces/AssistantEntry.md) \| [`SystemEntry`](../interfaces/SystemEntry.md) \| [`FileHistorySnapshotEntry`](../interfaces/FileHistorySnapshotEntry.md) \| [`PrLinkEntry`](../interfaces/PrLinkEntry.md) \| [`ProgressEntry`](../interfaces/ProgressEntry.md) \| [`QueueOperationEntry`](../interfaces/QueueOperationEntry.md) \| [`SavedHookContextEntry`](../interfaces/SavedHookContextEntry.md) \| [`SummaryEntry`](../interfaces/SummaryEntry.md)

Defined in: [index.d.ts:36](https://github.com/pedropaulovc/claude-code-types/blob/3d5b46cf3503065c7e2baa630d7a3a0fc77694ef/index.d.ts#L36)

Discriminated union of all JSONL line types. Switch on `entry.type` to narrow.
