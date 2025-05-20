// @provengo summon ctrl

/**
 * List of events "of interest" that we want test suites to cover.
 * TODO: Change this list to match the project
 */
const GOALS = [
    any(/Howdy/),
    any(/Mars/),
    Ctrl.markEvent("Classic!")
];

const makeGoals = function(){
    return [ [ any(/Howdy/), any(/Venus/) ],
             [ any(/Mars/) ],
             [ Ctrl.markEvent("Classic!") ] ];
}


/**
 * Counts how many goals are met by the passed test suite.
 * @param {Event[][]} ensemble Test suite to be ranked.
 * @param {EventSet[]} goals Goals to be covered by the test suite.
 * @returns How many goals were met by the test suite.
 */
function countMetGoals(ensemble, goals) {
    let metGoals = 0;
    goalLoop: for (let goal of goals) {
        for ( let test of ensemble ) {
            for (let event of test) {
                if ( goal.contains(event) ) {
                    metGoals++;
                    continue goalLoop;
                }
            }
        }
    }
    return metGoals;
}

/**
 * Counts how many test scenarios in the passed ensemble cover at least one goal.
 * @param {Event[][]} ensemble Test suite to be ranked.
 * @param {EventSet[]} goals Set of goals to be covered by the test suite.
 * @returns How many test scenarios cover at least one goal.
 */
function countGoalMeeters(ensemble, goals) {
    let meeters = 0;
    scenarioLoop: for ( let scenario of ensemble ) {
        for (let event of scenario) {
            for (let goal of goals) {
                if ( goal.contains(event) ) {
                    meeters++;
                    continue scenarioLoop;
                }
            }
        }
    }
    return meeters;
}

/**
 * Rank test suites based on how many goals the hit, and how many 
 * scenarios hit goals.
 * 
 *  Examples:
 *   - Suite covering all goals, each scenario covers at least one goal: 100
 *   - Suite covering all goals, 30% scenarios don't cover any goal: 70
 *   - Suite covering 8 out of 10 goals, each scenario cover at least one goal: 80
 *   - Suite covering 7 out of 10 goals, 5 out of 100 scenarios don't cover any goal: 66.5
 * 
 *  rank = (% covered goals) * (% goal covering scenarios) * 100
 * 
 * @param {Event[][]} ensemble Test suite to be ranked.
 * @returns Score of the test suite.
 */
function rankingFunction(ensemble) {
    
    // How many goals did `ensemble` hit?
    const metGoalsCount = countMetGoals(ensemble, GOALS);
    const metGoalsPercent = metGoalsCount/GOALS.length;

    const goalMeeters = countGoalMeeters(ensemble, GOALS);
    const goalMeetersPercent = goalMeeters/ensemble.length;

    return metGoalsPercent*goalMeetersPercent*100; // convert to human-readable percentage

}