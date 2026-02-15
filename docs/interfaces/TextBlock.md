[**claude-code-types**](../README.md)

***

[claude-code-types](../globals.md) / TextBlock

# Interface: TextBlock

Plain text content block. Used in both user and assistant messages.

## Properties

### citations?

> `optional` **citations**: [`TextCitation`](../type-aliases/TextCitation.md)[] \| `null`

Present only when the request included documents with `citations: { enabled: true }`.
`cited_text` does not count toward output or input tokens.

***

### text

> **text**: `string`

***

### type

> **type**: `"text"`
