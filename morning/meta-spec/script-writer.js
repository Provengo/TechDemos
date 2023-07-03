
function singleFileStart(runs, scriptFile) {
    scriptFile.append("package org.morningroutine.automation;");
    scriptFile.append("import static org.junit.jupiter.api.Assertions.*;");

    scriptFile.append("");
    scriptFile.append("");
    scriptFile.append("");
    scriptFile.append("/**");
    scriptFile.append(" * JUnit test file for the morning routing, ");
    scriptFile.append(" * auto-generated using Provengo. ");
    scriptFile.append(" * " + "Generated: " + (new Date()).toString() );
    scriptFile.append(" */ ");
    scriptFile.append("public class MorningTests {");
}


function generateScript(run, scriptFile) {
    scriptFile.append("    @Test");
    scriptFile.append(`    void test${scriptFile.scriptNumber}(){`);
    scriptFile.append("         testStarterParams(1,2,\"Android\")");
    Array.from(run).filter(e => Actions.any.contains(e))
        .forEach(event => {
            scriptFile.append(`            .${event.data.type}("${event.data.name}")`)
        });
    scriptFile.append("        ;");
    scriptFile.append("    }");
    scriptFile.append("    ");
}

function singleFileEnd(runs, scriptFile) {
    scriptFile.append("");
    scriptFile.append("}");
    scriptFile.append("// auto-generated using Provengo");
    scriptFile.append("");
}

/**
 * Generate Python scripts from the test model - this is a Javascript file 
 * that creates Python programs.
 *
 * @param {Array<Event>} run A test run, described using n array of events
 * @param {ScriptBuilder} scriptFile A builder for the script file
 */
function generatePythonScript(run, scriptFile) {
    scriptFile.prepend("# Auto-generated python script");
    scriptFile.append(`# script number ${scriptFile.scriptNumber}`);

    run.forEach(evt => {
        scriptFile.append(`print("${evt.name}")`);
        if (evt.data) {
            if (typeof evt.data === "object") {
                for (let k in evt.data) {
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
