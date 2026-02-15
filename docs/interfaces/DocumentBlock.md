[**claude-code-types**](../README.md)

***

[claude-code-types](../globals.md) / DocumentBlock

# Interface: DocumentBlock

Document content block in a user message (PDF, plain text, or URL).

## Properties

### context?

> `optional` **context**: `string` \| `null`

***

### source

> **source**: [`Base64DocumentSource`](Base64DocumentSource.md) \| [`PlainTextSource`](PlainTextSource.md) \| [`UrlDocumentSource`](UrlDocumentSource.md)

***

### title?

> `optional` **title**: `string` \| `null`

***

### type

> **type**: `"document"`
