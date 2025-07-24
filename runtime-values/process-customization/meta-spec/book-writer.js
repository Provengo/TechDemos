/*
 * Default implementation for creating a manual test book
 * when using the "provengo gen-book" command.
 */

let count=0;

/**
 * Called at the beginning of each scenario. Use to reset variables and perform
 * any other per-scenario preparations.
 */
function startTrace() {
    count=0;
}

/**
 * Called for each event in the scenario. Adds test book steps based on the
 * passed event.
 * @param {Event} A Provengo model event, part of the test scenario being translated.
 */
function documentEvent( event ) {

    GenBook.autoTag(event); // generate tags based on Combi and Choice events.

    const d = event.data;
    if ( d ) {
        if ( d.lib === "Ctrl" ) {
            if ( d.verb === "marker" ) {
                TEST_SCENARIO.addElement(
                    StepElement(`<strong>${d.value}</strong>`,
                        `<div style="background-color:yellow; color:black">Mark: ${d.value}</div>`, "" ));
            } else {
                TEST_SCENARIO.addElement(
                    StepElement(`<strong>${d.verb}</strong>`, d.value, "" ));
            }
        } else if (d.lib == "StateMachines") {
            TEST_SCENARIO.addElement(
                StepElement(event.name,
                `<em>${d.machineName}:</em> moving to <span style="color:#080">${event.name}</span>`, "" )
            );
        } else {
            try {
                if ( typeof d === "object" ) {
                    TEST_SCENARIO.addElement( StepElement(event.name, "Details:", valueToHtml(d) ));
                } else {
                    TEST_SCENARIO.addElement( StepElement(event.name, event.data.toString(), "" ));
                }
            } catch (e) {
                TEST_SCENARIO.addElement( StepElement("ERROR", e, "" ));
            }
        }
        
    } else {
        TEST_SCENARIO.addElement( StepElement("Step", event.name, event.toString() ));
    }
    count++;
}

/**
 * Called after each scenario. Use this function to add summary data to the test scenario.
 */
function endTrace() {
    TEST_SCENARIO.addMetadataLine("Event count: " + count);
}

/**
 * Utility function for representing JavaScript values in HTML.
 * @param {*} aValue The value to be represented.
 * @returns A HTML view of `aValue`.
 */
function valueToHtml(aValue) {
    try {
        let objType = (typeof aValue);
        switch (objType ){
            case "undefined":
                return "undefined";

            case "object":
                if ( Array.isArray(aValue) ) {
                    let items = [];
                    for ( let idx in aValue ) {
                        items.push(`<li>${valueToHtml(aValue[idx])}</li>`);
                    }
                    return "<ol>" + items.join("") + "</ol>";
                    
                } else {
                    let lis = [];
                    for ( let k of Object.keys(aValue) ) {
                        let aSubValue = aValue[k];
                        let htmlValue = valueToHtml(aSubValue);
                        
                        lis.push(`<dt>${k}</dt><dd>${htmlValue}</dd>`);
                    }
                    return "<dl>" + (lis.join("")) + "</dl>";
                }

            default:
                return String(aValue);
        }
    } catch (e) {
        return JSON.stringify(aValue) + "<br><div style='font-size: 9pt; color:#ff8888; font-family:monospace'>(html generation error: " + e + ")</div>";
    }
}

/**
 * This object is the book generation entry point. It refers to relevant functions for
 * generating various parts of the test book.
 */
const TEST_BOOK = {
    startTrace: startTrace,
    documentEvent: documentEvent,
    endTrace: endTrace
};
