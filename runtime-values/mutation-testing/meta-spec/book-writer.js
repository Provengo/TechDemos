/*
 * Default implementation for creating a manual test book
 * when using the "provengo gen-book" command.
 */

let count=0;

function startTrace() {
    count=0;
}

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
        } else if (d.lib == "STATEORY") {
            TEST_SCENARIO.addElement(
                StepElement(event.name,
                `<em>${d.machineName}:</em> moving to <span style="color:#080">${event.name}</span>`, "" )
            );
        } else {
            try {
                if ( typeof d === "object" ) {
                   let text = "";
                    let lis = [];
                    for ( let k of Object.keys(d) ) {
                        let value;
                        try {
                            value = String(d[k]);
                        } catch (e) {
                            value = "(object " + e + ")";
                        }
                        lis.push(`<li><em>${k}:</em> &nbsp; ${value}</li>`);
                    }
                    text = "<ul>" + (lis.join("")) + "</ul>";
                    TEST_SCENARIO.addElement( StepElement(event.name, "Data Fields:", text ));
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

function endTrace() {
    TEST_SCENARIO.addMetadataLine("Event count: " + count);
}

// This object is the callback entry point.
const TEST_BOOK = {
    startTrace: startTrace,
    documentEvent: documentEvent,
    endTrace: endTrace
};
