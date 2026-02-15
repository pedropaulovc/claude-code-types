# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/),
and this project adheres to [Semantic Versioning](https://semver.org/).

## [Unreleased]

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

[Unreleased]: https://github.com/pedropaulovc/claude-code-types/compare/v0.1.1...HEAD
[0.1.1]: https://github.com/pedropaulovc/claude-code-types/compare/v0.1.0...v0.1.1
[0.1.0]: https://github.com/pedropaulovc/claude-code-types/releases/tag/v0.1.0
