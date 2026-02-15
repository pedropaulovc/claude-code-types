[**claude-code-types**](../README.md)

***

[claude-code-types](../README.md) / CitationCharLocation

# Interface: CitationCharLocation

Citation from a plain text document.
Character indices are 0-based; `end_char_index` is exclusive.

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

### end\_char\_index

> **end\_char\_index**: `number`

Exclusive upper bound.

***

### file\_id

> **file\_id**: `string` \| `null`

Non-null only when the document was provided via the Files API.

***

### start\_char\_index

> **start\_char\_index**: `number`

***

### type

> **type**: `"char_location"`
