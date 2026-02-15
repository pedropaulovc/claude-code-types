[**claude-code-types**](../README.md)

***

[claude-code-types](../README.md) / AssistantMessage

# Interface: AssistantMessage

The `message` payload inside an [AssistantEntry](AssistantEntry.md).

Mirrors the Anthropic Messages API response shape. Note that `stop_reason`
is `null` in streaming `message_start` events and only populated in
`message_delta`. Stored entries may retain the `null` from partial snapshots.

## Properties

### container?

> `optional` **container**: `unknown`

Present when the code execution tool (beta) was used. Contains `id` and
`expires_at` for container reuse. Typed as `unknown` because the schema
is still in beta.

***

### content

> **content**: [`AssistantContentBlock`](../type-aliases/AssistantContentBlock.md)[]

***

### context\_management?

> `optional` **context\_management**: `unknown`

Present when context editing strategies were applied (beta).
Contains `applied_edits` describing which tool uses or thinking turns
were cleared. Typed as `unknown` because the schema is still in beta.

***

### id?

> `optional` **id**: `string`

Anthropic message ID (e.g. `"msg_01XFDUDYJgAACzvnptvVoYEL"`). Format may change over time.

***

### model?

> `optional` **model**: [`Model`](../type-aliases/Model.md)

Model that generated this response. See [Model](../type-aliases/Model.md).

***

### role

> **role**: `"assistant"`

***

### stop\_reason

> **stop\_reason**: [`StopReason`](../type-aliases/StopReason.md) \| `null`

`null` during streaming until the final `message_delta` event.

***

### stop\_sequence?

> `optional` **stop\_sequence**: `string` \| `null`

***

### type?

> `optional` **type**: `"message"`

***

### usage?

> `optional` **usage**: [`Usage`](Usage.md)
