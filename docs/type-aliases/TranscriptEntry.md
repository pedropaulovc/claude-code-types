[**claude-code-types**](../README.md)

***

[claude-code-types](../globals.md) / TranscriptEntry

# Type Alias: TranscriptEntry

> **TranscriptEntry** = [`UserEntry`](../interfaces/UserEntry.md) \| [`AssistantEntry`](../interfaces/AssistantEntry.md) \| [`SystemEntry`](../interfaces/SystemEntry.md) \| [`FileHistorySnapshotEntry`](../interfaces/FileHistorySnapshotEntry.md) \| [`PrLinkEntry`](../interfaces/PrLinkEntry.md) \| [`ProgressEntry`](../interfaces/ProgressEntry.md) \| [`QueueOperationEntry`](../interfaces/QueueOperationEntry.md) \| [`SavedHookContextEntry`](../interfaces/SavedHookContextEntry.md) \| [`SummaryEntry`](../interfaces/SummaryEntry.md)

Defined in: [index.d.ts:36](https://github.com/pedropaulovc/claude-code-types/blob/032184ef9882c837f6a2f953d1b3dafa1d2734ad/index.d.ts#L36)

Discriminated union of all JSONL line types. Switch on `entry.type` to narrow.
