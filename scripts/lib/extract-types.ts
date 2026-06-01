/**
 * Parse `index.d.ts` with the TypeScript compiler API and extract every set of
 * known values the transcript scanner cares about: discriminator literals,
 * string-literal unions, and declared property names per interface.
 *
 * This makes `index.d.ts` the single source of truth — adding a new entry type,
 * tool, model, or union member automatically updates what the scanner (and the
 * smoke test) consider "already covered", so the two never drift.
 */

import * as ts from 'typescript';
import { readFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, resolve } from 'path';

export interface ExtractedTypes {
  /** `export type X = 'a' | 'b'` → name → {'a','b'}. */
  literalUnions: Map<string, Set<string>>;
  /** `export type X = A | B` (references) → name → ['A','B']. */
  refUnions: Map<string, string[]>;
  /** interface name → its `type:` discriminator literal (if any). */
  interfaceType: Map<string, string>;
  /** interface name → all declared property names (including inherited EntryBase). */
  interfaceFields: Map<string, Set<string>>;
  /** interface name → property name → string-literal-union values declared on it. */
  fieldLiterals: Map<string, Map<string, Set<string>>>;
}

/** Default path to the package's type declarations (../../index.d.ts from here). */
export function defaultDtsPath(): string {
  return resolve(dirname(fileURLToPath(import.meta.url)), '..', '..', 'index.d.ts');
}

/** Collect string-literal members from a (possibly union) type node. */
function stringLiterals(node: ts.TypeNode | undefined): Set<string> {
  const out = new Set<string>();
  if (!node) return out;
  const members = ts.isUnionTypeNode(node) ? node.types : [node];
  for (const t of members) {
    if (ts.isLiteralTypeNode(t) && ts.isStringLiteral(t.literal)) out.add(t.literal.text);
  }
  return out;
}

/** Collect referenced type names from a (possibly union) type node. */
function typeRefs(node: ts.TypeNode | undefined): string[] {
  const out: string[] = [];
  if (!node) return out;
  const members = ts.isUnionTypeNode(node) ? node.types : [node];
  for (const t of members) {
    if (ts.isTypeReferenceNode(t) && ts.isIdentifier(t.typeName)) out.push(t.typeName.text);
  }
  return out;
}

/** Names of base interfaces this heritage extends — unwrapping `Partial<X>`. */
function heritageBases(decl: ts.InterfaceDeclaration): string[] {
  const out: string[] = [];
  for (const clause of decl.heritageClauses ?? []) {
    if (clause.token !== ts.SyntaxKind.ExtendsKeyword) continue;
    for (const t of clause.types) {
      if (!ts.isIdentifier(t.expression)) continue;
      const name = t.expression.text;
      if (name === 'Partial' && t.typeArguments?.[0]) {
        const arg = t.typeArguments[0];
        if (ts.isTypeReferenceNode(arg) && ts.isIdentifier(arg.typeName)) out.push(arg.typeName.text);
        continue;
      }
      out.push(name);
    }
  }
  return out;
}

export function extractTypes(dtsPath: string = defaultDtsPath()): ExtractedTypes {
  const src = readFileSync(dtsPath, 'utf-8');
  const sf = ts.createSourceFile(dtsPath, src, ts.ScriptTarget.Latest, /*setParentNodes*/ true);

  const literalUnions = new Map<string, Set<string>>();
  const refUnions = new Map<string, string[]>();
  const interfaceType = new Map<string, string>();
  const interfaceFields = new Map<string, Set<string>>();
  const fieldLiterals = new Map<string, Map<string, Set<string>>>();
  const bases = new Map<string, string[]>();

  for (const stmt of sf.statements) {
    if (ts.isTypeAliasDeclaration(stmt)) {
      const name = stmt.name.text;
      const lits = stringLiterals(stmt.type);
      const refs = typeRefs(stmt.type);
      if (lits.size) literalUnions.set(name, lits);
      if (refs.length) refUnions.set(name, refs);
      continue;
    }
    if (!ts.isInterfaceDeclaration(stmt)) continue;

    const name = stmt.name.text;
    const fields = new Set<string>();
    const litMap = new Map<string, Set<string>>();
    for (const m of stmt.members) {
      if (!ts.isPropertySignature(m) || !m.name || !ts.isIdentifier(m.name)) continue;
      const prop = m.name.text;
      fields.add(prop);
      const lits = stringLiterals(m.type);
      if (lits.size) litMap.set(prop, lits);
      if (prop === 'type' && lits.size === 1) interfaceType.set(name, [...lits][0]);
    }
    interfaceFields.set(name, fields);
    if (litMap.size) fieldLiterals.set(name, litMap);
    bases.set(name, heritageBases(stmt));
  }

  // Merge inherited fields (one level is enough for this package: EntryBase).
  for (const [name, baseList] of bases) {
    const fields = interfaceFields.get(name)!;
    for (const base of baseList) {
      for (const f of interfaceFields.get(base) ?? []) fields.add(f);
    }
  }

  return { literalUnions, refUnions, interfaceType, interfaceFields, fieldLiterals };
}

/** Map a union-of-interfaces alias to the set of its members' `type` discriminators. */
export function discriminatorsOf(t: ExtractedTypes, aliasName: string): Set<string> {
  const out = new Set<string>();
  for (const ref of t.refUnions.get(aliasName) ?? []) {
    const disc = t.interfaceType.get(ref);
    if (disc) out.add(disc);
  }
  return out;
}
