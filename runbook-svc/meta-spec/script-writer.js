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
//   scriptFile.append(`Action, Type`);
  scriptFile.append(`Action, ObjectName, Type`);
}

/**
 * Generate Python scripts from the test model - this is a Javascript file
 * that creates Python programs.
 *
 * @param {Trace} run A test run, described using Trace object contains list of events
 * @param {ScriptBuilder} scriptFile A builder for the script file
 */
const automicSet = new Map();
function generateScript(run, scriptFile) {
  run.forEach((evt) => {
    if (evt.data) {
      if (typeof evt.data === "object") {
        if (evt.data.lib === "EventCategory") {
          if (evt.data.category === "automic") {
            if (!automicSet.has(evt.name)) {
              automicSet.set(evt.name, true);

            //   scriptFile.append(`${evt.name},${evt},PCK.AUTOMIC_${SAMPLE_PARAMS[evt.name]}.PUB.ACTION.${evt.name}`);
              scriptFile.append(`${evt.name},PCK.AUTOMIC_.PUB.ACTION.${evt.name}`);
            } else {
            }
          }
        }
      }
    }
  });
}

/**
 * Generate a single file Python scripts from the test model - this is a Javascript file
 * That creates Python programs.
 * This function is a onetime activated function, at the end of this script.
 *
 * @param {Array<Array<Event>>} The test suite, described using an array of event arrays (e.g. [ [event1, event2], [event1, event3]...)
 * @param {ScriptBuilder} scriptFile A builder for the script file
 */
function singleFileEnd(runs, scriptFile) {}
