[**claude-code-types**](../README.md)

***

[claude-code-types](../README.md) / PrLinkEntry

# Interface: PrLinkEntry

Records a pull request created or linked during the session.

## Properties

### prNumber

> **prNumber**: `number`

Pull request number (e.g. `6`, `233`).

***

### prRepository

> **prRepository**: `string`

`owner/repo` slug the PR belongs to (e.g. `"vezzadev/roster"`, `"pedropaulovc/el400"`).

***

### prUrl

> **prUrl**: `string`

Full URL of the pull request (e.g. `"https://github.com/pedropaulovc/youtube-mirror/pull/6"`).

***

### sessionId

> **sessionId**: `string`

***

### timestamp

> **timestamp**: `string`

ISO 8601 timestamp (e.g. `"2026-06-01T16:11:35.851Z"`).

***

### type

> **type**: `"pr-link"`
