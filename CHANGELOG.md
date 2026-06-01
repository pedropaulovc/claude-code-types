# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/),
and this project adheres to [Semantic Versioning](https://semver.org/).

## [Unreleased]

## [1.1.0] - 2026-05-31

### Added

- `ModeEntry` entry type (`type: 'mode'`) for interaction-mode changes
- `AgentSettingEntry` entry type (`type: 'agent-setting'`) recording the active agent definition
- `BridgeSessionEntry` entry type (`type: 'bridge-session'`) linking a session to a remote-control bridge
- `WorktreeStateEntry` entry type (`type: 'worktree-state'`) with `WorktreeSession` for managed git worktrees
- `mcp_instructions_delta`, `invoked_skills`, `dynamic_skill`, `agent_mention`, `workflow_keyword_request`, `plan_file_reference` attachment subtypes (with `McpInstructionsDeltaAttachment`, `InvokedSkillsAttachment`, `InvokedSkill`, `DynamicSkillAttachment`, `AgentMentionAttachment`, `WorkflowKeywordRequestAttachment`, `PlanFileReferenceAttachment` types)
- `SendUserFile` to `BuiltinToolName`
- `claude-opus-4-8` to `Model` union

### Changed

- `tsconfig.json` migrated from deprecated `moduleResolution: "node"` to `"bundler"` (TypeScript 6 compatibility)

## [1.0.0] - 2026-05-18

### Added

- `AttachmentEntry` entry type (`type: 'attachment'`) with 21 attachment subtypes: `hook_success`, `hook_additional_context`, `hook_blocking_error`, `task_reminder`, `deferred_tools_delta`, `queued_command`, `skill_listing`, `diagnostics`, `edited_text_file`, `command_permissions`, `nested_memory`, `plan_mode`, `plan_mode_exit`, `plan_mode_reentry`, `ultrathink_effort`, `goal_status`, `file`, `directory`, `date_change`, `companion_intro`, `compact_file_reference`
- `AiTitleEntry` entry type (`type: 'ai-title'`) for AI-generated session titles
- `PermissionModeEntry` entry type (`type: 'permission-mode'`) for permission mode changes
- `away_summary` and `scheduled_task_fire` system subtypes
- `Monitor`, `PushNotification`, `ScheduleWakeup`, `ShareOnboardingGuide` to `BuiltinToolName`
- `claude-opus-4-7` to `Model` union
- `forkedFrom` optional field on `EntryBase`
- `attributionAgent`, `attributionSkill`, `attributionPlugin`, `apiErrorStatus`, `errorDetails` optional fields on `AssistantEntry`
- `diagnostics` optional field on `AssistantMessage` (prompt cache miss reasons)
- `leafUuid` optional field on `LastPromptEntry`
- `postTokens`, `durationMs`, `preCompactDiscoveredTools`, `preservedSegment`, `preservedMessages` optional fields on `CompactMetadata`
- `MessageDiagnostics`, `CacheMissReason`, `CacheMissReasonType`, `ForkedFromRef` helper types
- `DiagnosticFile`, `DiagnosticItem`, `DiagnosticPosition` types for LSP diagnostics in attachments

### Fixed

- Smoke test now skips NUL-padded / corrupted JSONL lines

## [0.6.0] - 2026-04-01

### Added

- `AgentNameEntry` entry type (`type: 'agent-name'`) for recording agent names in sessions
- `CustomTitleEntry` entry type (`type: 'custom-title'`) for user-assigned session titles
- `ToolReferenceBlock` content block type (`type: 'tool_reference'`) for tool references in tool results
- `ToolResultContentBlock` union type for blocks inside `ToolResultBlock.content` arrays (includes `TextBlock`, `ImageBlock`, `ToolReferenceBlock`)
- `LSP` and `RemoteTrigger` to `BuiltinToolName` union
- `popAll` and `remove` to `QueueOperationEntry.operation` union
- `entrypoint` optional field on `EntryBase`
- `agentName` optional field on `EntryBase`
- `origin` optional field on `UserEntry`
- `stop_details` optional field on `AssistantMessage`
- `messageCount` optional field on `SystemEntry` (for `turn_duration` subtype)
- `requestId` and `toolUseResult` optional fields on `ProgressData.message`

### Changed

- `QueueOperationEntry.content` is now optional (not present on `remove` operations)
- `ToolResultBlock.content` array type widened from `TextBlock[]` to `ToolResultContentBlock[]`

## [0.5.0] - 2026-03-15

### Added

- `LastPromptEntry` entry type (`type: 'last-prompt'`) for persisted prompt session resumption
- `bridge_status` system subtype with `url` field on `SystemEntry`
- `Agent`, `ToolSearch`, `CronCreate`, `CronDelete`, `CronList`, `EnterWorktree`, `ExitWorktree` to `BuiltinToolName`
- `promptId` optional field on `UserEntry`
- `speed` and `iterations` optional fields on `Usage`
- `claude-sonnet-4-6` to `Model` union
- `auto` to `PermissionMode` union
- Docs generation step to release checklist in AGENTS.md

## [0.4.3] - 2026-02-15

### Fixed

- Auto-tag workflow: use GitHub API (`gh api`) to create tags instead of `git push` to avoid GITHUB_TOKEN permission issues

## [0.4.2] - 2026-02-15

### Added

- Anthropic trademark notice and non-association disclaimer in README

## [0.4.1] - 2026-02-15

### Fixed

- Auto-tag workflow now triggers publish via `workflow_dispatch` (`GITHUB_TOKEN` tag pushes don't trigger other workflows)
- Added `actions: write` permission to auto-tag workflow

## [0.4.0] - 2026-02-15

### Added

- `agentId` optional field on `EntryBase` for subagent / Task tool entries
- Generated API docs via TypeDoc (`docs/` directory)
- API docs badge in README
- CI workflow: typecheck + verify docs freshness on PRs and main pushes
- Auto-tag workflow: creates `v*` tag from `package.json` version on push to `main`
- Semantic Versioning 2.0.0 reference in README and AGENTS.md

### Changed

- Default branch renamed from `master` to `main`
- Renamed `smoke.test.ts` to `smoke.local.test.ts`
- Switched to `ubuntu-slim` runners in CI workflows
- Simplified publish workflow: removed separate test job, moved typecheck into release job
- Simplified publish steps: merge PR to `main` → auto-tag → publish (no manual `npm version` + `--follow-tags`)

## [0.3.0] - 2026-02-15

### Added

- `TeamCreate` and `TeamDelete` to `BuiltinToolName` (agent teams tools)

## [0.2.0] - 2026-02-15

### Added

- Smoke test validating types against all `~/.claude/projects/` JSONL files
  (430K+ lines, 3841 files, 0 errors)
- CHANGELOG.md following Keep a Changelog format
- AGENTS.md with publishing instructions
- CLAUDE.md
- GitHub Release creation on version tags (immutable releases)

### Changed

- Rewritten CI workflow: test → release (from CHANGELOG) → publish with provenance
- Moved publishing docs from README to AGENTS.md

## [0.1.1] - 2026-02-15

### Added

- JSDoc on every exported interface and type with descriptions and caveats
- `CitationSearchResultLocation` type for RAG `search_result_location` citations
- Caveats from Anthropic API docs: `stop_reason` null during streaming, thinking
  block signature verification, `cache_read_input_tokens` inflation with server
  tools, progress entry size warnings, and more

### Changed

- Updated author field

## [0.1.0] - 2026-02-15

### Added

- Initial release with full type coverage for Claude Code JSONL history format
- All 9 entry types: user, assistant, system, file-history-snapshot, pr-link,
  progress, queue-operation, saved_hook_context, summary
- Content block types: text, thinking, redacted_thinking, tool_use, tool_result,
  image, document, server_tool_use, web_search_tool_result
- Citation types: char_location, page_location, content_block_location,
  web_search_result_location
- Media source types for images (base64, URL) and documents (base64, text, URL)
- Usage and metadata types
- Model, StopReason, PermissionMode, BuiltinToolName unions
- GitHub Actions workflow for automated publishing on version tags

[Unreleased]: https://github.com/pedropaulovc/claude-code-types/compare/v1.1.0...HEAD
[1.1.0]: https://github.com/pedropaulovc/claude-code-types/compare/v1.0.0...v1.1.0
[1.0.0]: https://github.com/pedropaulovc/claude-code-types/compare/v0.6.0...v1.0.0
[0.6.0]: https://github.com/pedropaulovc/claude-code-types/compare/v0.5.0...v0.6.0
[0.5.0]: https://github.com/pedropaulovc/claude-code-types/compare/v0.4.3...v0.5.0
[0.4.3]: https://github.com/pedropaulovc/claude-code-types/compare/v0.4.2...v0.4.3
[0.4.2]: https://github.com/pedropaulovc/claude-code-types/compare/v0.4.1...v0.4.2
[0.4.1]: https://github.com/pedropaulovc/claude-code-types/compare/v0.4.0...v0.4.1
[0.4.0]: https://github.com/pedropaulovc/claude-code-types/compare/v0.3.0...v0.4.0
[0.3.0]: https://github.com/pedropaulovc/claude-code-types/compare/v0.2.0...v0.3.0
[0.2.0]: https://github.com/pedropaulovc/claude-code-types/compare/v0.1.1...v0.2.0
[0.1.1]: https://github.com/pedropaulovc/claude-code-types/compare/v0.1.0...v0.1.1
[0.1.0]: https://github.com/pedropaulovc/claude-code-types/releases/tag/v0.1.0
