[**claude-code-types**](../README.md)

***

[claude-code-types](../globals.md) / UserEntry

# Interface: UserEntry

Human message or tool result delivered back to the model.

## Extends

- [`EntryBase`](EntryBase.md)

## Properties

### agentId?

> `optional` **agentId**: `string`

Present on entries produced by subagents / Task tool invocations (e.g. `"a4044e6"`).

#### Inherited from

[`EntryBase`](EntryBase.md).[`agentId`](EntryBase.md#agentid)

***

### cwd

> **cwd**: `string`

Working directory at the time this entry was created.

#### Inherited from

[`EntryBase`](EntryBase.md).[`cwd`](EntryBase.md#cwd)

***

### gitBranch?

> `optional` **gitBranch**: `string`

#### Inherited from

[`EntryBase`](EntryBase.md).[`gitBranch`](EntryBase.md#gitbranch)

***

### imagePasteIds?

> `optional` **imagePasteIds**: `string`[]

***

### isCompactSummary?

> `optional` **isCompactSummary**: `boolean`

When `true`, this message is a compaction summary replacing earlier history.

***

### isMeta?

> `optional` **isMeta**: `boolean`

***

### isSidechain

> **isSidechain**: `boolean`

Whether this entry is on a side-chain (branched conversation path).

#### Inherited from

[`EntryBase`](EntryBase.md).[`isSidechain`](EntryBase.md#issidechain)

***

### isVisibleInTranscriptOnly?

> `optional` **isVisibleInTranscriptOnly**: `boolean`

When `true`, this message is shown in the transcript UI but not sent to the API.

***

### message

> **message**: [`UserMessage`](UserMessage.md)

***

### parentUuid

> **parentUuid**: `string` \| `null`

UUID of the parent entry in the conversation tree, or `null` for root.

#### Inherited from

[`EntryBase`](EntryBase.md).[`parentUuid`](EntryBase.md#parentuuid)

***

### permissionMode?

> `optional` **permissionMode**: [`PermissionMode`](../type-aliases/PermissionMode.md)

***

### planContent?

> `optional` **planContent**: `string`

***

### sessionId

> **sessionId**: `string`

#### Inherited from

[`EntryBase`](EntryBase.md).[`sessionId`](EntryBase.md#sessionid)

***

### slug?

> `optional` **slug**: `string`

Project slug derived from the working directory.

#### Inherited from

[`EntryBase`](EntryBase.md).[`slug`](EntryBase.md#slug)

***

### sourceToolAssistantUUID?

> `optional` **sourceToolAssistantUUID**: `string`

UUID of the assistant message whose tool_use triggered this result.

***

### sourceToolUseID?

> `optional` **sourceToolUseID**: `string`

ID of the tool_use content block this result corresponds to.

***

### teamName?

> `optional` **teamName**: `string`

#### Inherited from

[`EntryBase`](EntryBase.md).[`teamName`](EntryBase.md#teamname)

***

### thinkingMetadata?

> `optional` **thinkingMetadata**: [`ThinkingMetadata`](ThinkingMetadata.md)

***

### timestamp

> **timestamp**: `string`

ISO 8601 timestamp.

#### Inherited from

[`EntryBase`](EntryBase.md).[`timestamp`](EntryBase.md#timestamp)

***

### todos?

> `optional` **todos**: [`Todo`](Todo.md)[]

***

### toolUseResult?

> `optional` **toolUseResult**: `unknown`

Present when this user message is a tool result being delivered back.

***

### type

> **type**: `"user"`

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
