[**claude-code-types**](../README.md)

***

[claude-code-types](../README.md) / SystemEntry

# Interface: SystemEntry

Internal system events. Uses `Partial<EntryBase>` — not all base fields
are guaranteed present. Switch on `subtype` to determine which optional
fields are relevant:

- `api_error`: `error`, `cause`, `retryAttempt`, `retryInMs`, `maxRetries`
- `compact_boundary`: `compactMetadata`
- `microcompact_boundary`: `microcompactMetadata`
- `turn_duration`: `durationMs`
- `stop_hook_summary`: `hookCount`, `hookErrors`, `hookInfos`, `hasOutput`, `stopReason`, `preventedContinuation`

## Extends

- `Partial`\<[`EntryBase`](EntryBase.md)\>

## Properties

### agentId?

> `optional` **agentId**: `string`

Present on entries produced by subagents / Task tool invocations (e.g. `"a4044e6"`).

#### Inherited from

[`EntryBase`](EntryBase.md).[`agentId`](EntryBase.md#agentid)

***

### cause?

> `optional` **cause**: `string`

***

### compactMetadata?

> `optional` **compactMetadata**: [`CompactMetadata`](CompactMetadata.md)

Subtype `compact_boundary`.

***

### content?

> `optional` **content**: `string`

***

### cwd?

> `optional` **cwd**: `string`

Working directory at the time this entry was created.

#### Inherited from

[`EntryBase`](EntryBase.md).[`cwd`](EntryBase.md#cwd)

***

### durationMs?

> `optional` **durationMs**: `number`

Milliseconds the turn took (subtype `turn_duration`).

***

### error?

> `optional` **error**: `string`

Error message (subtype `api_error`).

***

### gitBranch?

> `optional` **gitBranch**: `string`

#### Inherited from

[`EntryBase`](EntryBase.md).[`gitBranch`](EntryBase.md#gitbranch)

***

### hasOutput?

> `optional` **hasOutput**: `boolean`

***

### hookCount?

> `optional` **hookCount**: `number`

Subtype `stop_hook_summary`.

***

### hookErrors?

> `optional` **hookErrors**: `unknown`[]

***

### hookInfos?

> `optional` **hookInfos**: `unknown`[]

***

### isMeta?

> `optional` **isMeta**: `boolean`

***

### isSidechain?

> `optional` **isSidechain**: `boolean`

Whether this entry is on a side-chain (branched conversation path).

#### Inherited from

[`EntryBase`](EntryBase.md).[`isSidechain`](EntryBase.md#issidechain)

***

### level?

> `optional` **level**: `string`

***

### logicalParentUuid?

> `optional` **logicalParentUuid**: `string`

***

### maxRetries?

> `optional` **maxRetries**: `number`

***

### microcompactMetadata?

> `optional` **microcompactMetadata**: [`MicrocompactMetadata`](MicrocompactMetadata.md)

Subtype `microcompact_boundary`.

***

### parentUuid?

> `optional` **parentUuid**: `string` \| `null`

UUID of the parent entry in the conversation tree, or `null` for root.

#### Inherited from

[`EntryBase`](EntryBase.md).[`parentUuid`](EntryBase.md#parentuuid)

***

### preventedContinuation?

> `optional` **preventedContinuation**: `boolean`

***

### retryAttempt?

> `optional` **retryAttempt**: `number`

***

### retryInMs?

> `optional` **retryInMs**: `number`

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

### stopReason?

> `optional` **stopReason**: `string`

***

### subtype

> **subtype**: [`SystemSubtype`](../type-aliases/SystemSubtype.md)

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

> **type**: `"system"`

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
