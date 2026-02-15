[**claude-code-types**](../README.md)

***

[claude-code-types](../globals.md) / AssistantMessage

# Interface: AssistantMessage

Defined in: [index.d.ts:136](https://github.com/pedropaulovc/claude-code-types/blob/3d5b46cf3503065c7e2baa630d7a3a0fc77694ef/index.d.ts#L136)

The `message` payload inside an [AssistantEntry](AssistantEntry.md).

Mirrors the Anthropic Messages API response shape. Note that `stop_reason`
is `null` in streaming `message_start` events and only populated in
`message_delta`. Stored entries may retain the `null` from partial snapshots.

## Properties

### container?

> `optional` **container**: `unknown`

Defined in: [index.d.ts:153](https://github.com/pedropaulovc/claude-code-types/blob/3d5b46cf3503065c7e2baa630d7a3a0fc77694ef/index.d.ts#L153)

Present when the code execution tool (beta) was used. Contains `id` and
`expires_at` for container reuse. Typed as `unknown` because the schema
is still in beta.

***

### content

> **content**: [`AssistantContentBlock`](../type-aliases/AssistantContentBlock.md)[]

Defined in: [index.d.ts:143](https://github.com/pedropaulovc/claude-code-types/blob/3d5b46cf3503065c7e2baa630d7a3a0fc77694ef/index.d.ts#L143)

***

### context\_management?

> `optional` **context\_management**: `unknown`

Defined in: [index.d.ts:159](https://github.com/pedropaulovc/claude-code-types/blob/3d5b46cf3503065c7e2baa630d7a3a0fc77694ef/index.d.ts#L159)

Present when context editing strategies were applied (beta).
Contains `applied_edits` describing which tool uses or thinking turns
were cleared. Typed as `unknown` because the schema is still in beta.

***

### id?

> `optional` **id**: `string`

Defined in: [index.d.ts:139](https://github.com/pedropaulovc/claude-code-types/blob/3d5b46cf3503065c7e2baa630d7a3a0fc77694ef/index.d.ts#L139)

Anthropic message ID (e.g. `"msg_01XFDUDYJgAACzvnptvVoYEL"`). Format may change over time.

***

### model?

> `optional` **model**: [`Model`](../type-aliases/Model.md)

Defined in: [index.d.ts:142](https://github.com/pedropaulovc/claude-code-types/blob/3d5b46cf3503065c7e2baa630d7a3a0fc77694ef/index.d.ts#L142)

Model that generated this response. See [Model](../type-aliases/Model.md).

***

### role

> **role**: `"assistant"`

Defined in: [index.d.ts:137](https://github.com/pedropaulovc/claude-code-types/blob/3d5b46cf3503065c7e2baa630d7a3a0fc77694ef/index.d.ts#L137)

***

### stop\_reason

> **stop\_reason**: [`StopReason`](../type-aliases/StopReason.md) \| `null`

Defined in: [index.d.ts:145](https://github.com/pedropaulovc/claude-code-types/blob/3d5b46cf3503065c7e2baa630d7a3a0fc77694ef/index.d.ts#L145)

`null` during streaming until the final `message_delta` event.

***

### stop\_sequence?

> `optional` **stop\_sequence**: `string` \| `null`

Defined in: [index.d.ts:146](https://github.com/pedropaulovc/claude-code-types/blob/3d5b46cf3503065c7e2baa630d7a3a0fc77694ef/index.d.ts#L146)

***

### type?

> `optional` **type**: `"message"`

Defined in: [index.d.ts:140](https://github.com/pedropaulovc/claude-code-types/blob/3d5b46cf3503065c7e2baa630d7a3a0fc77694ef/index.d.ts#L140)

***

### usage?

> `optional` **usage**: [`Usage`](Usage.md)

Defined in: [index.d.ts:147](https://github.com/pedropaulovc/claude-code-types/blob/3d5b46cf3503065c7e2baa630d7a3a0fc77694ef/index.d.ts#L147)
