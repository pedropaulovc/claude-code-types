[**claude-code-types**](../README.md)

***

[claude-code-types](../README.md) / TaskStatusAttachment

# Interface: TaskStatusAttachment

Status update for a background task / local agent.

## Properties

### deltaSummary

> **deltaSummary**: `string` \| `null`

Summary of progress since the last update, or `null`.

***

### description

> **description**: `string`

***

### outputFilePath

> **outputFilePath**: `string`

Path to the file capturing the task's output.

***

### status

> **status**: `string`

Current status (e.g. `"running"`).

***

### taskId

> **taskId**: `string`

***

### taskType

> **taskType**: `string`

Kind of task (e.g. `"local_agent"`).

***

### type

> **type**: `"task_status"`
