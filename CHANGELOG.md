# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/),
and this project adheres to [Semantic Versioning](https://semver.org/).

## [Unreleased]

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

[Unreleased]: https://github.com/pedropaulovc/claude-code-types/compare/v0.4.2...HEAD
[0.4.2]: https://github.com/pedropaulovc/claude-code-types/compare/v0.4.1...v0.4.2
[0.4.1]: https://github.com/pedropaulovc/claude-code-types/compare/v0.4.0...v0.4.1
[0.4.0]: https://github.com/pedropaulovc/claude-code-types/compare/v0.3.0...v0.4.0
[0.3.0]: https://github.com/pedropaulovc/claude-code-types/compare/v0.2.0...v0.3.0
[0.2.0]: https://github.com/pedropaulovc/claude-code-types/compare/v0.1.1...v0.2.0
[0.1.1]: https://github.com/pedropaulovc/claude-code-types/compare/v0.1.0...v0.1.1
[0.1.0]: https://github.com/pedropaulovc/claude-code-types/releases/tag/v0.1.0
