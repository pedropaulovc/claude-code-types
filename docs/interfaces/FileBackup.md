[**claude-code-types**](../README.md)

***

[claude-code-types](../README.md) / FileBackup

# Interface: FileBackup

Backup metadata for a single tracked file.

## Properties

### backupFileName

> **backupFileName**: `string`

Name of the stored backup file, suffixed with the version tag (e.g. `"1d9302781d4ff254@v2"`).

***

### backupTime

> **backupTime**: `string`

ISO 8601 time the backup was taken (e.g. `"2026-05-26T17:18:28.461Z"`).

***

### version

> **version**: `number`

Monotonic backup version for this file (e.g. `1`, `2`).
