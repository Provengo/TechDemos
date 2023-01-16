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
    flow.enterEvent("leave"),
    flow.enterEvent("premium plan"),
    flow.enterEvent("mini plan"),
    Ctrl.markEvent("We Pay")
];

function isMarkEvent( e ) {
    return e.data &&
        e.data.lib === "Ctrl" &&
        e.data.verb === "marker";
}

function rankByGoals( ensemble ) {
    const unreachedGoals = [];
    for ( let idx=0; idx<GOALS.length; idx++ ) {
        unreachedGoals.push(GOALS[idx]);
    }

    ensemble.forEach( e=>bp.log.info("e:{0}", e));

    for (let testIdx = 0; testIdx < ensemble.length; testIdx++) {
        let test = ensemble[testIdx];
        for (let eventIdx = 0; eventIdx < test.length; eventIdx++) {
            let event = test[eventIdx];
            for (let ugIdx = 0; ugIdx < unreachedGoals.length; ugIdx++) {
                let unreachedGoal = unreachedGoals[ugIdx];
                if ( isMarkEvent(unreachedGoal) && isMarkEvent(event) ) {
                    let cn = unreachedGoal.contains(event);
                    let rcn = event.contains(unreachedGoal);
                    bp.log.info("\nunr:\t{0}\nevt:\t{1}",//\ncnt:\t {3}\rct:\t{4}",
                        unreachedGoal, event, String(cn), String(rcn)
                    );
                }
                if ( unreachedGoal.contains(event) ) {
                    unreachedGoals.splice(ugIdx,1);
                    if ( event.data && !StateMachine.allEvents.contains(event) ) {
                        bp.log.info("found: {0}", event);
                    }
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
