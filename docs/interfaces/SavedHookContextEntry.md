[**claude-code-types**](../README.md)

***

[claude-code-types](../globals.md) / SavedHookContextEntry

# Interface: SavedHookContextEntry

Persisted context from a hook execution.

## Extends

- `Partial`\<[`EntryBase`](EntryBase.md)\>

## Properties

### agentId?

> `optional` **agentId**: `string`

Present on entries produced by subagents / Task tool invocations (e.g. `"a4044e6"`).

#### Inherited from

[`EntryBase`](EntryBase.md).[`agentId`](EntryBase.md#agentid)

***

### content

> **content**: `string`[]

***

### cwd?

> `optional` **cwd**: `string`

Working directory at the time this entry was created.

#### Inherited from

[`EntryBase`](EntryBase.md).[`cwd`](EntryBase.md#cwd)

***

### gitBranch?

> `optional` **gitBranch**: `string`

#### Inherited from

[`EntryBase`](EntryBase.md).[`gitBranch`](EntryBase.md#gitbranch)

***

### hookEvent?

> `optional` **hookEvent**: `string`

***

### hookName?

> `optional` **hookName**: `string`

***

### isSidechain?

> `optional` **isSidechain**: `boolean`

Whether this entry is on a side-chain (branched conversation path).

#### Inherited from

[`EntryBase`](EntryBase.md).[`isSidechain`](EntryBase.md#issidechain)

***

### parentUuid?

> `optional` **parentUuid**: `string` \| `null`

UUID of the parent entry in the conversation tree, or `null` for root.

#### Inherited from

[`EntryBase`](EntryBase.md).[`parentUuid`](EntryBase.md#parentuuid)

***

### sessionId?

> `optional` **sessionId**: `string`

#### Inherited from

[`EntryBase`](EntryBase.md).[`sessionId`](EntryBase.md#sessionid)

***

### slug?

> `optional` **slug**: `string`

Project slug derived from the working directory.

#### Inherited from

[`EntryBase`](EntryBase.md).[`slug`](EntryBase.md#slug)

***

### teamName?

> `optional` **teamName**: `string`

#### Inherited from

[`EntryBase`](EntryBase.md).[`teamName`](EntryBase.md#teamname)

***

### timestamp?

> `optional` **timestamp**: `string`

ISO 8601 timestamp.

#### Inherited from

[`EntryBase`](EntryBase.md).[`timestamp`](EntryBase.md#timestamp)

***

### toolUseID?

> `optional` **toolUseID**: `string`

***

### type

> **type**: `"saved_hook_context"`

***

### userType?

> `optional` **userType**: `"external"`

#### Inherited from

[`EntryBase`](EntryBase.md).[`userType`](EntryBase.md#usertype)

***

### uuid?

> `optional` **uuid**: `string`

Unique identifier for this entry.

#### Inherited from

[`EntryBase`](EntryBase.md).[`uuid`](EntryBase.md#uuid)

***

### version?

> `optional` **version**: `string`

Claude Code version string (e.g. `"1.0.33"`).

#### Inherited from

[`EntryBase`](EntryBase.md).[`version`](EntryBase.md#version)
