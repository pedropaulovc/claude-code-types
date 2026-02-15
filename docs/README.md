**claude-code-types**

***

# claude-code-types

[![npm](https://img.shields.io/npm/v/claude-code-types)](https://www.npmjs.com/package/claude-code-types)

TypeScript type definitions for [Claude Code](https://docs.anthropic.com/en/docs/claude-code) chat history JSONL files.

Claude Code stores conversation history at `~/.claude/projects/<project-slug>/<session-id>.jsonl`. Each line is a JSON object. This package provides full type coverage for all entry types.

## Install

```bash
npm install claude-code-types
```

## Usage

```ts
import type { TranscriptEntry } from 'claude-code-types';
import { readFileSync } from 'fs';

const path = '~/.claude/projects/my-project/abc123.jsonl';
const entries: TranscriptEntry[] = readFileSync(path, 'utf-8')
  .split('\n')
  .filter(Boolean)
  .map(line => JSON.parse(line) as TranscriptEntry);

for (const entry of entries) {
  switch (entry.type) {
    case 'user':
      console.log(entry.message.content);
      break;
    case 'assistant':
      console.log(entry.message.model);
      break;
    case 'system':
      console.log(entry.subtype);
      break;
  }
}
```

## Entry types

| `type` | Interface | Description |
|--------|-----------|-------------|
| `user` | `UserEntry` | Human messages, tool results |
| `assistant` | `AssistantEntry` | Model responses, tool calls |
| `system` | `SystemEntry` | API errors, compaction, durations |
| `file-history-snapshot` | `FileHistorySnapshotEntry` | Undo/restore tracking |
| `pr-link` | `PrLinkEntry` | Linked pull requests |
| `progress` | `ProgressEntry` | Streaming subagent updates |
| `queue-operation` | `QueueOperationEntry` | Queued user messages |
| `saved_hook_context` | `SavedHookContextEntry` | Hook execution context |
| `summary` | `SummaryEntry` | Conversation summaries |

## Contributing

See [AGENTS.md](_media/AGENTS.md) for publishing instructions and project conventions.

## License

MIT
