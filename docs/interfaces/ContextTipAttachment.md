[**claude-code-types**](../README.md)

***

[claude-code-types](../README.md) / ContextTipAttachment

# Interface: ContextTipAttachment

A contextual feature tip surfaced to the user based on their recent actions.

## Properties

### tip

> **tip**: `object`

#### action

> **action**: `string`

Suggested command or action (e.g. `"/diff"`, `"/loop 2m check CI status"`).

#### featureId

> **featureId**: `string`

Identifier for the feature being suggested (e.g. `"diff-request"`, `"manual-polling"`).

#### tip

> **tip**: `string`

The tip text shown to the user.

***

### type

> **type**: `"context_tip"`
