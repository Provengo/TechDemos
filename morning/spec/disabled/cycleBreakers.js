// @provengo summon constraints

// Constraints.limit(Actions.backToSleep(), 6)
//             .until(Event("coffee break"));
Constraints.limit(Actions.backToSleep(), 3).forever();
Constraints.limit(Event("coffee break"), 3).forever();