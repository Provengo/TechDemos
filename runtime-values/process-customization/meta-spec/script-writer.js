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

/**
* Generate a single file Python scripts from the test model - this is a Javascript file
* That creates Python programs.
* This function is a onetime activated function, at the start of this script.
*
* @param {Array<Trace>} The test suite, described using an array of Traces (e.g. [ Trace1, Trace2...]).
* Trace: contains list of events, it has 2 functions: getBEventList(): List<Event>(list of all events), getSize(): int(number of events)
* @param {ScriptBuilder} scriptFile A builder for the script file
*/
function singleFileStart(runs, scriptFile) {
   scriptFile.append("# Auto-generated python script file");
   scriptFile.append(`# Containing ${runs.length} scripts`);
}

/**
 * Generate Python scripts from the test model - this is a Javascript file 
 * that creates Python programs.
 *
 * @param {Trace} run A test run, described using Trace object contains list of events
 * @param {ScriptBuilder} scriptFile A builder for the script file
 */
 function generateScript(run, scriptFile) {
    scriptFile.append("# Auto-generated python script");
    scriptFile.append(`# script number ${scriptFile.scriptNumber}`);

    run.forEach(evt => {
        scriptFile.append(`print("${evt.name}")`);
        if ( evt.data ) {
            if ( typeof evt.data === "object" ) {
                for ( let k in evt.data ) {
                    scriptFile.append(`print("   ${k}:\t${evt.data[k]}")`);
                }
            } else {
                scriptFile.append(`print("   ${evt.data}")`);
            }
        }
    });


    scriptFile.append("");
    scriptFile.append(`print("Generated script completed")`);

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
