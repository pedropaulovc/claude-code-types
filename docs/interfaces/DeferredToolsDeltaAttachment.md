[**claude-code-types**](../README.md)

***

[claude-code-types](../README.md) / DeferredToolsDeltaAttachment

# Interface: DeferredToolsDeltaAttachment

## Properties

### addedLines

> **addedLines**: `string`[]

***

### addedNames

> **addedNames**: `string`[]

Tool names newly deferred (e.g. `"CronCreate"`, `"Monitor"`, `"mcp__plugin_cloudflare_cloudflare-api__execute"`).

***

### pendingMcpServers?

> `optional` **pendingMcpServers?**: `string`[]

***

### readdedNames?

> `optional` **readdedNames?**: `string`[]

***

### removedNames

> **removedNames**: `string`[]

***

### type

> **type**: `"deferred_tools_delta"`
