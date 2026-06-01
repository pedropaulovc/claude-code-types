[**claude-code-types**](../README.md)

***

[claude-code-types](../README.md) / StartedEntry

# Interface: StartedEntry

Marks the start of a cached workflow/agent step. Paired with a
[ResultEntry](ResultEntry.md) sharing the same `key`, this forms the journal the
Workflow tool uses to resume runs without re-executing completed steps.

## Properties

### agentId

> **agentId**: `string`

Identifier of the agent that ran the step (e.g. `"ac3124bd2ff9eed73"`).

***

### key

> **key**: `string`

Content-hash cache key (e.g. `"v2:<sha256>"`) identifying the step.

***

### type

> **type**: `"started"`
