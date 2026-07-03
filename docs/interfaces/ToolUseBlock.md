[**claude-code-types**](../README.md)

***

[claude-code-types](../README.md) / ToolUseBlock

# Interface: ToolUseBlock

Tool invocation by the model.

For Claude Code built-in tools, `name` will be a [BuiltinToolName](../type-aliases/BuiltinToolName.md).
MCP tools use the pattern `mcp__<server>__<tool>`.

## Properties

### caller?

> `optional` **caller?**: `object`

Present in progress/streaming entries only — not part of the Anthropic API.

#### type

> **type**: `string`

***

### id

> **id**: `string`

Prefixed with `toolu_` (e.g. `"toolu_01WkEuw4UahJKiAQmN9evsjX"`).

***

### input

> **input**: `Record`\<`string`, `unknown`\>

***

### name

> **name**: `string` & `object` \| [`BuiltinToolName`](../type-aliases/BuiltinToolName.md)

Tool name (e.g. `"Bash"`, `"Read"`, `"mcp__claude_ai_Firecrawl__firecrawl_scrape"`).

***

### type

> **type**: `"tool_use"`
