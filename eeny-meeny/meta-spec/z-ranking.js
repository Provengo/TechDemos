
function firstEeny(ensemble) {
    let count = 0;
    for ( let route of ensemble ) {
        for ( let x=0; x<route.length; x++ ) {
            if ( route[x].name === "Eeny") {
                count+=x;
            }
        }
    };
    return count;
}

/**
 * Prefer test suites that have Eeny towards the end of the test.
 * @param {*} ensemble 
 * @returns 
 */
function rankingFunction(ensemble) {
    var rank = firstEeny(ensemble);
    return rank;
}
