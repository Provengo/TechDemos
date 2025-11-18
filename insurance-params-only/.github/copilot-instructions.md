
# Copilot Instructions for This Repository

## Overview

This project uses **Behavioral Programming (BP)** as its core modeling paradigm.
BP allows system behavior to be defined through independently specified threads of behavior (bthreads) that interact via synchronized events.
The approach is modular, supports incremental development, and is especially well-suited for modeling complex scenarios, constraints, and reactive systems.

### Behavioral Programming (BP)

Behavioral Programming (BP) is a programming paradigm in which system behavior is described as a collection of
independent behavioral threads (bthreads) that coordinate by synchronizing on events.  Bthreads implement a (typically simple) single-threaded logic, with synchronization points (a.k.a `sync`). At a `sync` point, a bthread specifies what events it wants to happen (request), what events it blocks from happening, and what events it waits for. The bthread is then paused, and waits for the BP engine to select an event.

After all bthreads have gotten to a `sync` point, the BP engine chooses a single event that was requested by at least one bthread, and not blocked by any bthread. Then, it resumes the bthreads that requested or waited for that event. The other bthreads remain paused until the next synchronization point, where their event preferences will be re-evaluated.

This approach encourages modular design, where each thread can represent a separate requirement, scenario, or behavioral
constraint.

---

## Foundations
### `bp-base`

`bp-base` is the JavaScript-based library that provides the core infrastructure for Behavioral Programming in this
project. It includes:

- Support for defining behavioral threads and programs
- Event objects and synchronization mechanisms
- Event selection and execution scheduling
- Utility functions and interfaces for modeling scenarios

All behavioral modeling in the project is built on top of `bp-base`.


Concepts
#### `bthreads`

Behavioral threads (bthreads) are the primary modeling units in Behavioral Programming. Each bthread contributes to the
system’s behavior by independently specifying events it:

- **Request** — to be selected next
- **Block** — to prevent from occurring
- **WaitFor** — to observe without triggering

All bthreads participate in synchronization steps, allowing system behavior to emerge from the combination of
their constraints and preferences.

#### example:

define a bthread with `bthread(name, data, body)`.

```javascript
bthread('North', function () {
    request(Event("put", { player: "N", suit: "♠", card: "A" }))
    request(Event("put", { player: "N", suit: "♦", card: "3" }))
    request(Event("put", { player: "N", suit: "♦", card: "Q" }))
});
```

#### `sync`

Synchronization is the mechanism by which bthreads interact. When entering a synchronization point, each bthread
requests, blocks, and/or waits for one or more events, and then pauses. The BP engine then selects a single event that requested by at least one bthread and not blocked by any bthread. Then, the engine resumes only those bthreads that were waiting for or requesting that event.

#### Verifications
- Use the `halt(message)` function to mark current system status as invalid. Use the `message` string parameter to explain what is invalid.
- For example, if a requirement is: "eventY cannot happen after eventX" the code should be: `waitFor(eventX); waitFor(eventY); halt("Y cannot happen before X")`.
- Visually, when running `provengo analyze <model>`, calling `halt(msg)` creates a red polygon on the models map, showing where a violation occurred.

#### `requestAtAnyOrder()`
- For modeling cases where events that can happen in parallel/at any order.
- Separate the events by commas, or have an array of events.

Code snippet example:
```javascript
requestAtAnyOrder(
   Event("A"), Event("B"), Event("C")
);
```

#### Loading order
Code is loaded by directories, in the following order: `lib`, `data`, `spec`. In each directory, files are loaded alphabetically. So whenever using something defined on a different file, take this into consideration when suggesting names for files.

#### maybe
- `maybe()`: Returns `true` or `false`. Splits the scenario into two sub-scenarios, depending on its return value.
           This statement request `maybeEvent().yes` and `maybeEvent().no`, only one of which will be selected in a given scenario.
- `maybe(v)`: Returns `true` or `false`. The `v` parameter describes the choice being made. This description can be used by
            other b-thread to detect the choice, and by trace post-processing tools (such as the gen-book sub-command)
            to tag and filter the generated trace. This statement requests `maybeEvent(v).yes` and `maybeEvent(v).no.`
            Of course, only one of these events will be selected.
- `maybeEvent(v)`: Returns an object containing events and event sets related to `maybe(v)` calls. Can be used to `waitFor`
                 and `block` calls to `maybe`. E.g. `waitFor(maybeEvent("eat?").yes)`.

- Example: ```if(maybe("something happened")){
                // handle something happening
            }else{
                // handle something not happening
            }```

### The `bp` Object
The `bp` object is a gateway to the Behavioral Programming infrastructure underlying the model. It includes:
- Methods for creating events and event sets.
- a central data store.
- a logger. The logger has 4 log levels: `fine`, `info`, `warn`, `off`. example: `bp.log.levelName(formatString, objects...)`

### `Scenario` Objects
provides objects and methods to easily work with scenarios that a specification allows.

---

