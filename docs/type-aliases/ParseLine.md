[**claude-code-types**](../README.md)

***

[claude-code-types](../globals.md) / ParseLine

# Type Alias: ParseLine()

> **ParseLine** = (`line`) => [`TranscriptEntry`](TranscriptEntry.md) \| `null`

Defined in: [index.d.ts:737](https://github.com/pedropaulovc/claude-code-types/blob/032184ef9882c837f6a2f953d1b3dafa1d2734ad/index.d.ts#L737)

Signature for a function that parses a single JSONL line into a typed entry.

## Parameters

### line

`string`

## Returns

[`TranscriptEntry`](TranscriptEntry.md) \| `null`

## Example

```ts
const parseLine: ParseLine = (line) => {
  try { return JSON.parse(line) as TranscriptEntry; }
  catch { return null; }
};
```
