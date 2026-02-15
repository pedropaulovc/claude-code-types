[**claude-code-types**](../README.md)

***

[claude-code-types](../globals.md) / CitationContentBlockLocation

# Interface: CitationContentBlockLocation

Citation from a custom content document.
Block indices are 0-based; `end_block_index` is exclusive.

## Properties

### cited\_text

> **cited\_text**: `string`

***

### document\_index

> **document\_index**: `number`

***

### document\_title

> **document\_title**: `string` \| `null`

***

### end\_block\_index

> **end\_block\_index**: `number`

Exclusive upper bound.

***

### file\_id

> **file\_id**: `string` \| `null`

Non-null only when the document was provided via the Files API.

***

### start\_block\_index

> **start\_block\_index**: `number`

***

### type

> **type**: `"content_block_location"`
