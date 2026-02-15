[**claude-code-types**](../README.md)

***

[claude-code-types](../globals.md) / Usage

# Interface: Usage

Defined in: [index.d.ts:588](https://github.com/pedropaulovc/claude-code-types/blob/3d5b46cf3503065c7e2baa630d7a3a0fc77694ef/index.d.ts#L588)

Token usage for a single API response.

**Total billable input tokens** = `input_tokens + cache_creation_input_tokens + cache_read_input_tokens`.

**Caveat:** `cache_read_input_tokens` can be inflated when server tools
(e.g. web search) are used, because the API accumulates cache reads from
multiple internal calls.

## Properties

### cache\_creation?

> `optional` **cache\_creation**: [`CacheCreation`](CacheCreation.md) \| `null`

Defined in: [index.d.ts:596](https://github.com/pedropaulovc/claude-code-types/blob/3d5b46cf3503065c7e2baa630d7a3a0fc77694ef/index.d.ts#L596)

Breakdown of cache creation by TTL.

***

### cache\_creation\_input\_tokens?

> `optional` **cache\_creation\_input\_tokens**: `number` \| `null`

Defined in: [index.d.ts:592](https://github.com/pedropaulovc/claude-code-types/blob/3d5b46cf3503065c7e2baa630d7a3a0fc77694ef/index.d.ts#L592)

Tokens written to cache. `0` when prompt caching is not configured.

***

### cache\_read\_input\_tokens?

> `optional` **cache\_read\_input\_tokens**: `number` \| `null`

Defined in: [index.d.ts:594](https://github.com/pedropaulovc/claude-code-types/blob/3d5b46cf3503065c7e2baa630d7a3a0fc77694ef/index.d.ts#L594)

Tokens read from cache. `0` when prompt caching is not configured.

***

### inference\_geo?

> `optional` **inference\_geo**: `string` \| `null`

Defined in: [index.d.ts:601](https://github.com/pedropaulovc/claude-code-types/blob/3d5b46cf3503065c7e2baa630d7a3a0fc77694ef/index.d.ts#L601)

Geographic region where inference ran (e.g. `"us-west-2"`).

***

### input\_tokens

> **input\_tokens**: `number`

Defined in: [index.d.ts:589](https://github.com/pedropaulovc/claude-code-types/blob/3d5b46cf3503065c7e2baa630d7a3a0fc77694ef/index.d.ts#L589)

***

### output\_tokens

> **output\_tokens**: `number`

Defined in: [index.d.ts:590](https://github.com/pedropaulovc/claude-code-types/blob/3d5b46cf3503065c7e2baa630d7a3a0fc77694ef/index.d.ts#L590)

***

### server\_tool\_use?

> `optional` **server\_tool\_use**: [`ServerToolUsage`](ServerToolUsage.md) \| `null`

Defined in: [index.d.ts:598](https://github.com/pedropaulovc/claude-code-types/blob/3d5b46cf3503065c7e2baa630d7a3a0fc77694ef/index.d.ts#L598)

Present only when web search was used.

***

### service\_tier?

> `optional` **service\_tier**: `"priority"` \| `"standard"` \| `"batch"` \| `null`

Defined in: [index.d.ts:599](https://github.com/pedropaulovc/claude-code-types/blob/3d5b46cf3503065c7e2baa630d7a3a0fc77694ef/index.d.ts#L599)
