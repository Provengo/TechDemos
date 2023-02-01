importPackage(Packages.testory.testbooks);
importPackage(Packages.java.util);


// names of events to ignore
const MUTED = HashSet();
MUTED.add("Pre-Leave");
MUTED.add("Choice: Stay");
MUTED.add("Choice: Leave");
MUTED.add("Choice: Pre-Leave");
MUTED.add("BackToScreen");
MUTED.add("EndOfAction");
MUTED.add("Done");

let count=0;
let hasAbort=false;

function startTrace() {
    hasAbort=false;
    count=0;
}

function documentEvent( event ) {
    const d = event.data;
    if ( d && d.lib == "COMBI" ) return; // Auto-handled by the Testory platform.

    if ( d ) {
        if ( d.lib == "Manual" ) {
            TEST_SCENARIO.addElement( StepElement(d.type, d.text, (d.details?d.details:"") ));
            count++;
        } else if ( d.lib == "bp-base" ) {
            TEST_SCENARIO.addElement( StepElement(d.type, d.value) );

        
        } else {
            if ( (!MUTED.contains(event.name)) && !d.highLevel ) {
                TEST_SCENARIO.addElement( StepElement(event.name, event.toString(), "" ));        
                count++;
            }
        }
        
    } else {
        if ( ! MUTED.contains(event.name) ) {
            TEST_SCENARIO.addElement( StepElement("Step", event.name, ""));
            count++;
        }
        if ( event.name == "Process Aborted" ) {
            hasAbort = true;
        }
    }

    if ( event.name == "digitalForm" && event.data && event.data.lib == "STATES" ) {
        TEST_SCENARIO.addMetadataLine("This test is for a case that can't be processed automatically");
    }

}

function endTrace() {
    TEST_SCENARIO.addMetadataLine("Event count: " + count);
    if ( hasAbort ) {
        TEST_SCENARIO.addMetadataLine("This test does not complete the process, it tests an aborted process.");
    }

}

// This object is the callback entry point.
const TEST_BOOK = {
    startTrace: startTrace,
    documentEvent: documentEvent,
    endTrace: endTrace
};

