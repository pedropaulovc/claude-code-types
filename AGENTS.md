# claude-code-types

Types-only npm package for Claude Code chat history JSONL files.

## Project Structure

```
index.d.ts                      # All type definitions (the package payload)
test/smoke.local.test.ts        # Smoke test against real JSONL files
package.json                    # types field, no main/module
tsconfig.json                   # Strict TS config for validation
CHANGELOG.md                    # Keep a Changelog format
.github/workflows/ci.yml       # CI: typecheck + verify docs freshness on PRs and main pushes
.github/workflows/auto-tag.yml # Auto-creates v* tag from package.json on main push
.github/workflows/publish.yml  # Release + publish on v* tag push
```

## Commands

- `npm run typecheck` — Validate `index.d.ts` compiles under strict mode
- `npm test` — Run smoke tests (requires `~/.claude/projects/` to contain JSONL files)

## Publishing a New Version

The publish workflow runs on `v*` tag push. It runs typecheck + tests, creates
a GitHub Release from the CHANGELOG entry, and publishes to npm with provenance.

### Steps

1. Make your changes to `index.d.ts`
2. Run `npm run typecheck` and `npm test` locally
3. Add a `## [x.y.z] - YYYY-MM-DD` section to `CHANGELOG.md` (above `[Unreleased]` contents, then clear Unreleased)
4. Update the comparison links at the bottom of `CHANGELOG.md`
5. Bump `version` in `package.json`
6. Open a PR and merge to `main`
7. The `auto-tag` workflow creates a `v*` tag if one doesn't exist for the version
8. The `publish` workflow triggers on the new tag: verify version match → extract changelog → create GitHub Release → publish to npm

### Version Semantics

This project follows [Semantic Versioning 2.0.0](https://semver.org/spec/v2.0.0.html).

- **Patch**: JSDoc improvements, adding optional fields, fixing comments
- **Minor**: New entry types, new content block types, new union members
- **Major**: Removing or renaming exported types, changing required fields

### If the Workflow Fails

- **Version mismatch**: `package.json` version must match the tag (e.g. tag `v0.2.0` → version `"0.2.0"`)
- **Missing changelog**: Add a `## [x.y.z]` section to `CHANGELOG.md` for the version being released
- **npm auth**: Uses trusted publishing (OIDC). `NPM_TOKEN` is auto-injected into the `npm` GitHub environment — no manual secret setup needed
