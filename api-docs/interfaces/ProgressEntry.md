[**claude-code-types**](../README.md)

***

[claude-code-types](../globals.md) / ProgressEntry

# Interface: ProgressEntry

Defined in: [index.d.ts:281](https://github.com/pedropaulovc/claude-code-types/blob/032184ef9882c837f6a2f953d1b3dafa1d2734ad/index.d.ts#L281)

Streaming updates from a subagent / Task tool invocation.

**Caveat:** Progress entries can be very large (multi-MB) because they may
include full `normalizedMessages` snapshots. The `parentToolUseID` may
reference UUIDs that don't exist elsewhere in the file.

## Extends

- `Partial`\<[`EntryBase`](EntryBase.md)\>

## Properties

### agentId?

> `optional` **agentId**: `string`

Defined in: [index.d.ts:69](https://github.com/pedropaulovc/claude-code-types/blob/032184ef9882c837f6a2f953d1b3dafa1d2734ad/index.d.ts#L69)

Present on entries produced by subagents / Task tool invocations (e.g. `"a4044e6"`).

#### Inherited from

[`EntryBase`](EntryBase.md).[`agentId`](EntryBase.md#agentid)

***

### cwd?

> `optional` **cwd**: `string`

Defined in: [index.d.ts:62](https://github.com/pedropaulovc/claude-code-types/blob/032184ef9882c837f6a2f953d1b3dafa1d2734ad/index.d.ts#L62)

Working directory at the time this entry was created.

#### Inherited from

[`EntryBase`](EntryBase.md).[`cwd`](EntryBase.md#cwd)

***

### data

> **data**: [`ProgressData`](ProgressData.md)

Defined in: [index.d.ts:283](https://github.com/pedropaulovc/claude-code-types/blob/032184ef9882c837f6a2f953d1b3dafa1d2734ad/index.d.ts#L283)

***

### gitBranch?

> `optional` **gitBranch**: `string`

Defined in: [index.d.ts:65](https://github.com/pedropaulovc/claude-code-types/blob/032184ef9882c837f6a2f953d1b3dafa1d2734ad/index.d.ts#L65)

#### Inherited from

[`EntryBase`](EntryBase.md).[`gitBranch`](EntryBase.md#gitbranch)

***

### isSidechain?

> `optional` **isSidechain**: `boolean`

Defined in: [index.d.ts:57](https://github.com/pedropaulovc/claude-code-types/blob/032184ef9882c837f6a2f953d1b3dafa1d2734ad/index.d.ts#L57)

Whether this entry is on a side-chain (branched conversation path).

#### Inherited from

[`EntryBase`](EntryBase.md).[`isSidechain`](EntryBase.md#issidechain)

***

### parentToolUseID?

> `optional` **parentToolUseID**: `string`

Defined in: [index.d.ts:284](https://github.com/pedropaulovc/claude-code-types/blob/032184ef9882c837f6a2f953d1b3dafa1d2734ad/index.d.ts#L284)

***

### parentUuid?

> `optional` **parentUuid**: `string` \| `null`

Defined in: [index.d.ts:55](https://github.com/pedropaulovc/claude-code-types/blob/032184ef9882c837f6a2f953d1b3dafa1d2734ad/index.d.ts#L55)

UUID of the parent entry in the conversation tree, or `null` for root.

#### Inherited from

[`EntryBase`](EntryBase.md).[`parentUuid`](EntryBase.md#parentuuid)

***

### sessionId?

> `optional` **sessionId**: `string`

Defined in: [index.d.ts:58](https://github.com/pedropaulovc/claude-code-types/blob/032184ef9882c837f6a2f953d1b3dafa1d2734ad/index.d.ts#L58)

#### Inherited from

[`EntryBase`](EntryBase.md).[`sessionId`](EntryBase.md#sessionid)

***

### slug?

> `optional` **slug**: `string`

Defined in: [index.d.ts:67](https://github.com/pedropaulovc/claude-code-types/blob/032184ef9882c837f6a2f953d1b3dafa1d2734ad/index.d.ts#L67)

Project slug derived from the working directory.

#### Inherited from

[`EntryBase`](EntryBase.md).[`slug`](EntryBase.md#slug)

***

### teamName?

> `optional` **teamName**: `string`

Defined in: [index.d.ts:70](https://github.com/pedropaulovc/claude-code-types/blob/032184ef9882c837f6a2f953d1b3dafa1d2734ad/index.d.ts#L70)

#### Inherited from

[`EntryBase`](EntryBase.md).[`teamName`](EntryBase.md#teamname)

***

### timestamp?

> `optional` **timestamp**: `string`

Defined in: [index.d.ts:60](https://github.com/pedropaulovc/claude-code-types/blob/032184ef9882c837f6a2f953d1b3dafa1d2734ad/index.d.ts#L60)

ISO 8601 timestamp.

#### Inherited from

[`EntryBase`](EntryBase.md).[`timestamp`](EntryBase.md#timestamp)

***

### toolUseID?

> `optional` **toolUseID**: `string`

Defined in: [index.d.ts:285](https://github.com/pedropaulovc/claude-code-types/blob/032184ef9882c837f6a2f953d1b3dafa1d2734ad/index.d.ts#L285)

***

### type

> **type**: `"progress"`

Defined in: [index.d.ts:282](https://github.com/pedropaulovc/claude-code-types/blob/032184ef9882c837f6a2f953d1b3dafa1d2734ad/index.d.ts#L282)

***

### userType?

> `optional` **userType**: `"external"`

Defined in: [index.d.ts:71](https://github.com/pedropaulovc/claude-code-types/blob/032184ef9882c837f6a2f953d1b3dafa1d2734ad/index.d.ts#L71)

#### Inherited from

[`EntryBase`](EntryBase.md).[`userType`](EntryBase.md#usertype)

***

### uuid?

> `optional` **uuid**: `string`

Defined in: [index.d.ts:53](https://github.com/pedropaulovc/claude-code-types/blob/032184ef9882c837f6a2f953d1b3dafa1d2734ad/index.d.ts#L53)

Unique identifier for this entry.

#### Inherited from

[`EntryBase`](EntryBase.md).[`uuid`](EntryBase.md#uuid)

***

### version?

> `optional` **version**: `string`

Defined in: [index.d.ts:64](https://github.com/pedropaulovc/claude-code-types/blob/032184ef9882c837f6a2f953d1b3dafa1d2734ad/index.d.ts#L64)

Claude Code version string (e.g. `"1.0.33"`).

#### Inherited from

[`EntryBase`](EntryBase.md).[`version`](EntryBase.md#version)
