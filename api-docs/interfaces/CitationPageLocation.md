[**claude-code-types**](../README.md)

***

[claude-code-types](../globals.md) / CitationPageLocation

# Interface: CitationPageLocation

Defined in: [index.d.ts:503](https://github.com/pedropaulovc/claude-code-types/blob/032184ef9882c837f6a2f953d1b3dafa1d2734ad/index.d.ts#L503)

Citation from a PDF document.
Page numbers are 1-based; `end_page_number` is exclusive.

## Properties

### cited\_text

> **cited\_text**: `string`

Defined in: [index.d.ts:505](https://github.com/pedropaulovc/claude-code-types/blob/032184ef9882c837f6a2f953d1b3dafa1d2734ad/index.d.ts#L505)

***

### document\_index

> **document\_index**: `number`

Defined in: [index.d.ts:506](https://github.com/pedropaulovc/claude-code-types/blob/032184ef9882c837f6a2f953d1b3dafa1d2734ad/index.d.ts#L506)

***

### document\_title

> **document\_title**: `string` \| `null`

Defined in: [index.d.ts:507](https://github.com/pedropaulovc/claude-code-types/blob/032184ef9882c837f6a2f953d1b3dafa1d2734ad/index.d.ts#L507)

***

### end\_page\_number

> **end\_page\_number**: `number`

Defined in: [index.d.ts:510](https://github.com/pedropaulovc/claude-code-types/blob/032184ef9882c837f6a2f953d1b3dafa1d2734ad/index.d.ts#L510)

Exclusive upper bound.

***

### file\_id

> **file\_id**: `string` \| `null`

Defined in: [index.d.ts:512](https://github.com/pedropaulovc/claude-code-types/blob/032184ef9882c837f6a2f953d1b3dafa1d2734ad/index.d.ts#L512)

Non-null only when the document was provided via the Files API.

***

### start\_page\_number

> **start\_page\_number**: `number`

Defined in: [index.d.ts:508](https://github.com/pedropaulovc/claude-code-types/blob/032184ef9882c837f6a2f953d1b3dafa1d2734ad/index.d.ts#L508)

***

### type

> **type**: `"page_location"`

Defined in: [index.d.ts:504](https://github.com/pedropaulovc/claude-code-types/blob/032184ef9882c837f6a2f953d1b3dafa1d2734ad/index.d.ts#L504)
