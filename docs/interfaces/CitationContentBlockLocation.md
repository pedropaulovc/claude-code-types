[**claude-code-types**](../README.md)

***

[claude-code-types](../globals.md) / CitationContentBlockLocation

# Interface: CitationContentBlockLocation

Defined in: [index.d.ts:519](https://github.com/pedropaulovc/claude-code-types/blob/3d5b46cf3503065c7e2baa630d7a3a0fc77694ef/index.d.ts#L519)

Citation from a custom content document.
Block indices are 0-based; `end_block_index` is exclusive.

## Properties

### cited\_text

> **cited\_text**: `string`

Defined in: [index.d.ts:521](https://github.com/pedropaulovc/claude-code-types/blob/3d5b46cf3503065c7e2baa630d7a3a0fc77694ef/index.d.ts#L521)

***

### document\_index

> **document\_index**: `number`

Defined in: [index.d.ts:522](https://github.com/pedropaulovc/claude-code-types/blob/3d5b46cf3503065c7e2baa630d7a3a0fc77694ef/index.d.ts#L522)

***

### document\_title

> **document\_title**: `string` \| `null`

Defined in: [index.d.ts:523](https://github.com/pedropaulovc/claude-code-types/blob/3d5b46cf3503065c7e2baa630d7a3a0fc77694ef/index.d.ts#L523)

***

### end\_block\_index

> **end\_block\_index**: `number`

Defined in: [index.d.ts:526](https://github.com/pedropaulovc/claude-code-types/blob/3d5b46cf3503065c7e2baa630d7a3a0fc77694ef/index.d.ts#L526)

Exclusive upper bound.

***

### file\_id

> **file\_id**: `string` \| `null`

Defined in: [index.d.ts:528](https://github.com/pedropaulovc/claude-code-types/blob/3d5b46cf3503065c7e2baa630d7a3a0fc77694ef/index.d.ts#L528)

Non-null only when the document was provided via the Files API.

***

### start\_block\_index

> **start\_block\_index**: `number`

Defined in: [index.d.ts:524](https://github.com/pedropaulovc/claude-code-types/blob/3d5b46cf3503065c7e2baa630d7a3a0fc77694ef/index.d.ts#L524)

***

### type

> **type**: `"content_block_location"`

Defined in: [index.d.ts:520](https://github.com/pedropaulovc/claude-code-types/blob/3d5b46cf3503065c7e2baa630d7a3a0fc77694ef/index.d.ts#L520)
