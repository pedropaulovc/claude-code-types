[**claude-code-types**](../README.md)

***

[claude-code-types](../README.md) / ThinkingBlock

# Interface: ThinkingBlock

Extended thinking content block.

The `signature` field contains a cryptographic signature used to verify
authenticity. **Modifying a thinking block will cause the API to reject it.**

During tool use cycles, thinking blocks must be returned with the
corresponding tool results. They can only be dropped after the full
tool use cycle completes.

## Properties

### signature

> **signature**: `string`

Cryptographic signature — do not modify.

***

### thinking

> **thinking**: `string`

***

### type

> **type**: `"thinking"`
