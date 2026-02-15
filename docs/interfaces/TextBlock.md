[**claude-code-types**](../README.md)

***

[claude-code-types](../globals.md) / TextBlock

# Interface: TextBlock

Defined in: [index.d.ts:341](https://github.com/pedropaulovc/claude-code-types/blob/3d5b46cf3503065c7e2baa630d7a3a0fc77694ef/index.d.ts#L341)

Plain text content block. Used in both user and assistant messages.

## Properties

### citations?

> `optional` **citations**: [`TextCitation`](../type-aliases/TextCitation.md)[] \| `null`

Defined in: [index.d.ts:348](https://github.com/pedropaulovc/claude-code-types/blob/3d5b46cf3503065c7e2baa630d7a3a0fc77694ef/index.d.ts#L348)

Present only when the request included documents with `citations: { enabled: true }`.
`cited_text` does not count toward output or input tokens.

***

### text

> **text**: `string`

Defined in: [index.d.ts:343](https://github.com/pedropaulovc/claude-code-types/blob/3d5b46cf3503065c7e2baa630d7a3a0fc77694ef/index.d.ts#L343)

***

### type

> **type**: `"text"`

Defined in: [index.d.ts:342](https://github.com/pedropaulovc/claude-code-types/blob/3d5b46cf3503065c7e2baa630d7a3a0fc77694ef/index.d.ts#L342)
