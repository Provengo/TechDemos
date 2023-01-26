function rankByLengthVariance( ensemble ) {
    let min=ensemble[0].length;
    let max=min;
    for (let scenario of ensemble ) {
        if ( min > scenario.length ) min = scenario.length;
        if ( max < scenario.length ) max = scenario.length;
    }
    return max-min;
}

const GOALS = [
//    quickAction("dashboard","meet_banker").or(quickAction("dashboard","meet_invest")),
//    quickAction("dashboard","meet_cashier"),
//    action("nudge_chat", {value:"try our chat"}),
//    action("day_part_menu/select", {new_value:"morning"}),
//    action("day_part_menu/select", {new_value:"noon"}),
//    action("day_part_menu/select", {new_value:"evening"})
];

function rankByGoals( ensemble ) {
    const unreachedGoals = [];
    for ( let idx=0; idx<GOALS.length; idx++ ) {
        unreachedGoals.push(GOALS[idx]);
    }

    // bp.log.info("unreached goals: {0}", unreachedGoals);

    for (let testIdx = 0; testIdx < ensemble.length; testIdx++) {
        const test = ensemble[testIdx];
        for (let eventIdx = 0; eventIdx < test.length; eventIdx++) {
            const event = test[eventIdx];
            for (let ugIdx = 0; ugIdx < unreachedGoals.length; ugIdx++) {
                const unreachedGoal = unreachedGoals[ugIdx];
                // if ( eventEquals(unreachedGoal, event) ) {
                if ( unreachedGoal.contains(event) ) {
                    unreachedGoals.splice(ugIdx,1);
                }
            }
        }
    }

    return GOALS.length-unreachedGoals.length;
}

function rankingFunction(ensemble) {
    // return rankByLengthVariance(ensemble);
    var rank = rankByGoals(ensemble);
    return rank;
}
