[**claude-code-types**](../README.md)

***

[claude-code-types](../globals.md) / Usage

# Interface: Usage

Token usage for a single API response.

**Total billable input tokens** = `input_tokens + cache_creation_input_tokens + cache_read_input_tokens`.

**Caveat:** `cache_read_input_tokens` can be inflated when server tools
(e.g. web search) are used, because the API accumulates cache reads from
multiple internal calls.

## Properties

### cache\_creation?

> `optional` **cache\_creation**: [`CacheCreation`](CacheCreation.md) \| `null`

Breakdown of cache creation by TTL.

***

### cache\_creation\_input\_tokens?

> `optional` **cache\_creation\_input\_tokens**: `number` \| `null`

Tokens written to cache. `0` when prompt caching is not configured.

***

### cache\_read\_input\_tokens?

> `optional` **cache\_read\_input\_tokens**: `number` \| `null`

Tokens read from cache. `0` when prompt caching is not configured.

***

### inference\_geo?

> `optional` **inference\_geo**: `string` \| `null`

Geographic region where inference ran (e.g. `"us-west-2"`).

***

### input\_tokens

> **input\_tokens**: `number`

***

### output\_tokens

> **output\_tokens**: `number`

***

### server\_tool\_use?

> `optional` **server\_tool\_use**: [`ServerToolUsage`](ServerToolUsage.md) \| `null`

Present only when web search was used.

***

### service\_tier?

> `optional` **service\_tier**: `"priority"` \| `"standard"` \| `"batch"` \| `null`
