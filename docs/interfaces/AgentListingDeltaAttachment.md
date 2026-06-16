[**claude-code-types**](../README.md)

***

[claude-code-types](../README.md) / AgentListingDeltaAttachment

# Interface: AgentListingDeltaAttachment

Notes changes to the available subagent type listing injected into context.
Parallel to the `deferred_tools_delta` / `mcp_instructions_delta` deltas.

## Properties

### addedLines

> **addedLines**: `string`[]

The listing text blocks added (parallel to `addedTypes`).

***

### addedTypes

> **addedTypes**: `string`[]

Subagent type names added to the listing (e.g. `"claude"`, `"Explore"`).

***

### isInitial?

> `optional` **isInitial?**: `boolean`

`true` for the initial full listing, absent/`false` for incremental deltas.

***

### removedTypes

> **removedTypes**: `string`[]

***

### showConcurrencyNote?

> `optional` **showConcurrencyNote?**: `boolean`

Whether to show the note about running agents concurrently.

***

### type

> **type**: `"agent_listing_delta"`
