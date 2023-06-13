/**
 * Generate Python scripts from the test model - this is a Javascript file 
 * that creates Python programs.
 *
 * @param {Array<Event>} run A test run, described using n array of events
 * @param {ScriptBuilder} scriptFile A builder for the script file
 */
 function generateScript(run, scriptFile) {
    scriptFile.prepend("# Auto-generated python script");
    scriptFile.append(`# script number ${scriptFile.scriptNumber}`);
    
    let isFirst = true;
    run.forEach(evt => {
        const d = evt.data;
        if ( d ) {
            if ( d.lib == "bp-base" )  {
                if ( d.type === "choice" ) {
                    if ( isFirst ) {
                        isFirst = false;
                        scriptFile.append(`searchTerm = "${d.value}"`);
                    } else {
                        if ( d.value === "fail" ) {
                            scriptFile.append("// next line is about to fail");
                        }
                    }
                }
            }
        } else {
            if ( evt instanceof SeleniumEvent ) {
                scriptFile.append("print(\"" + evt.toString() + "\")");
            }
        }
    });

    scriptFile.append("");
    scriptFile.append(`print("Generated script searching for " + searchTerm + " completed")`);

}
