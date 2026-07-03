[**claude-code-types**](../README.md)

***

[claude-code-types](../README.md) / AdvisorToolResultBlock

# Interface: AdvisorToolResultBlock

Result from a server-side advisor tool invocation.

## Properties

### content

> **content**: `Record`\<`string`, `unknown`\> \| [`AdvisorToolResultError`](AdvisorToolResultError.md)

***

### tool\_use\_id

> **tool\_use\_id**: `string`

ID of the [ServerToolUseBlock](ServerToolUseBlock.md) (`srvtoolu_…`) this result corresponds to.

***

### type

> **type**: `"advisor_tool_result"`
