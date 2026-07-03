[**claude-code-types**](../README.md)

***

[claude-code-types](../README.md) / McpInstructionsDeltaAttachment

# Interface: McpInstructionsDeltaAttachment

Notes MCP server instruction blocks added to or removed from context.

## Properties

### addedBlocks

> **addedBlocks**: `string`[]

The instruction text blocks added (parallel to `addedNames`).

***

### addedNames

> **addedNames**: `string`[]

MCP server display names whose instructions were added (e.g. `"claude.ai Firecrawl"`, `"plugin:cloudflare:cloudflare-bindings"`).

***

### removedNames

> **removedNames**: `string`[]

***

### type

> **type**: `"mcp_instructions_delta"`
