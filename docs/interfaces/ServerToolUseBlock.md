[**claude-code-types**](../README.md)

***

[claude-code-types](../globals.md) / ServerToolUseBlock

# Interface: ServerToolUseBlock

Server-side tool invocation (executed by the Anthropic API, not locally).
Currently limited to web search.

## Properties

### id

> **id**: `string`

Prefixed with `srvtoolu_` (e.g. `"srvtoolu_01B3C4D5..."`).

***

### input

> **input**: `Record`\<`string`, `unknown`\>

***

### name

> **name**: `"web_search"`

***

### type

> **type**: `"server_tool_use"`
