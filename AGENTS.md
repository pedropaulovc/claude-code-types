# claude-code-types

Types-only npm package for Claude Code chat history JSONL files.

## Project Structure

```
index.d.ts                      # All type definitions (the package payload)
scripts/scan-transcripts.ts     # Coverage scanner: finds JSONL values index.d.ts doesn't model yet
scripts/lib/extract-types.ts    # Parses index.d.ts (TS compiler API) — single source of truth for known values
test/smoke.local.test.ts        # Smoke test against real JSONL files (KNOWN_TYPES derived from index.d.ts)
package.json                    # types field, no main/module
tsconfig.json                   # Strict TS config for validation
scripts/tsconfig.json           # Strict TS config for the scanner + test
CHANGELOG.md                    # Keep a Changelog format
.github/workflows/ci.yml       # CI: typecheck + verify docs freshness on PRs and main pushes
.github/workflows/auto-tag.yml # Auto-creates v* tag from package.json on main push
.github/workflows/publish.yml  # Single job: validate → npm publish → GitHub Release, on v* tag push
```

## Commands

- `npm run typecheck` — Validate `index.d.ts` compiles under strict mode
- `npm run typecheck:scripts` — Typecheck the scanner and test under strict mode
- `npm run scan` — Scan `~/.claude/projects/` and report every discriminator/union value and entry field **not yet covered** by `index.d.ts`, with counts and samples. Exits non-zero when anything is uncovered. Run this first when refreshing types. Flags: `--dir <path>`, `--json`, `--no-samples`.
- `npm test` — Run smoke tests (requires `~/.claude/projects/` to contain JSONL files)

## Refreshing types from logs

`scripts/lib/extract-types.ts` parses `index.d.ts` as the source of truth, so the scanner and smoke test automatically track whatever the union declares — never hardcode a parallel list. To refresh:

1. `npm run scan` — lists new entry types, system subtypes, attachment types, tools, models, stop reasons, permission modes, queue ops, cache-miss reasons, content-block/citation types, **and** undeclared top-level fields per entry type. Each new value comes with a count and a sample JSON line.
2. For each reported value, add it to the location named in the report (e.g. a new `Attachment` member + interface, or a field on `EntryBase`). For new entry/attachment interfaces, use the sample to type the payload.
3. Re-run `npm run scan` until it reports full coverage, then `npm run typecheck && npm test`.

**Use `npm run scan` — do not write ad-hoc transcript-walking scripts.** The scanner already recurses through every project subdirectory under `~/.claude/projects/` and emits a representative sample for each uncovered value, which is everything you need to type a new payload. Samples are truncated for readability; if you need the full object to type a new interface, re-run with `npm run scan -- --json` — each entry carries the `file` and `line` of a representative occurrence, so you can read that exact line instead of hand-rolling a reader.

Note: the scanner checks **top-level** entry fields and the modeled discriminator unions. Deeply nested payloads (e.g. `message.usage`, `toolUseResult`) are intentionally typed loosely and are not field-diffed.

## Publishing a New Version

The publish workflow runs on `v*` tag push. It runs typecheck + tests, creates
a GitHub Release from the CHANGELOG entry, and publishes to npm with provenance.

### Steps

1. Run `npm run scan` and add any reported uncovered values to `index.d.ts` (see "Refreshing types from logs")
2. Run `npm run typecheck`, `npm run typecheck:scripts`, and `npm test` locally
3. Run `npm run docs` and commit the updated `docs/` directory
4. Add a `## [x.y.z] - YYYY-MM-DD` section to `CHANGELOG.md` (above `[Unreleased]` contents, then clear Unreleased)
5. Update the comparison links at the bottom of `CHANGELOG.md`
6. Bump `version` in `package.json`
7. Open a PR and merge to `main`
8. The `auto-tag` workflow creates a `v*` tag if one doesn't exist for the version
9. The `publish` workflow triggers on the new tag: verify version match → extract changelog → create GitHub Release → publish to npm

### Version Semantics

This project follows [Semantic Versioning 2.0.0](https://semver.org/spec/v2.0.0.html).

- **Patch**: JSDoc improvements, adding optional fields, fixing comments
- **Minor**: New entry types, new content block types, new union members
- **Major**: Removing or renaming exported types, changing required fields

### If the Workflow Fails

- **Version mismatch**: `package.json` version must match the tag (e.g. tag `v0.2.0` → version `"0.2.0"`)
- **Missing changelog**: Add a `## [x.y.z]` section to `CHANGELOG.md` for the version being released
- **npm auth**: Uses trusted publishing (OIDC). `NPM_TOKEN` is auto-injected into the `npm` GitHub environment — no manual secret setup needed
