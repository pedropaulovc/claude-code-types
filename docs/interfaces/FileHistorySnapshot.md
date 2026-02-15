[**claude-code-types**](../README.md)

***

[claude-code-types](../globals.md) / FileHistorySnapshot

# Interface: FileHistorySnapshot

Defined in: [index.d.ts:242](https://github.com/pedropaulovc/claude-code-types/blob/032184ef9882c837f6a2f953d1b3dafa1d2734ad/index.d.ts#L242)

Snapshot of all tracked file backups at a point in time.

## Properties

### messageId

> **messageId**: `string`

Defined in: [index.d.ts:243](https://github.com/pedropaulovc/claude-code-types/blob/032184ef9882c837f6a2f953d1b3dafa1d2734ad/index.d.ts#L243)

***

### timestamp

> **timestamp**: `string`

Defined in: [index.d.ts:244](https://github.com/pedropaulovc/claude-code-types/blob/032184ef9882c837f6a2f953d1b3dafa1d2734ad/index.d.ts#L244)

***

### trackedFileBackups

> **trackedFileBackups**: `Record`\<`string`, [`FileBackup`](FileBackup.md)\>

Defined in: [index.d.ts:246](https://github.com/pedropaulovc/claude-code-types/blob/032184ef9882c837f6a2f953d1b3dafa1d2734ad/index.d.ts#L246)

Map of original file path to backup info.
