[**claude-code-types**](../README.md)

***

[claude-code-types](../globals.md) / ThinkingBlock

# Interface: ThinkingBlock

Defined in: [index.d.ts:361](https://github.com/pedropaulovc/claude-code-types/blob/032184ef9882c837f6a2f953d1b3dafa1d2734ad/index.d.ts#L361)

Extended thinking content block.

The `signature` field contains a cryptographic signature used to verify
authenticity. **Modifying a thinking block will cause the API to reject it.**

During tool use cycles, thinking blocks must be returned with the
corresponding tool results. They can only be dropped after the full
tool use cycle completes.

## Properties

### signature

> **signature**: `string`

Defined in: [index.d.ts:365](https://github.com/pedropaulovc/claude-code-types/blob/032184ef9882c837f6a2f953d1b3dafa1d2734ad/index.d.ts#L365)

Cryptographic signature — do not modify.

***

### thinking

> **thinking**: `string`

Defined in: [index.d.ts:363](https://github.com/pedropaulovc/claude-code-types/blob/032184ef9882c837f6a2f953d1b3dafa1d2734ad/index.d.ts#L363)

***

### type

> **type**: `"thinking"`

Defined in: [index.d.ts:362](https://github.com/pedropaulovc/claude-code-types/blob/032184ef9882c837f6a2f953d1b3dafa1d2734ad/index.d.ts#L362)
