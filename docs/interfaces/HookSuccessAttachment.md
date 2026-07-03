[**claude-code-types**](../README.md)

***

[claude-code-types](../README.md) / HookSuccessAttachment

# Interface: HookSuccessAttachment

## Properties

### command

> **command**: `string`

***

### content

> **content**: `string`

***

### durationMs

> **durationMs**: `number`

***

### exitCode

> **exitCode**: `number`

Process exit code of the hook command (e.g. `0`).

***

### hookEvent

> **hookEvent**: `string`

Hook lifecycle event (e.g. `"PreToolUse"`, `"PostToolUse"`, `"SessionStart"`, `"Stop"`).

***

### hookName

> **hookName**: `string`

Hook matcher that fired (e.g. `"PreToolUse:Bash"`, `"Stop"`).

***

### stderr

> **stderr**: `string`

***

### stdout

> **stdout**: `string`

***

### toolUseID

> **toolUseID**: `string`

***

### type

> **type**: `"hook_success"`
