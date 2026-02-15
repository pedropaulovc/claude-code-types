[**claude-code-types**](../README.md)

***

[claude-code-types](../README.md) / FileHistorySnapshotEntry

# Interface: FileHistorySnapshotEntry

Tracks file backups for undo/restore. The `messageId` may collide with the
immediately following message's `uuid`.

## Properties

### isSnapshotUpdate

> **isSnapshotUpdate**: `boolean`

`false` for initial snapshot, `true` for incremental updates.

***

### messageId

> **messageId**: `string`

***

### snapshot

> **snapshot**: [`FileHistorySnapshot`](FileHistorySnapshot.md)

***

### type

> **type**: `"file-history-snapshot"`
