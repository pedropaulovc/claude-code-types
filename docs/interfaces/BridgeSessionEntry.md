[**claude-code-types**](../README.md)

***

[claude-code-types](../README.md) / BridgeSessionEntry

# Interface: BridgeSessionEntry

Links a local session to a remote control bridge session (used by the
remote-control / companion bridge).

## Properties

### bridgeSessionId

> **bridgeSessionId**: `string`

Bridge session identifier (e.g. `"cse_01VoHgHgLQTzAFZ6SeK4RVPQ"`).

***

### lastSequenceNum

> **lastSequenceNum**: `number`

Last synced sequence number on the bridge stream (e.g. `0`).

***

### ownerAccountUuid?

> `optional` **ownerAccountUuid?**: `string`

***

### ownerOrganizationUuid?

> `optional` **ownerOrganizationUuid?**: `string`

***

### sessionId

> **sessionId**: `string`

***

### type

> **type**: `"bridge-session"`
