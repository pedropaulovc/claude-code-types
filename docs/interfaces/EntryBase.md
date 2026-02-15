[**claude-code-types**](../README.md)

***

[claude-code-types](../globals.md) / EntryBase

# Interface: EntryBase

## Extended by

- [`UserEntry`](UserEntry.md)
- [`AssistantEntry`](AssistantEntry.md)

## Properties

### agentId?

> `optional` **agentId**: `string`

Present on entries produced by subagents / Task tool invocations (e.g. `"a4044e6"`).

***

### cwd

> **cwd**: `string`

Working directory at the time this entry was created.

***

### gitBranch?

> `optional` **gitBranch**: `string`

***

### isSidechain

> **isSidechain**: `boolean`

Whether this entry is on a side-chain (branched conversation path).

***

### parentUuid

> **parentUuid**: `string` \| `null`

UUID of the parent entry in the conversation tree, or `null` for root.

***

### sessionId

> **sessionId**: `string`

***

### slug?

> `optional` **slug**: `string`

Project slug derived from the working directory.

***

### teamName?

> `optional` **teamName**: `string`

***

### timestamp

> **timestamp**: `string`

ISO 8601 timestamp.

***

### userType

> **userType**: `"external"`

***

### uuid

> **uuid**: `string`

Unique identifier for this entry.

***

### version

> **version**: `string`

Claude Code version string (e.g. `"1.0.33"`).
