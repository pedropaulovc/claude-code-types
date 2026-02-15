# claude-code-types

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

## Publishing

This package is published to npm automatically via GitHub Actions when a version tag is pushed.

### Releasing a new version

```bash
npm version patch   # or minor / major
git push --follow-tags
```

The `publish.yml` workflow triggers on `v*` tags, runs typecheck, and publishes with provenance.

### npm authentication

The GitHub Actions workflow uses OIDC-based trusted publishing. To set this up:

1. Go to [npmjs.com](https://www.npmjs.com) > **Access Tokens** > **Granular Access Token**
2. Create a token with publish access to `claude-code-types`
3. In your GitHub repo, go to **Settings** > **Environments** > create an environment called `npm`
4. Add a secret `NPM_TOKEN` with the token value

Alternatively, configure [npm trusted publishing](https://docs.npmjs.com/generating-provenance-statements#publishing-packages-with-provenance-via-github-actions) for keyless OIDC auth.

## License

MIT
