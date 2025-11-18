
const GIVEN_NAMES = [
    "collective",
    "isPrimary",
    "isPolicyValid",
    "isTariffValid",
    "hasExistingClaims",
    "debts"
];
const WHEN_NAMES = [
    "claimTopic",
    "claimAmount",
    "personCount",
    "isChildPlaintiff",
    "isSelfClaim"
];
const THEN_NAMES = [
    "expectedResult"
];

/**
* Generate a index file for the generated test suite/ensemble.
* Such index file is useful for creating a central location containing test scenario metadata, or
* a central script that runs other scripts defined in the main test files.
* This function is a executed once per gen-script invocation.
*
* @param {Array<Trace>} The test suite, described using an array of Traces (e.g. [ Trace1, Trace2...]).
* Trace: contains list of events, it has 2 functions: getBEventList(): List<Event>(list of all events), getSize(): int(number of events)
* @param {ScriptBuilder} scriptFile A builder for the script file
*/
// function writeIndexFile(runs, scriptFile) {
//     for (let i = 0; i < runs.length ; i++) {
//         var run = runs[i];
//         scriptFile.append("test number " + i + " has " + run.getSize() + " events.");
//     }
// }


function collectEvents( aRun ) {
    let retVal = {
        given: {},
        when: {},
        then: {}
    };
     
    // aggregate scenario events by relevance
    Array.from(aRun).filter( e => caseParams.anyFieldSetEvent.contains(e) )
        .forEach( e => {
            if ( GIVEN_NAMES.includes(e.data.field) ) {
                retVal.given[e.data.field]=e.data.value;
            } else if ( WHEN_NAMES.includes(e.data.field) ) {
                retVal.when[e.data.field]=e.data.value;
            } else if ( THEN_NAMES.includes(e.data.field) ) {
                retVal.then[e.data.field]=e.data.value;
            }
    });

    return retVal;
}   

/**
 * Generate Python scripts from the test model - this is a Javascript file 
 * that creates Python programs.
 *
 * @param {Trace} run A test run, described using Trace object contains list of events
 * @param {ScriptBuilder} scriptFile A builder for the script file
 */
 function generateTddScript(run, scriptFile) {
    scriptFile.append(`# Auto-generated script number ${scriptFile.scriptNumber}`);

    let col = collectEvents(run);

    let title = ScenarioUtils.createTitle.bySplitters(run);
    title = title.split(",").filter( t => !(t.toLowerCase().includes(":no")||t.toLowerCase().includes(":false")) ).join(", "); //shorten, positive values only

    scriptFile.append(`Feature: ${FEATURE_NAME}`);
    scriptFile.append(`  Scenario: ${title}`);
    scriptFile.append("     Given ", false);
    scriptFile.append( Object.keys(col.given).map( k => `${k} is ${col.given[k]}`).join( "\n       and "));
    scriptFile.append("      When ", false);
    scriptFile.append( Object.keys(col.when).map( k => `${k} is ${col.when[k]}`).join( "\n       and "));
    scriptFile.append("      Then ", false);
    scriptFile.append( Object.keys(col.then).map( k => `${k} should be ${col.then[k]}`).join( "\n       and "));
}

function generateTestJson(run, scriptFile) {
    let col = collectEvents(run);

    let title = ScenarioUtils.createTitle.bySplitters(run);
    title = title.split(",").filter( t => !(t.toLowerCase().includes(":no")||t.toLowerCase().includes(":false")) ).join(", "); //shorten, positive values only

    let testCase = {
        params:{}
    };
    // Copy the given and when parts to the scenario parameters.
    testCase.params = col.given;
    Object.keys(col.when).forEach( k => testCase.params[k]=col.when[k]);

    // setup rest of test case data
    testCase.expected = col.then;
    testCase.title = title;
    testCase.id = scriptFile.scriptNumber;

    scriptFile.append( JSON.stringify(testCase) );
}

/**
* Generate a single file Python scripts from the test model - this is a Javascript file
* That creates Python programs.
* This function is a onetime activated function, at the end of this script.
*
* @param {Array<Array<Event>>} The test suite, described using an array of event arrays (e.g. [ [event1, event2], [event1, event3]...)
* @param {ScriptBuilder} scriptFile A builder for the script file
*/
function singleFileEnd(runs, scriptFile) {
    scriptFile.append(`# Generated ${runs.length} scripts`);
    scriptFile.append("# Auto-generation done.");
}
