// @provengo summon constraints

// Constraints.limit(Actions.backToSleep(), 6)
//             .until(bp.Event("coffee break"));
Constraints.limit(Actions.backToSleep(), 3).forever();
Constraints.limit(bp.Event("coffee break"), 3).forever();