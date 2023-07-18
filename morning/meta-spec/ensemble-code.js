// @provengo summon ctrl

/**
 * @param {Event[][]} ensemble The test suite to be ranked.
 * @returns A ranking for the test suite based on length difference.
 */
function rankByLengthVariance( ensemble ) {
    let min=ensemble[0].length;
    let max=min;
    for (let scenario of ensemble ) {
        if ( min > scenario.length ) min = scenario.length;
        if ( max < scenario.length ) max = scenario.length;
    }
    return max-min;
}

/**
 * List of events "of interest" that we want test suites to cover.
 */
const GOALS = [
    Actions.goOut(),
    Actions.eat("banana"),
    Actions.eat("salad"),
    selectEvent("breakfast", "quick")
];

/**
 * Ranks test suites by how many events from the GOALS array were met.
 * The more goals met, the higher the score. It make no difference if a goal was met more then once.
 *
 * @param {Event[][]} ensemble The test suite to be ranked.
 * @returns Number of events from GOALS that have been met.
 */
function countMetGoals( ensemble ) {
    const unreachedGoals = [];
    for ( let idx=0; idx<GOALS.length; idx++ ) {
        unreachedGoals.push(GOALS[idx]);
    }

    for (let testIdx = 0; testIdx < ensemble.length; testIdx++) {
        let test = ensemble[testIdx];
        for (let eventIdx = 0; eventIdx < test.length; eventIdx++) {
            let event = test[eventIdx];
            for (let ugIdx=unreachedGoals.length-1; ugIdx >=0; ugIdx--) {
                let unreachedGoal = unreachedGoals[ugIdx];
                if ( unreachedGoal.contains(event) ) {
                    unreachedGoals.splice(ugIdx,1);
                }
            }
        }
    }

    return GOALS.length-unreachedGoals.length;
}

/**
 * Rank test suites by how many steps there are until a shirt is worn. The more steps, the higher the score.
 * @param {Event[][]} ensemble Test suite candidate
 * @returns rank of the test suite
 */
function shirtLater(ensemble) {
    let count = 0;
    for ( let route of ensemble ) {
        for ( let eventIndex=0; eventIndex<route.length; eventIndex++ ) {
            if ( route[eventIndex].name === "wear shirt") {
                count+=eventIndex;
            }
        }
    };
    return count;
}

/**
 * Main entry point for ranking test suites (ensembles). Gets a test suite (technically, an array of arrays of bp.Events)
 * and returns a number ranking that suite. The higher the number, the better the suite.
 *
 * Implementation-wise, this delegates the work to one of the above ranking functions, and then weigh their results.
 *
 * @param {Event[][]} ensemble the test suite/ensemble to be ranked
 * @returns the rank of the ensemble.
 */
 function rankingFunction(ensemble) {
     const metGoalsCount = countMetGoals(ensemble);
     return metGoalsCount/GOALS.length*100;
}
 
