[**claude-code-types**](../README.md)

***

[claude-code-types](../README.md) / DiagnosticItem

# Interface: DiagnosticItem

## Properties

### code?

> `optional` **code?**: `string`

Diagnostic code (e.g. `"2307"`, `"6133"`).

***

### message

> **message**: `string`

Diagnostic message (e.g. `"Cannot find module 'fs' or its corresponding type declarations."`).

***

### range

> **range**: `object`

#### end

> **end**: [`DiagnosticPosition`](DiagnosticPosition.md)

#### start

> **start**: [`DiagnosticPosition`](DiagnosticPosition.md)

***

### severity

> **severity**: `string`

Severity label (e.g. `"Error"`, `"Hint"`).

***

### source?

> `optional` **source?**: `string`

Diagnostic source/provider (e.g. `"typescript"`).
