[**claude-code-types**](../README.md)

***

[claude-code-types](../README.md) / EntryBase

# Interface: EntryBase

## Extended by

- [`UserEntry`](UserEntry.md)
- [`AssistantEntry`](AssistantEntry.md)
- [`AttachmentEntry`](AttachmentEntry.md)

## Properties

### agentId?

> `optional` **agentId?**: `string`

Present on entries produced by subagents / Task tool invocations (e.g. `"a4044e6"`).

***

### agentName?

> `optional` **agentName?**: `string`

Name of the agent that produced this entry (e.g. `"implementer"`, `"tester"`).

***

### cwd

> **cwd**: `string`

Working directory at the time this entry was created (e.g. `"/home/pedro/src/agent-plugins"`).

***

### entrypoint?

> `optional` **entrypoint?**: `string`

How the session was started (e.g. `"cli"`).

***

### forkedFrom?

> `optional` **forkedFrom?**: [`ForkedFromRef`](ForkedFromRef.md)

Present when this session was forked from another.

***

### gitBranch?

> `optional` **gitBranch?**: `string`

Git branch checked out when this entry was created (e.g. `"main"`, `"HEAD"`).

***

### isSidechain

> **isSidechain**: `boolean`

Whether this entry is on a side-chain (branched conversation path).

***

### parentUuid

> **parentUuid**: `string` \| `null`

UUID of the parent entry in the conversation tree, or `null` for root.

***

### session\_id?

> `optional` **session\_id?**: `string`

Snake-case duplicate of [EntryBase.sessionId](#sessionid); same value, emitted on newer entries.

***

### sessionId

> **sessionId**: `string`

Session identifier; matches the JSONL filename (e.g. `"025df9d0-abb5-4df9-84c3-1038d59e6d95"`).

***

### sessionKind?

> `optional` **sessionKind?**: `string` & `object` \| `"bg"`

Kind of session this entry belongs to. `"bg"` marks a background
(detached) session; absent for normal foreground sessions. Non-exhaustive.

***

### slug?

> `optional` **slug?**: `string`

Project slug derived from the working directory (e.g. `"linked-sleeping-harbor"`).

***

### teamName?

> `optional` **teamName?**: `string`

Name of the team this entry belongs to, for multi-agent sessions (e.g. `"web-ui"`).

***

### timestamp

> **timestamp**: `string`

ISO 8601 timestamp (e.g. `"2026-06-04T23:51:02.971Z"`).

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
