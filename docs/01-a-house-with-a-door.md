# Stage 1: a house with a door

**Tag** `01-a-house-with-a-door`

This is the house that craft built. It has one door, and the door opens and
closes. That is the whole domain, and it is written the way anyone would write
it before a single architectural word enters the room: two plain classes, no
patterns, no layers, no vocabulary.

## The brick

Being the first stage, there is no earlier tag to compare against, so the brick
is the whole of `src/`. It is two files, [`src/door.ts`](../src/door.ts) and
[`src/house.ts`](../src/house.ts). To read them at this stage,
`git checkout 01-a-house-with-a-door`.

Three decisions are already baked in, and each deserves a word, because this
project is about earning decisions rather than assuming them.

## Why a separate Door, and why the house hides it

The door is its own class, and the house holds it privately. From outside you
cannot reach the door at all: you ask the house to open its door, to close it,
or whether it is open, and the house forwards each request to a collaborator you
never see.

This is not an architecture. It is ordinary object encapsulation. A house has a
door, the door owns whether it is open or closed, and nothing outside the house
reaches in to flip that state. A version that exposed the door as a public field
would not be simpler, only less encapsulated, so there is nothing to save by
writing it that way first.

We do not call this an aggregate, but not because the house protects nothing.
Encapsulation is already a protection: the door is private, its state cannot be
touched from outside, and the only way to affect it is to ask the house. What
the house guards that way is its own representation. An aggregate guards
something else, a domain invariant, a rule that must stay true across what it
holds, such as forbidding a transition or keeping two pieces of state consistent.
It uses encapsulation as its mechanism and adds a rule to enforce. Here there is
the mechanism and no rule: every transition the methods allow is legal, nothing
is kept consistent because nothing yet constrains it. The parallel is real, the
concepts are not the same, so we name what is present, encapsulation, and leave
the heavier word out.

## The rules that are not here

There is no rule. Each setter simply assigns the flag: opening a door that is
already open does nothing and says nothing, and closing a closed one is the
same. Two tests in [`src/house.test.ts`](../src/house.test.ts) state exactly
that and nothing more, one for opening an already open door and one for closing
an already closed one.

That is the whole truth about the door today. Whether opening an already open
door should mean something, or be forbidden, is not a question this stage has
asked, so nothing here answers it. If such a rule is ever wanted, it will arrive
as a change in the code, visible in the diff of the stage that adds it.

## One test surface, not two

The door is reached only through the house, so the house is the door's public
surface. Every behaviour is specified there: that a new house has a closed door,
that it opens its door and closes it, and that opening or closing again changes
nothing. The door carries no tests of its own.

It had some at first, one per door behaviour, and they were deleted once the
house wrapped it. They were not wrong, they were redundant. The house delegates
to the door one call for one call and adds no logic, so a test driven through the
house already exercises the real door underneath. A second set asserting the
same behaviour through an internal object would only couple the tests to a detail
the outside world cannot see. This is the project's question turned on the tests
themselves: a second test surface was not necessary, so it went.

## Was this complexity actually necessary?

There is barely any complexity to interrogate, which is the point. This is the
floor: a house whose door opens and closes, written as two encapsulated classes
with no rules, is the smallest honest thing that still has behaviour worth a
test. Nothing here is speculative. There is no port, no interface, no event, no
layer, because nothing yet asks for one. The only complexity present is
encapsulation, and it pays for itself at once by keeping the door's state where
it belongs.

## The value is the model, not the delivery

There is a quieter lesson in starting this plainly. A career in software piles up
automatisms, the reflexes of frameworks, layers and infrastructure, and it is
tempting to reach for them before the domain has even been named. Sometimes the
honest move is to unlearn them and come back to the most basic tool there is:
objects. A house, a door, open and closed. Thinking about the domain is thinking
about real life, and modelling that life in code is the whole of the work, not a
step on the way to it.

Notice what is absent. There is no website here, no application, no framework,
because those are only a delivery mechanism, the wrapping through which the model
reaches someone. The wrapping can be swapped, rewritten or thrown away, and the
thing of value outlives it: the model. A real business is no different. The
framework of the day carries no lasting value; what crosses the years is the way
the business was understood and modelled. This stage is nothing but that model,
kept alone on purpose, so that the one thing worth keeping is the only thing in
the room.
