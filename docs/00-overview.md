# Overview

This is the table of contents for the house's growth, and the map for reading
the repository. Start here.

## How to read

Two axes, kept separate on purpose.

- **Code lives in git history.** Each stage is a tag. `main` always holds the
  most evolved stage. To visit an earlier one, `git checkout <tag>`. To see
  the single brick a stage adds, `git diff <previous-tag>..<tag>`.
- **The story lives here, in `docs/`.** One document per stage, all of them on
  `main`, so the whole progression reads in one pass without checking anything
  out. Each stage document is where the pain that justifies the next pattern
  is made visible, and where the through-line question gets its answer.

## The through-line

At every stage the repository asks the only question that matters:

> *Was this complexity actually necessary?*

A pattern earns its place only at the step where its absence starts to hurt,
and the hurt is shown first. "We will need it later" and "it is more correct"
are not justifications; they are over-engineering smells. Every stage document
answers the question explicitly for the brick it adds.

## Stage granularity

Stages are not cut to a fixed size. A concept that earns several bricks gets
several stages; a concept that lands in one piece gets one. The grain is
decided one concept at a time, as each stage is written, so a single arc may
split into several tagged stages when it is built.

## Progression

| Stage | Document                                           | Tag                      | The brick it adds                                                                                                      |
|-------|----------------------------------------------------|--------------------------|------------------------------------------------------------------------------------------------------------------------|
| 1     | [A house with a door](./01-a-house-with-a-door.md) | `01-a-house-with-a-door` | A house that opens and closes its own encapsulated door, as two plain classes with no rules.                           |
| 2     | [A door that locks](./02-a-door-that-locks.md)     | `02-a-door-that-locks`   | The first invariant: a lockable door that is never both open and locked, making the door an entity that guards a rule. |

Each stage is added here only once it exists as code (a tag) and as a written
document. There is no predrawn roadmap: the order and boundaries of the stages
emerge as the house is built, because the point of the project is to let the
pain decide, not the plan. When a stage lands, it gains a row here linking to
its document and naming its tag.
