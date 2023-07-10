importPackage(Packages.testory.testbooks);
importPackage(Packages.testory.libraries.selenium.events);

function startTrace() {
    hasAbort=false;
    count=0;
}

function documentEvent( event ) {
    GenBook.autoTag(event); 
    
    const d = event.data;
    if ( d && d.lib == "COMBI" ) return; // Auto-handled by the Testory platform.

    if ( d ) {
        if ( d.lib == "bp-base" )  {
            if ( d.type === "choice" ) {
                TEST_SCENARIO.addElement( StepElement("Choice", `Choosing ${d.value}`, "") );
            }
            
            count++;
        }
    } else {
        if ( event instanceof SeleniumEvent ) {
            TEST_SCENARIO.addElement( StepElement("On Browser", event.name, event.xpath) );
        }
    }
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

