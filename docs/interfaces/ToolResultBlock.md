[**claude-code-types**](../README.md)

***

[claude-code-types](../README.md) / ToolResultBlock

# Interface: ToolResultBlock

Tool result delivered in a user message.

## Properties

### content?

> `optional` **content?**: `string` \| [`ToolResultContentBlock`](../type-aliases/ToolResultContentBlock.md)[]

***

### is\_error?

> `optional` **is\_error?**: `boolean`

***

### tool\_use\_id

> **tool\_use\_id**: `string`

ID of the [ToolUseBlock](ToolUseBlock.md) this result answers (e.g. `"toolu_01LgypxQhHygemucfGy5bonV"`).

***

### type

> **type**: `"tool_result"`
