[**claude-code-types**](../README.md)

***

[claude-code-types](../README.md) / DynamicSkillAttachment

# Interface: DynamicSkillAttachment

Announces dynamically-discovered skills from a project skills directory.

## Properties

### displayPath

> **displayPath**: `string`

Repo-relative display path for the directory (e.g. `"playwright/.claude/skills"`).

***

### skillDir

> **skillDir**: `string`

Absolute path to the discovered skills directory (e.g. `"/home/pedro/src/playwright/.claude/skills"`).

***

### skillNames

> **skillNames**: `string`[]

Names of the discovered skills (e.g. `"playwright-dev"`).

***

### type

> **type**: `"dynamic_skill"`
