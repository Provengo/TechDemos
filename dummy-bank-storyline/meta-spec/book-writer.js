importPackage(Packages.testory.testbooks);
importPackage(Packages.java.util);


let count=0;

function startTrace() {
    count=0;
}

function documentEvent( event ) {
    const d = event.data;
    if ( d ) {
        if ( d.lib == "COMBI" ) return; // Handled at the Java level
        if ( Manual.allEvents.contains(event) ){
            TEST_SCENARIO.addElement(
                StepElement(
                    event.name,
                    `<em>${d.session}:</em> ${d.type}: ${d.text}`,
                    (d.details ? d.details : "") 
                ));
        } else if ( d.lib === "Ctrl" ) {
            if ( d.verb === "marker" ) {
                TEST_SCENARIO.addElement(
                    StepElement(`<strong>${d.value}</strong>`,
                        `<div style="background-color:yellow">Mark: ${d.value}</div>`, "" ));
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
        }
        
    } else {
        if ( event instanceof SeleniumEvent ) {
            TEST_SCENARIO.addElement( StepElement(event.name.split(" ")[0], event.xpath, event.toString() ));

        } else {
            TEST_SCENARIO.addElement( StepElement("Step", event.name, event.toString() ));
        }
    }
    count++;
}

function endTrace() {
    TEST_SCENARIO.addMetadataLine("Event count: " + count);
}

// This object is the test book generation entry point.
const TEST_BOOK = {
    startTrace: startTrace,
    documentEvent: documentEvent,
    endTrace: endTrace
};
