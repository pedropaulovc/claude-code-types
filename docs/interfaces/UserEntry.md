[**claude-code-types**](../README.md)

***

[claude-code-types](../globals.md) / UserEntry

# Interface: UserEntry

Defined in: [index.d.ts:79](https://github.com/pedropaulovc/claude-code-types/blob/032184ef9882c837f6a2f953d1b3dafa1d2734ad/index.d.ts#L79)

Human message or tool result delivered back to the model.

## Extends

- [`EntryBase`](EntryBase.md)

## Properties

### agentId?

> `optional` **agentId**: `string`

Defined in: [index.d.ts:69](https://github.com/pedropaulovc/claude-code-types/blob/032184ef9882c837f6a2f953d1b3dafa1d2734ad/index.d.ts#L69)

Present on entries produced by subagents / Task tool invocations (e.g. `"a4044e6"`).

#### Inherited from

[`EntryBase`](EntryBase.md).[`agentId`](EntryBase.md#agentid)

***

### cwd

> **cwd**: `string`

Defined in: [index.d.ts:62](https://github.com/pedropaulovc/claude-code-types/blob/032184ef9882c837f6a2f953d1b3dafa1d2734ad/index.d.ts#L62)

Working directory at the time this entry was created.

#### Inherited from

[`EntryBase`](EntryBase.md).[`cwd`](EntryBase.md#cwd)

***

### gitBranch?

> `optional` **gitBranch**: `string`

Defined in: [index.d.ts:65](https://github.com/pedropaulovc/claude-code-types/blob/032184ef9882c837f6a2f953d1b3dafa1d2734ad/index.d.ts#L65)

#### Inherited from

[`EntryBase`](EntryBase.md).[`gitBranch`](EntryBase.md#gitbranch)

***

### imagePasteIds?

> `optional` **imagePasteIds**: `string`[]

Defined in: [index.d.ts:87](https://github.com/pedropaulovc/claude-code-types/blob/032184ef9882c837f6a2f953d1b3dafa1d2734ad/index.d.ts#L87)

***

### isCompactSummary?

> `optional` **isCompactSummary**: `boolean`

Defined in: [index.d.ts:84](https://github.com/pedropaulovc/claude-code-types/blob/032184ef9882c837f6a2f953d1b3dafa1d2734ad/index.d.ts#L84)

When `true`, this message is a compaction summary replacing earlier history.

***

### isMeta?

> `optional` **isMeta**: `boolean`

Defined in: [index.d.ts:82](https://github.com/pedropaulovc/claude-code-types/blob/032184ef9882c837f6a2f953d1b3dafa1d2734ad/index.d.ts#L82)

***

### isSidechain

> **isSidechain**: `boolean`

Defined in: [index.d.ts:57](https://github.com/pedropaulovc/claude-code-types/blob/032184ef9882c837f6a2f953d1b3dafa1d2734ad/index.d.ts#L57)

Whether this entry is on a side-chain (branched conversation path).

#### Inherited from

[`EntryBase`](EntryBase.md).[`isSidechain`](EntryBase.md#issidechain)

***

### isVisibleInTranscriptOnly?

> `optional` **isVisibleInTranscriptOnly**: `boolean`

Defined in: [index.d.ts:86](https://github.com/pedropaulovc/claude-code-types/blob/032184ef9882c837f6a2f953d1b3dafa1d2734ad/index.d.ts#L86)

When `true`, this message is shown in the transcript UI but not sent to the API.

***

### message

> **message**: [`UserMessage`](UserMessage.md)

Defined in: [index.d.ts:81](https://github.com/pedropaulovc/claude-code-types/blob/032184ef9882c837f6a2f953d1b3dafa1d2734ad/index.d.ts#L81)

***

### parentUuid

> **parentUuid**: `string` \| `null`

Defined in: [index.d.ts:55](https://github.com/pedropaulovc/claude-code-types/blob/032184ef9882c837f6a2f953d1b3dafa1d2734ad/index.d.ts#L55)

UUID of the parent entry in the conversation tree, or `null` for root.

#### Inherited from

[`EntryBase`](EntryBase.md).[`parentUuid`](EntryBase.md#parentuuid)

***

### permissionMode?

> `optional` **permissionMode**: [`PermissionMode`](../type-aliases/PermissionMode.md)

Defined in: [index.d.ts:88](https://github.com/pedropaulovc/claude-code-types/blob/032184ef9882c837f6a2f953d1b3dafa1d2734ad/index.d.ts#L88)

***

### planContent?

> `optional` **planContent**: `string`

Defined in: [index.d.ts:89](https://github.com/pedropaulovc/claude-code-types/blob/032184ef9882c837f6a2f953d1b3dafa1d2734ad/index.d.ts#L89)

***

### sessionId

> **sessionId**: `string`

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

### sourceToolAssistantUUID?

> `optional` **sourceToolAssistantUUID**: `string`

Defined in: [index.d.ts:95](https://github.com/pedropaulovc/claude-code-types/blob/032184ef9882c837f6a2f953d1b3dafa1d2734ad/index.d.ts#L95)

UUID of the assistant message whose tool_use triggered this result.

***

### sourceToolUseID?

> `optional` **sourceToolUseID**: `string`

Defined in: [index.d.ts:97](https://github.com/pedropaulovc/claude-code-types/blob/032184ef9882c837f6a2f953d1b3dafa1d2734ad/index.d.ts#L97)

ID of the tool_use content block this result corresponds to.

***

### teamName?

> `optional` **teamName**: `string`

Defined in: [index.d.ts:70](https://github.com/pedropaulovc/claude-code-types/blob/032184ef9882c837f6a2f953d1b3dafa1d2734ad/index.d.ts#L70)

#### Inherited from

[`EntryBase`](EntryBase.md).[`teamName`](EntryBase.md#teamname)

***

### thinkingMetadata?

> `optional` **thinkingMetadata**: [`ThinkingMetadata`](ThinkingMetadata.md)

Defined in: [index.d.ts:90](https://github.com/pedropaulovc/claude-code-types/blob/032184ef9882c837f6a2f953d1b3dafa1d2734ad/index.d.ts#L90)

***

### timestamp

> **timestamp**: `string`

Defined in: [index.d.ts:60](https://github.com/pedropaulovc/claude-code-types/blob/032184ef9882c837f6a2f953d1b3dafa1d2734ad/index.d.ts#L60)

ISO 8601 timestamp.

#### Inherited from

[`EntryBase`](EntryBase.md).[`timestamp`](EntryBase.md#timestamp)

***

### todos?

> `optional` **todos**: [`Todo`](Todo.md)[]

Defined in: [index.d.ts:91](https://github.com/pedropaulovc/claude-code-types/blob/032184ef9882c837f6a2f953d1b3dafa1d2734ad/index.d.ts#L91)

***

### toolUseResult?

> `optional` **toolUseResult**: `unknown`

Defined in: [index.d.ts:93](https://github.com/pedropaulovc/claude-code-types/blob/032184ef9882c837f6a2f953d1b3dafa1d2734ad/index.d.ts#L93)

Present when this user message is a tool result being delivered back.

***

### type

> **type**: `"user"`

Defined in: [index.d.ts:80](https://github.com/pedropaulovc/claude-code-types/blob/032184ef9882c837f6a2f953d1b3dafa1d2734ad/index.d.ts#L80)

***

### userType

> **userType**: `"external"`

Defined in: [index.d.ts:71](https://github.com/pedropaulovc/claude-code-types/blob/032184ef9882c837f6a2f953d1b3dafa1d2734ad/index.d.ts#L71)

#### Inherited from

[`EntryBase`](EntryBase.md).[`userType`](EntryBase.md#usertype)

***

### uuid

> **uuid**: `string`

Defined in: [index.d.ts:53](https://github.com/pedropaulovc/claude-code-types/blob/032184ef9882c837f6a2f953d1b3dafa1d2734ad/index.d.ts#L53)

Unique identifier for this entry.

#### Inherited from

[`EntryBase`](EntryBase.md).[`uuid`](EntryBase.md#uuid)

***

### version

> **version**: `string`

Defined in: [index.d.ts:64](https://github.com/pedropaulovc/claude-code-types/blob/032184ef9882c837f6a2f953d1b3dafa1d2734ad/index.d.ts#L64)

Claude Code version string (e.g. `"1.0.33"`).

#### Inherited from

[`EntryBase`](EntryBase.md).[`version`](EntryBase.md#version)
