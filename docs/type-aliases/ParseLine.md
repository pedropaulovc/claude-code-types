[**claude-code-types**](../README.md)

***

[claude-code-types](../globals.md) / ParseLine

# Type Alias: ParseLine()

> **ParseLine** = (`line`) => [`TranscriptEntry`](TranscriptEntry.md) \| `null`

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
