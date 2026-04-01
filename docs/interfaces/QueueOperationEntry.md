[**claude-code-types**](../README.md)

***

[claude-code-types](../README.md) / QueueOperationEntry

# Interface: QueueOperationEntry

Messages queued by the user while the agent is processing a turn.

## Properties

### content?

> `optional` **content**: `string`

Queue message content. Not present on `remove` operations.

***

### operation

> **operation**: `"remove"` \| `"dequeue"` \| `"enqueue"` \| `"popAll"`

***

### sessionId

> **sessionId**: `string`

***

### timestamp

> **timestamp**: `string`

***

### type

> **type**: `"queue-operation"`
