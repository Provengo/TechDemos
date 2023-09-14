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
    any(/Howdy/),
    any(/Mars/),
    Ctrl.markEvent("Classic!")
];

/**
 * Ranks test suites by how many times it hits events from the GOALS array.
 * The more hits, the higher the score.
 * @param {Event[][]} ensemble The test suite to be ranked.
 * @returns Number of times an event from GOALS has been met.
 */
function rankByGoalHits( ensemble ) {
    let hits = 0;
    for ( let test of ensemble ) {
        for (let event of test) {
            for (let goalEvent of GOALS) {
                if ( goalEvent.contains(event) ) {
                    hits = hits + 1;
                }
            }
        }
    }

    return hits;
}

/**
 * Ranks test suites by how many events from the GOALS array were met.
 * The more goals met, the higher the score. It make no difference if a goal was met more then once.
 *
 * @param {Event[][]} ensemble The test suite to be ranked.
 * @returns Number of events from GOALS that have been met.
 */
function rankByMetGoals( ensemble ) {
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
 * Main entry point for ranking test suites (ensembles). Gets a test suite (technically, an array of arrays of bp.Events)
 * and returns a number ranking that suite. The higher the number, the better the suite.
 *
 * Implementation-wise, this delegates the work to one of the above ranking functions, and then weigh their results.
 *
 * @param {Event[][]} ensemble the test suite/ensemble to be ranked
 * @returns the rank of the ensemble.
 */
 function rankingFunction(ensemble) {
    // How many times did `ensemble` hit a goal
    const goalHitCount = rankByGoalHits(ensemble);

    // How many goals did `ensemble` hit?
    const metGoalsCount = rankByMetGoals(ensemble);
    // What percentage of the goals did `ensemble` cover?
    const metGoalsPercent = metGoalsCount/GOALS.length;

    // factor all in, and return a rank.
    const metGoalsPercentBias = 0.9; // how important is the coverage percent.
    return metGoalsPercentBias*metGoalsPercent + (1-metGoalsPercentBias)*goalHitCount;
}
