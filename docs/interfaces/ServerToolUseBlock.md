[**claude-code-types**](../README.md)

***

[claude-code-types](../README.md) / ServerToolUseBlock

# Interface: ServerToolUseBlock

Server-side tool invocation (executed by the Anthropic API, not locally).
Covers web search and the advisor (stronger-reviewer) tool.

## Properties

### id

> **id**: `string`

Prefixed with `srvtoolu_` (e.g. `"srvtoolu_01B3C4D5..."`).

***

### input

> **input**: `Record`\<`string`, `unknown`\>

***

### name

> **name**: `"web_search"` \| `"advisor"`

***

### type

> **type**: `"server_tool_use"`
