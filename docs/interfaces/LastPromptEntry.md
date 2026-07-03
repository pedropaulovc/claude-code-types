[**claude-code-types**](../README.md)

***

[claude-code-types](../README.md) / LastPromptEntry

# Interface: LastPromptEntry

Records the last prompt text for session resumption.

## Properties

### lastPrompt

> **lastPrompt**: `string`

The most recent user prompt text (e.g. `"continue"`, `"pr"`).

***

### leafUuid?

> `optional` **leafUuid?**: `string`

UUID of the leaf message this prompt corresponds to.

***

### sessionId

> **sessionId**: `string`

***

### type

> **type**: `"last-prompt"`
