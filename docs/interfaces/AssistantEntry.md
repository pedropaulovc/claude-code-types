[**claude-code-types**](../README.md)

***

[claude-code-types](../globals.md) / AssistantEntry

# Interface: AssistantEntry

Defined in: [index.d.ts:118](https://github.com/pedropaulovc/claude-code-types/blob/3d5b46cf3503065c7e2baa630d7a3a0fc77694ef/index.d.ts#L118)

Model response, including text, thinking, and tool calls.

## Extends

- [`EntryBase`](EntryBase.md)

## Properties

### agentId?

> `optional` **agentId**: `string`

Defined in: [index.d.ts:69](https://github.com/pedropaulovc/claude-code-types/blob/3d5b46cf3503065c7e2baa630d7a3a0fc77694ef/index.d.ts#L69)

Present on entries produced by subagents / Task tool invocations (e.g. `"a4044e6"`).

#### Inherited from

[`EntryBase`](EntryBase.md).[`agentId`](EntryBase.md#agentid)

***

### apiError?

> `optional` **apiError**: `unknown`

Defined in: [index.d.ts:124](https://github.com/pedropaulovc/claude-code-types/blob/3d5b46cf3503065c7e2baa630d7a3a0fc77694ef/index.d.ts#L124)

Present when the API returned an error instead of a response.

***

### cwd

> **cwd**: `string`

Defined in: [index.d.ts:62](https://github.com/pedropaulovc/claude-code-types/blob/3d5b46cf3503065c7e2baa630d7a3a0fc77694ef/index.d.ts#L62)

Working directory at the time this entry was created.

#### Inherited from

[`EntryBase`](EntryBase.md).[`cwd`](EntryBase.md#cwd)

***

### error?

> `optional` **error**: `string`

Defined in: [index.d.ts:125](https://github.com/pedropaulovc/claude-code-types/blob/3d5b46cf3503065c7e2baa630d7a3a0fc77694ef/index.d.ts#L125)

***

### gitBranch?

> `optional` **gitBranch**: `string`

Defined in: [index.d.ts:65](https://github.com/pedropaulovc/claude-code-types/blob/3d5b46cf3503065c7e2baa630d7a3a0fc77694ef/index.d.ts#L65)

#### Inherited from

[`EntryBase`](EntryBase.md).[`gitBranch`](EntryBase.md#gitbranch)

***

### isApiErrorMessage?

> `optional` **isApiErrorMessage**: `boolean`

Defined in: [index.d.ts:126](https://github.com/pedropaulovc/claude-code-types/blob/3d5b46cf3503065c7e2baa630d7a3a0fc77694ef/index.d.ts#L126)

***

### isSidechain

> **isSidechain**: `boolean`

Defined in: [index.d.ts:57](https://github.com/pedropaulovc/claude-code-types/blob/3d5b46cf3503065c7e2baa630d7a3a0fc77694ef/index.d.ts#L57)

Whether this entry is on a side-chain (branched conversation path).

#### Inherited from

[`EntryBase`](EntryBase.md).[`isSidechain`](EntryBase.md#issidechain)

***

### message

> **message**: [`AssistantMessage`](AssistantMessage.md)

Defined in: [index.d.ts:120](https://github.com/pedropaulovc/claude-code-types/blob/3d5b46cf3503065c7e2baa630d7a3a0fc77694ef/index.d.ts#L120)

***

### parentUuid

> **parentUuid**: `string` \| `null`

Defined in: [index.d.ts:55](https://github.com/pedropaulovc/claude-code-types/blob/3d5b46cf3503065c7e2baa630d7a3a0fc77694ef/index.d.ts#L55)

UUID of the parent entry in the conversation tree, or `null` for root.

#### Inherited from

[`EntryBase`](EntryBase.md).[`parentUuid`](EntryBase.md#parentuuid)

***

### requestId?

> `optional` **requestId**: `string`

Defined in: [index.d.ts:122](https://github.com/pedropaulovc/claude-code-types/blob/3d5b46cf3503065c7e2baa630d7a3a0fc77694ef/index.d.ts#L122)

Anthropic API request ID for this response.

***

### sessionId

> **sessionId**: `string`

Defined in: [index.d.ts:58](https://github.com/pedropaulovc/claude-code-types/blob/3d5b46cf3503065c7e2baa630d7a3a0fc77694ef/index.d.ts#L58)

#### Inherited from

[`EntryBase`](EntryBase.md).[`sessionId`](EntryBase.md#sessionid)

***

### slug?

> `optional` **slug**: `string`

Defined in: [index.d.ts:67](https://github.com/pedropaulovc/claude-code-types/blob/3d5b46cf3503065c7e2baa630d7a3a0fc77694ef/index.d.ts#L67)

Project slug derived from the working directory.

#### Inherited from

[`EntryBase`](EntryBase.md).[`slug`](EntryBase.md#slug)

***

### teamName?

> `optional` **teamName**: `string`

Defined in: [index.d.ts:70](https://github.com/pedropaulovc/claude-code-types/blob/3d5b46cf3503065c7e2baa630d7a3a0fc77694ef/index.d.ts#L70)

#### Inherited from

[`EntryBase`](EntryBase.md).[`teamName`](EntryBase.md#teamname)

***

### timestamp

> **timestamp**: `string`

Defined in: [index.d.ts:60](https://github.com/pedropaulovc/claude-code-types/blob/3d5b46cf3503065c7e2baa630d7a3a0fc77694ef/index.d.ts#L60)

ISO 8601 timestamp.

#### Inherited from

[`EntryBase`](EntryBase.md).[`timestamp`](EntryBase.md#timestamp)

***

### type

> **type**: `"assistant"`

Defined in: [index.d.ts:119](https://github.com/pedropaulovc/claude-code-types/blob/3d5b46cf3503065c7e2baa630d7a3a0fc77694ef/index.d.ts#L119)

***

### userType

> **userType**: `"external"`

Defined in: [index.d.ts:71](https://github.com/pedropaulovc/claude-code-types/blob/3d5b46cf3503065c7e2baa630d7a3a0fc77694ef/index.d.ts#L71)

#### Inherited from

[`EntryBase`](EntryBase.md).[`userType`](EntryBase.md#usertype)

***

### uuid

> **uuid**: `string`

Defined in: [index.d.ts:53](https://github.com/pedropaulovc/claude-code-types/blob/3d5b46cf3503065c7e2baa630d7a3a0fc77694ef/index.d.ts#L53)

Unique identifier for this entry.

#### Inherited from

[`EntryBase`](EntryBase.md).[`uuid`](EntryBase.md#uuid)

***

### version

> **version**: `string`

Defined in: [index.d.ts:64](https://github.com/pedropaulovc/claude-code-types/blob/3d5b46cf3503065c7e2baa630d7a3a0fc77694ef/index.d.ts#L64)

Claude Code version string (e.g. `"1.0.33"`).

#### Inherited from

[`EntryBase`](EntryBase.md).[`version`](EntryBase.md#version)
