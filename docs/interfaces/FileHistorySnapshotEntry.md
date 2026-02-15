[**claude-code-types**](../README.md)

***

[claude-code-types](../globals.md) / FileHistorySnapshotEntry

# Interface: FileHistorySnapshotEntry

Defined in: [index.d.ts:233](https://github.com/pedropaulovc/claude-code-types/blob/3d5b46cf3503065c7e2baa630d7a3a0fc77694ef/index.d.ts#L233)

Tracks file backups for undo/restore. The `messageId` may collide with the
immediately following message's `uuid`.

## Properties

### isSnapshotUpdate

> **isSnapshotUpdate**: `boolean`

Defined in: [index.d.ts:237](https://github.com/pedropaulovc/claude-code-types/blob/3d5b46cf3503065c7e2baa630d7a3a0fc77694ef/index.d.ts#L237)

`false` for initial snapshot, `true` for incremental updates.

***

### messageId

> **messageId**: `string`

Defined in: [index.d.ts:235](https://github.com/pedropaulovc/claude-code-types/blob/3d5b46cf3503065c7e2baa630d7a3a0fc77694ef/index.d.ts#L235)

***

### snapshot

> **snapshot**: [`FileHistorySnapshot`](FileHistorySnapshot.md)

Defined in: [index.d.ts:238](https://github.com/pedropaulovc/claude-code-types/blob/3d5b46cf3503065c7e2baa630d7a3a0fc77694ef/index.d.ts#L238)

***

### type

> **type**: `"file-history-snapshot"`

Defined in: [index.d.ts:234](https://github.com/pedropaulovc/claude-code-types/blob/3d5b46cf3503065c7e2baa630d7a3a0fc77694ef/index.d.ts#L234)
