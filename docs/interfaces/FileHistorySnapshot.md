[**claude-code-types**](../README.md)

***

[claude-code-types](../README.md) / FileHistorySnapshot

# Interface: FileHistorySnapshot

Snapshot of all tracked file backups at a point in time.

## Properties

### messageId

> **messageId**: `string`

***

### timestamp

> **timestamp**: `string`

ISO 8601 timestamp of the snapshot (e.g. `"2026-05-26T15:08:00.982Z"`).

***

### trackedFileBackups

> **trackedFileBackups**: `Record`\<`string`, [`FileBackup`](FileBackup.md)\>

Map of original file path to backup info.
