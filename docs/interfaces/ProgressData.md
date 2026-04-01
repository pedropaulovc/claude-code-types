[**claude-code-types**](../README.md)

***

[claude-code-types](../README.md) / ProgressData

# Interface: ProgressData

Payload inside a [ProgressEntry](ProgressEntry.md).

## Properties

### message

> **message**: `object`

#### message

> **message**: [`UserMessage`](UserMessage.md) \| [`AssistantMessage`](AssistantMessage.md)

#### requestId?

> `optional` **requestId**: `string`

Anthropic API request ID (present on assistant progress messages).

#### timestamp?

> `optional` **timestamp**: `string`

#### toolUseResult?

> `optional` **toolUseResult**: `unknown`

Tool result payload (present on user progress messages).

#### type

> **type**: `"user"` \| `"assistant"`

#### uuid?

> `optional` **uuid**: `string`
