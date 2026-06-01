[**claude-code-types**](../README.md)

***

[claude-code-types](../README.md) / CompactMetadata

# Interface: CompactMetadata

Metadata emitted with `compact_boundary` system entries.

## Properties

### durationMs?

> `optional` **durationMs?**: `number`

Duration of the compaction in milliseconds.

***

### postTokens?

> `optional` **postTokens?**: `number`

Token count after compaction.

***

### preCompactDiscoveredTools?

> `optional` **preCompactDiscoveredTools?**: `string`[]

Tool names discovered before compaction.

***

### preservedMessages?

> `optional` **preservedMessages?**: `object`

Preserved message UUIDs.

#### anchorUuid

> **anchorUuid**: `string`

#### uuids

> **uuids**: `string`[]

***

### preservedSegment?

> `optional` **preservedSegment?**: `object`

Preserved message segment boundaries.

#### anchorUuid

> **anchorUuid**: `string`

#### headUuid

> **headUuid**: `string`

#### tailUuid

> **tailUuid**: `string`

***

### preTokens

> **preTokens**: `number`

Token count before compaction.

***

### trigger

> **trigger**: `"auto"` \| `"manual"`
