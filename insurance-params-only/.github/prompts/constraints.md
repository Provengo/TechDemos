# Copilot Instructions for Constraints Library

## Goal
Assist users in using the constraints library when they want to declaratively limit or require
occurrences of events or event sets.

## Key Concepts
The structure of the constraint statements is as follows:
- First, we may specify a trigger event (this is optional).
- Then, specify what event/event set to block or limit
- Finally, specify the end condition - until forever or until a certain event occurs.

IMPORTANT: You must specify an end condition for the constraint to become active.

## Constraint Types

### Blocking Constraints:
prevent events from happening

#### Examples:
```javascript
// @provengo summon constraints

const E, F, G; // events

// E cannot happen.
Constraints.block(E).forever();
// E cannot happen before F.
Constraints.block(E).until(F);

// After E happens, never allow F.
Constraints.after(E).block(F).forever();
// F cannot happen between E and G.
Constraints.after(E).block(F).until(G);

// E can only happen 5 times.
Constraints.limit(E, 5).forever();

// E can only happen 5 times until F occurs (then it can
// occur as many times at it wants).
Constraints.limit(E, 5).until(F);

// E can happen up to 5 times (including) between G and F.
Constraints.after(G).limit(E, 5).until(F);

// blocks F after E occurs. F is unblocked after G occurs.
// This constraint is lifted when Z occurs before E does.
Constraints.unless(Z).after(E).block(F).until(G);
```

### Future Constraints:
- require that certain events would happen.
- can be used to find problems in a business process.

#### Examples:
```javascript
// @provengo summon constraints

const A,B,C; // events

// A must be selected at some point in the future.
Constraints.require(A).eventually();

// A must be selected at some point in the future, unless B is selected.
Constraints.require(A).until(B);

// If A happens, then B must happen eventually.
Constraints.after(A).require(B).eventually();

// If A happens, then as long as C did not happen, B must happen eventually.
Constraints.after(A).require(B).until(C);
```
