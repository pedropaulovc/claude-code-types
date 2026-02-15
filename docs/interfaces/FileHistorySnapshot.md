[**claude-code-types**](../README.md)

***

[claude-code-types](../globals.md) / FileHistorySnapshot

# Interface: FileHistorySnapshot

Defined in: [index.d.ts:242](https://github.com/pedropaulovc/claude-code-types/blob/3d5b46cf3503065c7e2baa630d7a3a0fc77694ef/index.d.ts#L242)

Snapshot of all tracked file backups at a point in time.

## Properties

### messageId

> **messageId**: `string`

Defined in: [index.d.ts:243](https://github.com/pedropaulovc/claude-code-types/blob/3d5b46cf3503065c7e2baa630d7a3a0fc77694ef/index.d.ts#L243)

***

### timestamp

> **timestamp**: `string`

Defined in: [index.d.ts:244](https://github.com/pedropaulovc/claude-code-types/blob/3d5b46cf3503065c7e2baa630d7a3a0fc77694ef/index.d.ts#L244)

***

### trackedFileBackups

> **trackedFileBackups**: `Record`\<`string`, [`FileBackup`](FileBackup.md)\>

Defined in: [index.d.ts:246](https://github.com/pedropaulovc/claude-code-types/blob/3d5b46cf3503065c7e2baa630d7a3a0fc77694ef/index.d.ts#L246)

Map of original file path to backup info.
