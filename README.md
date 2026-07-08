# The House That Craft Built

Behind the intimidating vocabulary of software architecture (hexagonal
architecture, Domain-Driven Design, CQRS, event sourcing, the SOLID
principles, the modular monolith) hides a handful of simple ideas.

This repository proves it, brick by brick. We take a single domain, a house,
and grow it step by step: from a plain object to a fully event-driven,
hexagonal, domain-driven model organized as a modular monolith. At every stage
we ask the only question that matters: *was this complexity actually
necessary?*

Think of the nursery rhyme "The House That Jack Built", where each verse piles
one more thing on top of the last. Same idea here, but with aggregates,
ports, and domain events instead of a malt and a rat.

## How to read this repository

There are two axes, and they are kept separate on purpose.

- **The code lives in git history.** Each stage is a tag (named `NN-<slug>`).
  `main` holds the most evolved stage. To visit an earlier one,
  `git checkout <tag>`; to see the single brick a stage adds,
  `git diff <previous>..<tag>`.
- **The story lives in [`docs/`](./docs).** One document per stage, all of
  them on `main`, so you can read the whole progression in one pass without
  checking anything out. Start with [`docs/00-overview.md`](./docs/00-overview.md):
  it is the ordered table of contents, and each entry names its tag. Every
  stage document is where the pain that justifies the next pattern is made
  visible, and where *"was this complexity actually necessary?"* gets its
  answer.

Stages are not cut to a fixed size: a pattern that earns several bricks gets
several stages, a concept that lands in one piece gets one.

## Status

Early days. The design is being shaped. The house is about to get its
foundations.

## License

[MIT](./LICENSE) &copy; 2026 Jean-Denis VIDOT
