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

## The need comes first: one issue per stage

Every stage starts as a GitHub issue that states the need it answers, opened
before the code. The need is functional: it describes the capability the house
must gain, or the pain a later stage must relieve, in the language of what the
system does, not how it is built or verified. The issue is the requirement-first
artifact; the code, and the stage document that justifies it, come after. The
stage's commits reference the issue, and the stage lands by closing it.

Stage 1 is the floor, so its issue is deliberately thin: there is no pain to
relieve yet, only the need to start with a house whose door opens and closes.
From stage 2 on, where a pattern is introduced to relieve a real pain, the issue
is where that pain is stated first, before any code exists to answer it.

## Structure and progression

The model grows from a single domain, a house, step by step, mirroring the
rhyme. Each step is a *stage*.

**Code rewinds through git; narration accumulates in `docs/`.** These are two
separate axes, and keeping them separate is deliberate:

- **Code lives in git history.** Each stage is a tag, named `NN-<slug>` where
  `NN` is the ordinal and `<slug>` names the brick. `main` always holds the
  most evolved stage. To see the code at an earlier stage,
  `git checkout <tag>`; to see the brick a stage adds,
  `git diff <previous>..<tag>`. There is no per-stage duplication of `src/`
  on `main`.
- **Narration lives in `docs/`, all of it on `main`.** One Markdown document
  per stage, named to match its tag (`docs/NN-<slug>.md`), plus the overview
  (`docs/00-overview.md`). The full story is readable in one pass on `main`,
  on GitHub, without checking anything out. Each stage document is the place
  where the pain that justifies the pattern is made visible and where
  *"was this complexity actually necessary?"* is answered. A stage document
  references its code by tag and its brick by diff range.

Each stage is built on a branch named `feature/NN-<slug>` and lands in `main`
through a pull request. That branch is kept after the merge, never deleted, so
the stage's granular commit history stays reachable under its own ref even once
`main` has moved on.

**Stage granularity is variable, decided per concept.** A concept that earns
several bricks gets several stages; a concept that lands in one piece gets
one. There is no uniform rule imposed up front, and no predrawn list of
stages: the number, order, and boundaries of stages emerge as the curriculum
in `docs/` is written, one concept at a time, letting the pain decide.

Keep `docs/00-overview.md` as the table of contents: the ordered list of
stages, each linking to its document and naming its tag.

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