## DSLs / Libraries
We can use one or more domain-specific languages (DSLs) or libraries in this project,
depending on the type and purpose of the project.
Below is a guide to help you identify and work with each DSL appropriately.

### The `StateMachines` Library
- **Purpose:** Used to define finite state machines with embedded logic for modeling complex sequences or behaviors.
- **Key concepts:**
  - `@provengo summon StateMachines` – imports the library
  - `const sm = StateMachine("name");` – defines the state machine
  - `stateHandlers` – functions tied to each state
  - Use `sm.next.mustBe`, `sm.next.cannotBe` or general BP techniques to alter the way it can move from other b-threads.
    e.g. `block(sm.enterEvent(doNotGoInHere))`
  - StateMachines are normally defined at the model level, as top-level constants (that is, not inside bthreads).
    This makes them usable for the rest of the model, e.g. when defining test goals for ensembles, or when an external
    bthread needs to block a state machine from entering one of its states.
- **Example:**
    ```// @provengo summon StateMachines

    const eagle = StateMachine("Hotel California");
    eagle.connect("dark desert highway")
        .to("reception")
        .to("check in", "leave")

    eagle.connect("check in")
        .to("stay")
        .to("checkout")
        .to("stay");

    eagle.at("leave").run(function(d){ // will print log "leave Hotel California"
        bp.log.info(d.state + " " + d.machine)
    })```

### The `Combi` Library
- **Purpose:** Used to define specification parameters and control how they relate to each other and to system behavior.
- **Key concepts:**
    - `Combi(name)`: Defines a configurable object.
    - `field(...).isOneOf(...)`, `isSomeOf(...)`, `yesNoField(...)`: Field types.
    - Conditional logic: `mustBe(...)`, `cannotBe(...)`, `whenSetTo(...).field(...).mustBe(...)`
    - Event-driven flow: `doStart()`, `start`, `set`, `done` events.
    - Field values can be stored using `record()` or `recordAs(...)`.

### Event Category
- **Purpose:** Used to easily group related events together under a single "category".
               Has specific names and colors for visualization.

- Event Category Common Patterns
  -- doX() methods directly trigger events
  -- When the name is "X SomethingSomething" it will be translated to doXSomethingsomething().
  -- xEvent() methods return event objects for use with request/waitFor

### The Constraints Library
- **Purpose:** Used to limit or require occurrences of events or event sets.
- **Key concepts:**
    - There are 2 types of constraints:
        1. **Blocking Constraints:** These constraints prevent events from happening. The are also known as safety requirements.

        1. **Future Constraints:** These constraints require that certain events would happen.
                They do not request the events, just verify that they eventually happen.
                These are also known as liveness requirements.

- **Common usage:**
    - Blocking events (`block`) under specific conditions.
    - Limiting how many times an event can occur (`limit`).
    - Requiring events to eventually happen (`require(...).eventually()`).

- **Common patterns:**
    - `Constraints.block(E).forever();` // E cannot happen.
    - `Constraints.after(E).block(F).until(G);` // F cannot happen between E and G.
    - `Constraints.require(A).eventually()` // A must be selected at some point in the future.
    - `Constraints.after(E).block(F).forever();` // After E happens, never allow F.
    - `Constraints.unless(U).after(E).block(B).forever();` // If `E` happened before `U`, block `B` forever.

NOTE: You must always specify an end condition (`forever()` or `until(...)`) for a constraint to become active.

### The Selenium Library
- **Purpose:** used for browser automation. Under the covers, it uses the Selenium project to perform the automation.
This library is built around a "Session" concept. Client code first initializes a Selenium session, and then interacts with it.
- **Key concepts:**
    - Open and control real browser windows (Chrome, Firefox, etc.)
    - Interact with page elements using CSS or XPath selectors
    - Validate visual or content changes on the page
    - Automate full user flows as part of your model-based testing

usually used in a low-level file to refine the high level flow events.
---

## Copilot Chat Instructions
- a `@summon <library name>` declaration should be commented out and located at the top of the page.
- Prefer working with `EventCategory` library when working on runbooks.
- Prefer using the libraries already being used in this project to generate code.
- Prefer working with `StateMachines` or `EventCategory` library when modeling the high level flow of a process.
- Assume familiarity with high-level Behavioral Programming concepts.
- Focus on modeling behavior, event coordination, and incremental scenario design.
- Prefer explanations that clarify intent, coordination, and constraint logic.
- Avoid unnecessary implementation-level details unless requested.
- Rely on knowledge of the `bp-base` library and BP modeling practices to guide completions and suggestions.
- When building a model, try to understand which library suits best and use it.
- Provengo is based on javascript but does not support modules, imports, require, or exports.
- Use Rhino syntax. don't suggest spread operator, arrow functions.
- Use the bp object only when requesting to log or to use the store.
- When using EventCategory objects, don't request the event directly. Use `category.doEventName()`, or `category.eventNameEvent()` to emit events.
- When working on a new model or process, prefer to start with a small flow, only what's necessary for describing the high level process.
---
