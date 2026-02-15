[**claude-code-types**](../README.md)

***

[claude-code-types](../globals.md) / FileHistorySnapshot

# Interface: FileHistorySnapshot

Snapshot of all tracked file backups at a point in time.

## Properties

### messageId

> **messageId**: `string`

***

### timestamp

> **timestamp**: `string`

***

### trackedFileBackups

> **trackedFileBackups**: `Record`\<`string`, [`FileBackup`](FileBackup.md)\>

Map of original file path to backup info.
