[**claude-code-types**](../README.md)

***

[claude-code-types](../globals.md) / ToolUseBlock

# Interface: ToolUseBlock

Defined in: [index.d.ts:383](https://github.com/pedropaulovc/claude-code-types/blob/032184ef9882c837f6a2f953d1b3dafa1d2734ad/index.d.ts#L383)

Tool invocation by the model.

For Claude Code built-in tools, `name` will be a [BuiltinToolName](../type-aliases/BuiltinToolName.md).
MCP tools use the pattern `mcp__<server>__<tool>`.

## Properties

### caller?

> `optional` **caller**: `object`

Defined in: [index.d.ts:390](https://github.com/pedropaulovc/claude-code-types/blob/032184ef9882c837f6a2f953d1b3dafa1d2734ad/index.d.ts#L390)

Present in progress/streaming entries only — not part of the Anthropic API.

#### type

> **type**: `string`

***

### id

> **id**: `string`

Defined in: [index.d.ts:386](https://github.com/pedropaulovc/claude-code-types/blob/032184ef9882c837f6a2f953d1b3dafa1d2734ad/index.d.ts#L386)

Prefixed with `toolu_` (e.g. `"toolu_01A09q90qw..."`).

***

### input

> **input**: `Record`\<`string`, `unknown`\>

Defined in: [index.d.ts:388](https://github.com/pedropaulovc/claude-code-types/blob/032184ef9882c837f6a2f953d1b3dafa1d2734ad/index.d.ts#L388)

***

### name

> **name**: `string` & `object` \| [`BuiltinToolName`](../type-aliases/BuiltinToolName.md)

Defined in: [index.d.ts:387](https://github.com/pedropaulovc/claude-code-types/blob/032184ef9882c837f6a2f953d1b3dafa1d2734ad/index.d.ts#L387)

***

### type

> **type**: `"tool_use"`

Defined in: [index.d.ts:384](https://github.com/pedropaulovc/claude-code-types/blob/032184ef9882c837f6a2f953d1b3dafa1d2734ad/index.d.ts#L384)
