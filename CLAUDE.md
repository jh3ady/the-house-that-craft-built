# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What this repository is

An educational project, not a product. It demystifies the vocabulary of
software architecture (hexagonal architecture, Domain-Driven Design, CQRS,
event sourcing, SOLID, the modular monolith) by growing a single domain, a
house, from a plain object into a fully event-driven, hexagonal, DDD model
organized as a modular monolith.

The structure follows the nursery rhyme "The House That Jack Built": each
stage piles one more architectural idea on top of the previous one.

## The rule that governs every change

At every stage the repository asks: *was this complexity actually necessary?*

This is the through-line, not a slogan. When adding a pattern or a layer,
justify it against the current stage's need. If the justification is "we will
need it later" or "it is more correct", that is a YAGNI/over-engineering
smell and the added complexity is probably premature for that stage. Prefer
introducing a pattern only at the step where its absence starts to hurt, and
make that pain visible first.

## Structure and progression

The model grows from a single domain, a house, step by step, mirroring the
rhyme. The concrete stage layout and conventions are not decided yet (the
design is still being shaped). Do not assume a structure; document it here
once it exists.

## Toolchain

TypeScript, run on Node with pnpm as the package manager (pinned via the
`packageManager` field). Install dependencies with `pnpm install`.

- `pnpm typecheck` — type-check with `tsc --noEmit` (strict). There is no
  build step yet: nothing needs bundling, so `noEmit` is deliberate until a
  runtime target actually requires emitted output.
- `pnpm test` — run the Vitest suite once.
- `pnpm test:watch` — run Vitest in watch mode.
- `pnpm test src/path/to/file.test.ts` — run a single test file.
- `pnpm test -t "part of the name"` — run tests matching a name.
- `pnpm lint` — check formatting and lint with Biome.
- `pnpm format` — apply Biome's fixes and formatting in place.

Tests live next to the code as `src/**/*.test.ts` (Vitest is scoped to that
pattern). Domain code goes under `src/`.
