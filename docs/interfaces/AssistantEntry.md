[**claude-code-types**](../README.md)

***

[claude-code-types](../README.md) / AssistantEntry

# Interface: AssistantEntry

Model response, including text, thinking, and tool calls.

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

### apiError?

> `optional` **apiError?**: `unknown`

Present when the API returned an error instead of a response.

***

### apiErrorStatus?

> `optional` **apiErrorStatus?**: `number`

HTTP status code from a failed API response (e.g. `403`).

***

### attributionAgent?

> `optional` **attributionAgent?**: `string`

Agent type that produced this response (e.g. `"general-purpose"`).

***

### attributionPlugin?

> `optional` **attributionPlugin?**: `string`

Plugin that produced this response (e.g. `"gstack-entrepreneur"`).

***

### attributionSkill?

> `optional` **attributionSkill?**: `string`

Skill that produced this response (e.g. `"gstack-entrepreneur:office-hours"`).

***

### cwd

> **cwd**: `string`

Working directory at the time this entry was created.

#### Inherited from

[`EntryBase`](EntryBase.md).[`cwd`](EntryBase.md#cwd)

***

### entrypoint?

> `optional` **entrypoint?**: `string`

How the session was started (e.g. `"cli"`).

#### Inherited from

[`EntryBase`](EntryBase.md).[`entrypoint`](EntryBase.md#entrypoint)

***

### error?

> `optional` **error?**: `string`

***

### errorDetails?

> `optional` **errorDetails?**: `string`

Full error response text from a failed API call.

***

### forkedFrom?

> `optional` **forkedFrom?**: [`ForkedFromRef`](ForkedFromRef.md)

Present when this session was forked from another.

#### Inherited from

[`EntryBase`](EntryBase.md).[`forkedFrom`](EntryBase.md#forkedfrom)

***

### gitBranch?

> `optional` **gitBranch?**: `string`

#### Inherited from

[`EntryBase`](EntryBase.md).[`gitBranch`](EntryBase.md#gitbranch)

***

### isApiErrorMessage?

> `optional` **isApiErrorMessage?**: `boolean`

***

### isSidechain

> **isSidechain**: `boolean`

Whether this entry is on a side-chain (branched conversation path).

#### Inherited from

[`EntryBase`](EntryBase.md).[`isSidechain`](EntryBase.md#issidechain)

***

### message

> **message**: [`AssistantMessage`](AssistantMessage.md)

***

### parentUuid

> **parentUuid**: `string` \| `null`

UUID of the parent entry in the conversation tree, or `null` for root.

#### Inherited from

[`EntryBase`](EntryBase.md).[`parentUuid`](EntryBase.md#parentuuid)

***

### requestId?

> `optional` **requestId?**: `string`

Anthropic API request ID for this response.

***

### sessionId

> **sessionId**: `string`

#### Inherited from

[`EntryBase`](EntryBase.md).[`sessionId`](EntryBase.md#sessionid)

***

### slug?

> `optional` **slug?**: `string`

Project slug derived from the working directory.

#### Inherited from

[`EntryBase`](EntryBase.md).[`slug`](EntryBase.md#slug)

***

### teamName?

> `optional` **teamName?**: `string`

#### Inherited from

[`EntryBase`](EntryBase.md).[`teamName`](EntryBase.md#teamname)

***

### timestamp

> **timestamp**: `string`

ISO 8601 timestamp.

#### Inherited from

[`EntryBase`](EntryBase.md).[`timestamp`](EntryBase.md#timestamp)

***

### type

> **type**: `"assistant"`

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
