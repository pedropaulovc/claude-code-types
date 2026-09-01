[**claude-code-types**](../README.md)

***

[claude-code-types](../README.md) / AttachmentEntry

# Interface: AttachmentEntry

Context attachment injected into the conversation by hooks, tools, or the
system. The `attachment` object is a discriminated union — switch on
`attachment.type` to narrow.

## Extends

- [`EntryBase`](EntryBase.md)

## Properties

### agentId?

> `optional` **agentId?**: `string`

Present on entries produced by subagents / Task tool invocations (e.g. `"a4044e6"`).

#### Inherited from

[`EntryBase`](EntryBase.md).[`agentId`](EntryBase.md#agentid)

***

### agentName?

> `optional` **agentName?**: `string`

Name of the agent that produced this entry (e.g. `"implementer"`, `"tester"`).

#### Inherited from

[`EntryBase`](EntryBase.md).[`agentName`](EntryBase.md#agentname)

***

### attachment

> **attachment**: [`Attachment`](../type-aliases/Attachment.md)

***

### cwd

> **cwd**: `string`

Working directory at the time this entry was created (e.g. `"/home/pedro/src/agent-plugins"`).

#### Inherited from

[`EntryBase`](EntryBase.md).[`cwd`](EntryBase.md#cwd)

***

### entrypoint?

> `optional` **entrypoint?**: `string`

How the session was started (e.g. `"cli"`).

#### Inherited from

[`EntryBase`](EntryBase.md).[`entrypoint`](EntryBase.md#entrypoint)

***

### forkedFrom?

> `optional` **forkedFrom?**: [`ForkedFromRef`](ForkedFromRef.md)

Present when this session was forked from another.

#### Inherited from

[`EntryBase`](EntryBase.md).[`forkedFrom`](EntryBase.md#forkedfrom)

***

### gitBranch?

> `optional` **gitBranch?**: `string`

Git branch checked out when this entry was created (e.g. `"main"`, `"HEAD"`).

#### Inherited from

[`EntryBase`](EntryBase.md).[`gitBranch`](EntryBase.md#gitbranch)

***

### isSidechain

> **isSidechain**: `boolean`

Whether this entry is on a side-chain (branched conversation path).

#### Inherited from

[`EntryBase`](EntryBase.md).[`isSidechain`](EntryBase.md#issidechain)

***

### parentUuid

> **parentUuid**: `string` \| `null`

UUID of the parent entry in the conversation tree, or `null` for root.

#### Inherited from

[`EntryBase`](EntryBase.md).[`parentUuid`](EntryBase.md#parentuuid)

***

### session\_id?

> `optional` **session\_id?**: `string`

Snake-case duplicate of [EntryBase.sessionId](EntryBase.md#sessionid); same value, emitted on newer entries.

#### Inherited from

[`EntryBase`](EntryBase.md).[`session_id`](EntryBase.md#session_id)

***

### sessionId?

> `optional` **sessionId?**: `string`

Session identifier; matches the JSONL filename (e.g. `"025df9d0-abb5-4df9-84c3-1038d59e6d95"`).

#### Inherited from

[`EntryBase`](EntryBase.md).[`sessionId`](EntryBase.md#sessionid)

***

### sessionKind?

> `optional` **sessionKind?**: `string` & `object` \| `"bg"`

Kind of session this entry belongs to. `"bg"` marks a background
(detached) session; absent for normal foreground sessions. Non-exhaustive.

#### Inherited from

[`EntryBase`](EntryBase.md).[`sessionKind`](EntryBase.md#sessionkind)

***

### slug?

> `optional` **slug?**: `string`

Project slug derived from the working directory (e.g. `"linked-sleeping-harbor"`).

#### Inherited from

[`EntryBase`](EntryBase.md).[`slug`](EntryBase.md#slug)

***

### teamName?

> `optional` **teamName?**: `string`

Name of the team this entry belongs to, for multi-agent sessions (e.g. `"web-ui"`).

#### Inherited from

[`EntryBase`](EntryBase.md).[`teamName`](EntryBase.md#teamname)

***

### timestamp

> **timestamp**: `string`

ISO 8601 timestamp (e.g. `"2026-06-04T23:51:02.971Z"`).

#### Inherited from

[`EntryBase`](EntryBase.md).[`timestamp`](EntryBase.md#timestamp)

***

### type

> **type**: `"attachment"`

***

### userType

> **userType**: `"external"`

#### Inherited from

[`EntryBase`](EntryBase.md).[`userType`](EntryBase.md#usertype)

***

### uuid

> **uuid**: `string`

Unique identifier for this entry.

#### Inherited from

[`EntryBase`](EntryBase.md).[`uuid`](EntryBase.md#uuid)

***

### version

> **version**: `string`

Claude Code version string (e.g. `"1.0.33"`).

#### Inherited from

[`EntryBase`](EntryBase.md).[`version`](EntryBase.md#version)
