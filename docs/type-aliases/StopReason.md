[**claude-code-types**](../README.md)

***

[claude-code-types](../globals.md) / StopReason

# Type Alias: StopReason

> **StopReason** = `"end_turn"` \| `"max_tokens"` \| `"stop_sequence"` \| `"tool_use"` \| `"pause_turn"` \| `"refusal"`

Defined in: [index.d.ts:673](https://github.com/pedropaulovc/claude-code-types/blob/3d5b46cf3503065c7e2baa630d7a3a0fc77694ef/index.d.ts#L673)

Reason the model stopped generating.

- `end_turn` — Natural stopping point. May have empty `content` array.
- `max_tokens` — Hit `max_tokens` limit or the model's maximum.
- `stop_sequence` — Generated one of the provided `stop_sequences`.
- `tool_use` — Model invoked one or more tools.
- `pause_turn` — Server-side sampling loop hit its iteration limit while executing server tools; pass the response back as-is to continue.
- `refusal` — Streaming classifiers intervened for potential policy violation.
