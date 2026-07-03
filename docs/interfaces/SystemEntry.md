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

### cause?

> `optional` **cause?**: `string`

***

### compactMetadata?

> `optional` **compactMetadata?**: [`CompactMetadata`](CompactMetadata.md)

Subtype `compact_boundary`.

***

### content?

> `optional` **content?**: `string`

Rendered event text (e.g. `"Conversation compacted"`, `"<local-command-stdout></local-command-stdout>"`).

***

### cwd?

> `optional` **cwd?**: `string`

Working directory at the time this entry was created (e.g. `"/home/pedro/src/agent-plugins"`).

#### Inherited from

[`EntryBase`](EntryBase.md).[`cwd`](EntryBase.md#cwd)

***

### durationMs?

> `optional` **durationMs?**: `number`

Milliseconds the turn took (subtype `turn_duration`; e.g. `122557`).

***

### entrypoint?

> `optional` **entrypoint?**: `string`

How the session was started (e.g. `"cli"`).

#### Inherited from

[`EntryBase`](EntryBase.md).[`entrypoint`](EntryBase.md#entrypoint)

***

### error?

> `optional` **error?**: `string`

Error message (subtype `api_error`).

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

### hasOutput?

> `optional` **hasOutput?**: `boolean`

***

### hookAdditionalContext?

> `optional` **hookAdditionalContext?**: `unknown`[]

Additional context strings contributed by hooks for this event.

***

### hookCount?

> `optional` **hookCount?**: `number`

Subtype `stop_hook_summary` (e.g. `1`, `2`).

***

### hookErrors?

> `optional` **hookErrors?**: `unknown`[]

***

### hookInfos?

> `optional` **hookInfos?**: `unknown`[]

***

### isMeta?

> `optional` **isMeta?**: `boolean`

***

### isSidechain?

> `optional` **isSidechain?**: `boolean`

Whether this entry is on a side-chain (branched conversation path).

#### Inherited from

[`EntryBase`](EntryBase.md).[`isSidechain`](EntryBase.md#issidechain)

***

### level?

> `optional` **level?**: `string`

Severity of the event (e.g. `"suggestion"`, `"info"`, `"error"`).

***

### logicalParentUuid?

> `optional` **logicalParentUuid?**: `string`

***

### maxRetries?

> `optional` **maxRetries?**: `number`

Maximum retry attempts configured (e.g. `10`).

***

### messageCount?

> `optional` **messageCount?**: `number`

Number of messages in the turn (subtype `turn_duration`; e.g. `39`).

***

### microcompactMetadata?

> `optional` **microcompactMetadata?**: [`MicrocompactMetadata`](MicrocompactMetadata.md)

Subtype `microcompact_boundary`.

***

### parentUuid?

> `optional` **parentUuid?**: `string` \| `null`

UUID of the parent entry in the conversation tree, or `null` for root.

#### Inherited from

[`EntryBase`](EntryBase.md).[`parentUuid`](EntryBase.md#parentuuid)

***

### pendingBackgroundAgentCount?

> `optional` **pendingBackgroundAgentCount?**: `number`

Number of background agents still running (subtype `turn_duration`; e.g. `1`).

***

### pendingWorkflowCount?

> `optional` **pendingWorkflowCount?**: `number`

Number of workflows still running (subtype `turn_duration`; e.g. `1`).

***

### preventedContinuation?

> `optional` **preventedContinuation?**: `boolean`

***

### retryAttempt?

> `optional` **retryAttempt?**: `number`

Retry attempt number for a failed API request (e.g. `1`, `2`).

***

### retryInMs?

> `optional` **retryInMs?**: `number`

Backoff before the next retry, in milliseconds (e.g. `566.72`).

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

### stopReason?

> `optional` **stopReason?**: `string`

***

### subtype

> **subtype**: [`SystemSubtype`](../type-aliases/SystemSubtype.md)

***

### teamName?

> `optional` **teamName?**: `string`

Name of the team this entry belongs to, for multi-agent sessions (e.g. `"web-ui"`).

#### Inherited from

[`EntryBase`](EntryBase.md).[`teamName`](EntryBase.md#teamname)

***

### timestamp?

> `optional` **timestamp?**: `string`

ISO 8601 timestamp (e.g. `"2026-06-04T23:51:02.971Z"`).

#### Inherited from

[`EntryBase`](EntryBase.md).[`timestamp`](EntryBase.md#timestamp)

***

### toolUseID?

> `optional` **toolUseID?**: `string`

***

### type

> **type**: `"system"`

***

### url?

> `optional` **url?**: `string`

URL for remote control bridge (subtype `bridge_status`; e.g. `"https://claude.ai/code/session_01HQnAuHE4arEJ3FpwPaLNah"`).

***

### userType?

> `optional` **userType?**: `"external"`

#### Inherited from

[`EntryBase`](EntryBase.md).[`userType`](EntryBase.md#usertype)

***

### uuid?

> `optional` **uuid?**: `string`

Unique identifier for this entry.

#### Inherited from

[`EntryBase`](EntryBase.md).[`uuid`](EntryBase.md#uuid)

***

### version?

> `optional` **version?**: `string`

Claude Code version string (e.g. `"1.0.33"`).

#### Inherited from

[`EntryBase`](EntryBase.md).[`version`](EntryBase.md#version)
