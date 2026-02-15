[**claude-code-types**](../README.md)

***

[claude-code-types](../globals.md) / ServerToolUseBlock

# Interface: ServerToolUseBlock

Defined in: [index.d.ts:419](https://github.com/pedropaulovc/claude-code-types/blob/032184ef9882c837f6a2f953d1b3dafa1d2734ad/index.d.ts#L419)

Server-side tool invocation (executed by the Anthropic API, not locally).
Currently limited to web search.

## Properties

### id

> **id**: `string`

Defined in: [index.d.ts:422](https://github.com/pedropaulovc/claude-code-types/blob/032184ef9882c837f6a2f953d1b3dafa1d2734ad/index.d.ts#L422)

Prefixed with `srvtoolu_` (e.g. `"srvtoolu_01B3C4D5..."`).

***

### input

> **input**: `Record`\<`string`, `unknown`\>

Defined in: [index.d.ts:424](https://github.com/pedropaulovc/claude-code-types/blob/032184ef9882c837f6a2f953d1b3dafa1d2734ad/index.d.ts#L424)

***

### name

> **name**: `"web_search"`

Defined in: [index.d.ts:423](https://github.com/pedropaulovc/claude-code-types/blob/032184ef9882c837f6a2f953d1b3dafa1d2734ad/index.d.ts#L423)

***

### type

> **type**: `"server_tool_use"`

Defined in: [index.d.ts:420](https://github.com/pedropaulovc/claude-code-types/blob/032184ef9882c837f6a2f953d1b3dafa1d2734ad/index.d.ts#L420)
