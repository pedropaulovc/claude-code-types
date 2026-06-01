[**claude-code-types**](../README.md)

***

[claude-code-types](../README.md) / ResultEntry

# Interface: ResultEntry

Cached result of a workflow/agent step, keyed to the matching
[StartedEntry](StartedEntry.md) by `key`. The `result` payload is step-specific — for
agents invoked with a schema it is the validated structured output.

## Properties

### agentId

> **agentId**: `string`

***

### key

> **key**: `string`

Content-hash cache key matching the corresponding [StartedEntry](StartedEntry.md).

***

### result

> **result**: `unknown`

Step-specific return value (shape depends on the agent/step).

***

### type

> **type**: `"result"`
