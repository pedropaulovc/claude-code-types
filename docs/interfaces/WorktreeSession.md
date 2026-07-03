[**claude-code-types**](../README.md)

***

[claude-code-types](../README.md) / WorktreeSession

# Interface: WorktreeSession

Details of a managed git worktree created for a session.

## Properties

### originalBranch

> **originalBranch**: `string`

Branch that was checked out before the worktree was created (e.g. `"skill/subagent-test-backdoor-discipline"`).

***

### originalCwd

> **originalCwd**: `string`

Working directory before switching into the worktree (e.g. `"/home/pedro/src/agent-plugins"`).

***

### originalHeadCommit

> **originalHeadCommit**: `string`

HEAD commit SHA at the time the worktree was created (e.g. `"dc5675c941a15a501cbc4f2baab95b5f59b2cc33"`).

***

### sessionId

> **sessionId**: `string`

***

### worktreeBranch

> **worktreeBranch**: `string`

Branch checked out in the worktree (e.g. `"worktree-linked-sniffing-star"`).

***

### worktreeName

> **worktreeName**: `string`

Generated worktree name (e.g. `"linked-sniffing-star"`).

***

### worktreePath

> **worktreePath**: `string`

Absolute path of the worktree (e.g. `"/home/pedro/src/agent-plugins/.claude/worktrees/linked-sniffing-star"`).
