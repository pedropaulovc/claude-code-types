[**claude-code-types**](../README.md)

***

[claude-code-types](../README.md) / CitationSearchResultLocation

# Interface: CitationSearchResultLocation

Citation from a `search_result` content block (RAG applications).
Block indices are 0-based; `end_block_index` is exclusive.

## Properties

### cited\_text

> **cited\_text**: `string`

***

### end\_block\_index

> **end\_block\_index**: `number`

Exclusive upper bound.

***

### search\_result\_index

> **search\_result\_index**: `number`

***

### source

> **source**: `string`

***

### start\_block\_index

> **start\_block\_index**: `number`

***

### title

> **title**: `string` \| `null`

***

### type

> **type**: `"search_result_location"`
