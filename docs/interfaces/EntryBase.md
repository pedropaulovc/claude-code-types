[**claude-code-types**](../README.md)

***

[claude-code-types](../globals.md) / EntryBase

# Interface: EntryBase

Defined in: [index.d.ts:51](https://github.com/pedropaulovc/claude-code-types/blob/3d5b46cf3503065c7e2baa630d7a3a0fc77694ef/index.d.ts#L51)

## Extended by

- [`UserEntry`](UserEntry.md)
- [`AssistantEntry`](AssistantEntry.md)

## Properties

### agentId?

> `optional` **agentId**: `string`

Defined in: [index.d.ts:69](https://github.com/pedropaulovc/claude-code-types/blob/3d5b46cf3503065c7e2baa630d7a3a0fc77694ef/index.d.ts#L69)

Present on entries produced by subagents / Task tool invocations (e.g. `"a4044e6"`).

***

### cwd

> **cwd**: `string`

Defined in: [index.d.ts:62](https://github.com/pedropaulovc/claude-code-types/blob/3d5b46cf3503065c7e2baa630d7a3a0fc77694ef/index.d.ts#L62)

Working directory at the time this entry was created.

***

### gitBranch?

> `optional` **gitBranch**: `string`

Defined in: [index.d.ts:65](https://github.com/pedropaulovc/claude-code-types/blob/3d5b46cf3503065c7e2baa630d7a3a0fc77694ef/index.d.ts#L65)

***

### isSidechain

> **isSidechain**: `boolean`

Defined in: [index.d.ts:57](https://github.com/pedropaulovc/claude-code-types/blob/3d5b46cf3503065c7e2baa630d7a3a0fc77694ef/index.d.ts#L57)

Whether this entry is on a side-chain (branched conversation path).

***

### parentUuid

> **parentUuid**: `string` \| `null`

Defined in: [index.d.ts:55](https://github.com/pedropaulovc/claude-code-types/blob/3d5b46cf3503065c7e2baa630d7a3a0fc77694ef/index.d.ts#L55)

UUID of the parent entry in the conversation tree, or `null` for root.

***

### sessionId

> **sessionId**: `string`

Defined in: [index.d.ts:58](https://github.com/pedropaulovc/claude-code-types/blob/3d5b46cf3503065c7e2baa630d7a3a0fc77694ef/index.d.ts#L58)

***

### slug?

> `optional` **slug**: `string`

Defined in: [index.d.ts:67](https://github.com/pedropaulovc/claude-code-types/blob/3d5b46cf3503065c7e2baa630d7a3a0fc77694ef/index.d.ts#L67)

Project slug derived from the working directory.

***

### teamName?

> `optional` **teamName**: `string`

Defined in: [index.d.ts:70](https://github.com/pedropaulovc/claude-code-types/blob/3d5b46cf3503065c7e2baa630d7a3a0fc77694ef/index.d.ts#L70)

***

### timestamp

> **timestamp**: `string`

Defined in: [index.d.ts:60](https://github.com/pedropaulovc/claude-code-types/blob/3d5b46cf3503065c7e2baa630d7a3a0fc77694ef/index.d.ts#L60)

ISO 8601 timestamp.

***

### userType

> **userType**: `"external"`

Defined in: [index.d.ts:71](https://github.com/pedropaulovc/claude-code-types/blob/3d5b46cf3503065c7e2baa630d7a3a0fc77694ef/index.d.ts#L71)

***

### uuid

> **uuid**: `string`

Defined in: [index.d.ts:53](https://github.com/pedropaulovc/claude-code-types/blob/3d5b46cf3503065c7e2baa630d7a3a0fc77694ef/index.d.ts#L53)

Unique identifier for this entry.

***

### version

> **version**: `string`

Defined in: [index.d.ts:64](https://github.com/pedropaulovc/claude-code-types/blob/3d5b46cf3503065c7e2baa630d7a3a0fc77694ef/index.d.ts#L64)

Claude Code version string (e.g. `"1.0.33"`).
