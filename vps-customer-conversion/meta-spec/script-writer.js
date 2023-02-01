/**
 * Entry point for script generation.
 * @param {Array<Event>} run A single scenario, described using an array of events
 * @param {ScriptBuilder} scriptFile A builder for the script file
 */
function generateScript(run, scriptFile) {

    let counter = 1;
    for ( let evt of run ) {
        scriptFile.append(`${counter}: ${evt.name}`);
        if ( evt.data ) {
            scriptFile.append(`\t${JSON.stringify(evt.data)}`);
        }
        counter++;
    }
}