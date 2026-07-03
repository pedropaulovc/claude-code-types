[**claude-code-types**](../README.md)

***

[claude-code-types](../README.md) / FileAttachment

# Interface: FileAttachment

## Properties

### content

> **content**: `object`

#### file

> **file**: `object`

##### file.content

> **content**: `string`

##### file.filePath

> **filePath**: `string`

##### file.numLines

> **numLines**: `number`

##### file.startLine

> **startLine**: `number`

##### file.totalLines

> **totalLines**: `number`

#### type

> **type**: `string`

Content kind (e.g. `"text"`).

***

### displayPath

> **displayPath**: `string`

Repo-relative display path (e.g. `"ideas/field-service-trust-layer/design.md"`).

***

### filename

> **filename**: `string`

Absolute path of the attached file (e.g. `"/home/pedro/src/entrepreneurship/ideas/field-service-trust-layer/design.md"`).

***

### type

> **type**: `"file"`
