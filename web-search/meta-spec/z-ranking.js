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
    choiceEvent("banana"),
    choiceEvent("strawberry"),
    choiceEvent("fail"),
    selectEvent("fail type", "visibility")
];

function rankByGoals( ensemble ) {
    const unreachedGoals = [];
    for ( let idx=0; idx<GOALS.length; idx++ ) {
        unreachedGoals.push(GOALS[idx]);
    }

    for (let testIdx = 0; testIdx < ensemble.length; testIdx++) {
        let test = ensemble[testIdx];
        for (let eventIdx = 0; eventIdx < test.length; eventIdx++) {
            let event = test[eventIdx];
            for (let ugIdx = 0; ugIdx < unreachedGoals.length; ugIdx++) {
                let unreachedGoal = unreachedGoals[ugIdx];
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
