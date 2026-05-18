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

#### timestamp?

> `optional` **timestamp**: `string`

#### toolUseResult?

> `optional` **toolUseResult**: `unknown`

#### type

> **type**: `"user"` \| `"assistant"`

#### uuid?

> `optional` **uuid**: `string`
