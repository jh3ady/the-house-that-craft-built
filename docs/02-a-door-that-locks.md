# Stage 2: a door that locks

**Tag** `02-a-door-that-locks`

The house learns to refuse. Until now its door opened and closed on demand and
every request was granted; this stage gives the door a lock, and with the lock
comes the first thing the house is allowed to say no to.

## The brick

The brick is the difference from the previous tag,
`git diff 01-a-house-with-a-door..02-a-door-that-locks`. It touches the same two
files, [`src/door.ts`](../src/door.ts) and [`src/house.ts`](../src/house.ts),
adds a locked state beside the open one, and introduces two errors the door can
now throw. The whole story of the stage lives in that pair of throws.

## A lock is only a lock if it can refuse

Stage 1 was explicit that it held no rule: every transition the methods allowed
was legal, opening an already open door did nothing and said nothing, and no two
pieces of state were kept consistent because nothing yet constrained them. A lock
cannot be added in that spirit. A lock whose only effect is to record that it is
locked, while the door still opens whenever asked, is not a lock; it is a second
boolean with a suggestive name. A lock earns the word the moment it prevents
something, and the thing it prevents is opening. So the need for a lock is,
underneath, the need for the first rule.

That rule, stated once and for all: a door is never both open and locked.

## The rule, guarded at both entries

The rule spans two pieces of state, open and locked, and either transition could
break it, so it is guarded at both entries. `open()` refuses when the door is
locked and throws `DoorIsLockedError`; `lock()` refuses when the door is open and
throws `DoorIsOpenError`. Neither ever leaves the door in the forbidden
combination: each guard runs before the state would change, so the pairing of
open and locked is simply unreachable. The two tests that pin this, in
[`src/house.test.ts`](../src/house.test.ts), assert both halves, the throw and the
state left untouched, because on a refusal the unchanged state is not implied by
the throw and has to be checked directly.

## An invariant at last, and why it is not yet an aggregate

Stage 1 refused the word aggregate and said exactly why: an aggregate guards a
domain invariant, a rule that must stay true across what it holds, and stage 1
had the mechanism of encapsulation but no rule to enforce, so it named the
mechanism and left the heavier word out. This stage adds the missing half. The
door still encapsulates its state, as before, but now it also keeps two pieces of
that state consistent with each other, and it is the only thing that can, because
it is the only thing that sees both. Mechanism plus rule is what turns a plain
object into an entity that guards an invariant, and that is what the door has
become.

That is an entity, though, not yet an aggregate, and the distinction is worth
keeping honest in a project about earning words. Guarding a rule over one's own
two fields is ordinary entity work. An aggregate is more: a boundary drawn around
a cluster of objects with a single root as the only way in, so that a rule which
must hold across several of them cannot be broken from outside. Here there is no
cluster, and no rule reaches past one object. The day a rule must stay true
across, say, every opening of the house at once, something will have to hold them
all and stand guard, and that something will be the house. That is when the word
is earned. Until then the door is an entity with an invariant, and reaching for
the larger word would borrow the very vocabulary this project refuses to borrow
ahead of its need.

## Where the invariant lives, and why the house stays a delegator

The invariant is about the door's own two fields, so it belongs to the door. The
house gains `lockDoor`, `unlockDoor` and `isDoorLocked`, and each forwards one
call to the door exactly as the opening methods did; the house adds no rule of
its own and could not enforce this one better, because it does not hold the state
the rule is about. Keeping the invariant on the door and the house a thin
delegator is the same decision stage 1 made for the opening behaviour, extended
without ceremony to the new one. What guards the invariant here is the door, not
the house.

## Two shapes of an unchanged state

This stage has two situations where a call leaves the door exactly as it was, and
they are deliberately not the same. Locking an already locked door does nothing
and says nothing: it is idempotent, the caller asked for a state the door is
already in, and there is nothing to report. Asking a locked door to open also
leaves it closed, but it is not silent: it throws. The difference is intent.
Locking twice asks for locked and gets locked; opening a locked door asks for
open and is denied. One is a request already satisfied, the other a request the
invariant forbids, and collapsing them, either by throwing on the harmless repeat
or by swallowing the real violation, would erase the distinction the lock exists
to draw. The silent no-ops of stage 1 continue here for the harmless repeats; the
throws are new, and they are reserved for the case where the house must genuinely
refuse.

## Still one test surface

As in stage 1, every behaviour is specified through the house, its public
surface. The door carries no tests of its own even though it now carries the
invariant, because the house delegates one call for one call and a test driven
through the house exercises the real door, and its guards, underneath. The errors
are asserted by type through that surface, which is the only reason
`DoorIsLockedError` and `DoorIsOpenError` are exported at all.

## Was this complexity actually necessary?

Yes, and only now. This stage adds the first invariant, the first entity that
guards one, and the first exceptions in the whole codebase, and every one of them
arrives because a lock cannot exist without it, not because the model
is drifting toward some more correct shape. The proof is in the order: stage 1
could not have justified an invariant, because it had nothing it needed to keep
true, so it had none and refused even the vocabulary. The rule waited for the
need, and the need is a door you can lock.

The temptation this stage resists is the larger invariant nobody asked for. A
door could refuse to lock unless the house is empty, refuse to open before dawn,
demand a key. None of that is here, because none of it is required by "lock and
unlock the door". The single rule the lock implies, and not one more, is what the
door now guards. An invariant added ahead of its need is the same
over-engineering smell as any premature pattern; the discipline is to add the
rule the moment the lock makes it real, and to stop there.

## Who turns the key is not the door's concern

There is a subtler trap than the invariant nobody asked for, and it arrives
dressed as diligence. Faced with lock and unlock, a software engineer's trained
reflex is to ask who is allowed: should the door know its owner, so it can refuse
anyone else? The question feels responsible and is exactly the wrong one. It is
not domain thinking but an automatism from years of systems where every action
rode on an identity and a permission, and it imports authentication and ownership
into a model that asked for neither.

Come back to the real world, the only thing this model answers to. A door is an
object with behaviours: it opens, closes, locks, unlocks. Who performs the action
is not a property of the door, and the person turning the key need not own the
house. Picture the carpenter the property developer sent to fit the door,
checking that it locks and unlocks before the handover report is signed: not the
owner, never will be, and yet operating the lock is precisely his job. A door that
demanded proof of ownership before it would turn would model a rule the world does
not have.

So the door stays silent about identity, on purpose. A heavier rule about opening
and locking would at least be the door's own kind of fact; who may act on the
house is not, and no measure of how much it comes to matter makes it one. A rule
about who may act is a rule about people, kept wherever an application keeps its
rules about people, never inside the object it acts upon. Reaching for the owner
here is not a premature domain rule so much as a concern from the wrong place,
wearing the costume of care. Stage 1 said that a career in software piles up
automatisms and that the honest move is sometimes to unlearn them and come back to
the object. This is that warning made concrete: the door, and what one can do with
it, is the whole of the matter; who does it is not the door's concern.
