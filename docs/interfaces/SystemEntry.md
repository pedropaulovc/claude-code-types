[**claude-code-types**](../README.md)

***

[claude-code-types](../globals.md) / SystemEntry

# Interface: SystemEntry

Defined in: [index.d.ts:186](https://github.com/pedropaulovc/claude-code-types/blob/032184ef9882c837f6a2f953d1b3dafa1d2734ad/index.d.ts#L186)

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

Defined in: [index.d.ts:69](https://github.com/pedropaulovc/claude-code-types/blob/032184ef9882c837f6a2f953d1b3dafa1d2734ad/index.d.ts#L69)

Present on entries produced by subagents / Task tool invocations (e.g. `"a4044e6"`).

#### Inherited from

[`EntryBase`](EntryBase.md).[`agentId`](EntryBase.md#agentid)

***

### cause?

> `optional` **cause**: `string`

Defined in: [index.d.ts:196](https://github.com/pedropaulovc/claude-code-types/blob/032184ef9882c837f6a2f953d1b3dafa1d2734ad/index.d.ts#L196)

***

### compactMetadata?

> `optional` **compactMetadata**: [`CompactMetadata`](CompactMetadata.md)

Defined in: [index.d.ts:201](https://github.com/pedropaulovc/claude-code-types/blob/032184ef9882c837f6a2f953d1b3dafa1d2734ad/index.d.ts#L201)

Subtype `compact_boundary`.

***

### content?

> `optional` **content**: `string`

Defined in: [index.d.ts:190](https://github.com/pedropaulovc/claude-code-types/blob/032184ef9882c837f6a2f953d1b3dafa1d2734ad/index.d.ts#L190)

***

### cwd?

> `optional` **cwd**: `string`

Defined in: [index.d.ts:62](https://github.com/pedropaulovc/claude-code-types/blob/032184ef9882c837f6a2f953d1b3dafa1d2734ad/index.d.ts#L62)

Working directory at the time this entry was created.

#### Inherited from

[`EntryBase`](EntryBase.md).[`cwd`](EntryBase.md#cwd)

***

### durationMs?

> `optional` **durationMs**: `number`

Defined in: [index.d.ts:193](https://github.com/pedropaulovc/claude-code-types/blob/032184ef9882c837f6a2f953d1b3dafa1d2734ad/index.d.ts#L193)

Milliseconds the turn took (subtype `turn_duration`).

***

### error?

> `optional` **error**: `string`

Defined in: [index.d.ts:195](https://github.com/pedropaulovc/claude-code-types/blob/032184ef9882c837f6a2f953d1b3dafa1d2734ad/index.d.ts#L195)

Error message (subtype `api_error`).

***

### gitBranch?

> `optional` **gitBranch**: `string`

Defined in: [index.d.ts:65](https://github.com/pedropaulovc/claude-code-types/blob/032184ef9882c837f6a2f953d1b3dafa1d2734ad/index.d.ts#L65)

#### Inherited from

[`EntryBase`](EntryBase.md).[`gitBranch`](EntryBase.md#gitbranch)

***

### hasOutput?

> `optional` **hasOutput**: `boolean`

Defined in: [index.d.ts:208](https://github.com/pedropaulovc/claude-code-types/blob/032184ef9882c837f6a2f953d1b3dafa1d2734ad/index.d.ts#L208)

***

### hookCount?

> `optional` **hookCount**: `number`

Defined in: [index.d.ts:205](https://github.com/pedropaulovc/claude-code-types/blob/032184ef9882c837f6a2f953d1b3dafa1d2734ad/index.d.ts#L205)

Subtype `stop_hook_summary`.

***

### hookErrors?

> `optional` **hookErrors**: `unknown`[]

Defined in: [index.d.ts:206](https://github.com/pedropaulovc/claude-code-types/blob/032184ef9882c837f6a2f953d1b3dafa1d2734ad/index.d.ts#L206)

***

### hookInfos?

> `optional` **hookInfos**: `unknown`[]

Defined in: [index.d.ts:207](https://github.com/pedropaulovc/claude-code-types/blob/032184ef9882c837f6a2f953d1b3dafa1d2734ad/index.d.ts#L207)

***

### isMeta?

> `optional` **isMeta**: `boolean`

Defined in: [index.d.ts:189](https://github.com/pedropaulovc/claude-code-types/blob/032184ef9882c837f6a2f953d1b3dafa1d2734ad/index.d.ts#L189)

***

### isSidechain?

> `optional` **isSidechain**: `boolean`

Defined in: [index.d.ts:57](https://github.com/pedropaulovc/claude-code-types/blob/032184ef9882c837f6a2f953d1b3dafa1d2734ad/index.d.ts#L57)

Whether this entry is on a side-chain (branched conversation path).

#### Inherited from

[`EntryBase`](EntryBase.md).[`isSidechain`](EntryBase.md#issidechain)

***

### level?

> `optional` **level**: `string`

Defined in: [index.d.ts:191](https://github.com/pedropaulovc/claude-code-types/blob/032184ef9882c837f6a2f953d1b3dafa1d2734ad/index.d.ts#L191)

***

### logicalParentUuid?

> `optional` **logicalParentUuid**: `string`

Defined in: [index.d.ts:212](https://github.com/pedropaulovc/claude-code-types/blob/032184ef9882c837f6a2f953d1b3dafa1d2734ad/index.d.ts#L212)

***

### maxRetries?

> `optional` **maxRetries**: `number`

Defined in: [index.d.ts:199](https://github.com/pedropaulovc/claude-code-types/blob/032184ef9882c837f6a2f953d1b3dafa1d2734ad/index.d.ts#L199)

***

### microcompactMetadata?

> `optional` **microcompactMetadata**: [`MicrocompactMetadata`](MicrocompactMetadata.md)

Defined in: [index.d.ts:203](https://github.com/pedropaulovc/claude-code-types/blob/032184ef9882c837f6a2f953d1b3dafa1d2734ad/index.d.ts#L203)

Subtype `microcompact_boundary`.

***

### parentUuid?

> `optional` **parentUuid**: `string` \| `null`

Defined in: [index.d.ts:55](https://github.com/pedropaulovc/claude-code-types/blob/032184ef9882c837f6a2f953d1b3dafa1d2734ad/index.d.ts#L55)

UUID of the parent entry in the conversation tree, or `null` for root.

#### Inherited from

[`EntryBase`](EntryBase.md).[`parentUuid`](EntryBase.md#parentuuid)

***

### preventedContinuation?

> `optional` **preventedContinuation**: `boolean`

Defined in: [index.d.ts:210](https://github.com/pedropaulovc/claude-code-types/blob/032184ef9882c837f6a2f953d1b3dafa1d2734ad/index.d.ts#L210)

***

### retryAttempt?

> `optional` **retryAttempt**: `number`

Defined in: [index.d.ts:197](https://github.com/pedropaulovc/claude-code-types/blob/032184ef9882c837f6a2f953d1b3dafa1d2734ad/index.d.ts#L197)

***

### retryInMs?

> `optional` **retryInMs**: `number`

Defined in: [index.d.ts:198](https://github.com/pedropaulovc/claude-code-types/blob/032184ef9882c837f6a2f953d1b3dafa1d2734ad/index.d.ts#L198)

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

### stopReason?

> `optional` **stopReason**: `string`

Defined in: [index.d.ts:209](https://github.com/pedropaulovc/claude-code-types/blob/032184ef9882c837f6a2f953d1b3dafa1d2734ad/index.d.ts#L209)

***

### subtype

> **subtype**: [`SystemSubtype`](../type-aliases/SystemSubtype.md)

Defined in: [index.d.ts:188](https://github.com/pedropaulovc/claude-code-types/blob/032184ef9882c837f6a2f953d1b3dafa1d2734ad/index.d.ts#L188)

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

Defined in: [index.d.ts:211](https://github.com/pedropaulovc/claude-code-types/blob/032184ef9882c837f6a2f953d1b3dafa1d2734ad/index.d.ts#L211)

***

### type

> **type**: `"system"`

Defined in: [index.d.ts:187](https://github.com/pedropaulovc/claude-code-types/blob/032184ef9882c837f6a2f953d1b3dafa1d2734ad/index.d.ts#L187)

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
