[**claude-code-types**](../README.md)

***

[claude-code-types](../globals.md) / CitationCharLocation

# Interface: CitationCharLocation

Defined in: [index.d.ts:487](https://github.com/pedropaulovc/claude-code-types/blob/3d5b46cf3503065c7e2baa630d7a3a0fc77694ef/index.d.ts#L487)

Citation from a plain text document.
Character indices are 0-based; `end_char_index` is exclusive.

## Properties

### cited\_text

> **cited\_text**: `string`

Defined in: [index.d.ts:489](https://github.com/pedropaulovc/claude-code-types/blob/3d5b46cf3503065c7e2baa630d7a3a0fc77694ef/index.d.ts#L489)

***

### document\_index

> **document\_index**: `number`

Defined in: [index.d.ts:490](https://github.com/pedropaulovc/claude-code-types/blob/3d5b46cf3503065c7e2baa630d7a3a0fc77694ef/index.d.ts#L490)

***

### document\_title

> **document\_title**: `string` \| `null`

Defined in: [index.d.ts:491](https://github.com/pedropaulovc/claude-code-types/blob/3d5b46cf3503065c7e2baa630d7a3a0fc77694ef/index.d.ts#L491)

***

### end\_char\_index

> **end\_char\_index**: `number`

Defined in: [index.d.ts:494](https://github.com/pedropaulovc/claude-code-types/blob/3d5b46cf3503065c7e2baa630d7a3a0fc77694ef/index.d.ts#L494)

Exclusive upper bound.

***

### file\_id

> **file\_id**: `string` \| `null`

Defined in: [index.d.ts:496](https://github.com/pedropaulovc/claude-code-types/blob/3d5b46cf3503065c7e2baa630d7a3a0fc77694ef/index.d.ts#L496)

Non-null only when the document was provided via the Files API.

***

### start\_char\_index

> **start\_char\_index**: `number`

Defined in: [index.d.ts:492](https://github.com/pedropaulovc/claude-code-types/blob/3d5b46cf3503065c7e2baa630d7a3a0fc77694ef/index.d.ts#L492)

***

### type

> **type**: `"char_location"`

Defined in: [index.d.ts:488](https://github.com/pedropaulovc/claude-code-types/blob/3d5b46cf3503065c7e2baa630d7a3a0fc77694ef/index.d.ts#L488)
