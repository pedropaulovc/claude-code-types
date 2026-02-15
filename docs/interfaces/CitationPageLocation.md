[**claude-code-types**](../README.md)

***

[claude-code-types](../globals.md) / CitationPageLocation

# Interface: CitationPageLocation

Citation from a PDF document.
Page numbers are 1-based; `end_page_number` is exclusive.

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

### end\_page\_number

> **end\_page\_number**: `number`

Exclusive upper bound.

***

### file\_id

> **file\_id**: `string` \| `null`

Non-null only when the document was provided via the Files API.

***

### start\_page\_number

> **start\_page\_number**: `number`

***

### type

> **type**: `"page_location"`
