importPackage(Packages.testory.testbooks);
importPackage(Packages.java.util);


let count=0;

function startTrace() {
    count=0;
}

function documentEvent( event ) {
    const d = event.data;
    if ( d && d.lib == "COMBI" ) return; // Handled at the Java level
    if ( d.lib == "Instruct" ){
        TEST_SCENARIO.addElement(
            StepElement(event.name,
            `<em>${d.session}:</em> ${d.type}: ${d.text}`, (d.details ? d.details : "")  )
        );

    } else if (d.lib == "STATES") {
        TEST_SCENARIO.addElement(
            StepElement(event.name,
            `<em>${d.machineName}:</em> moving to <span style="color:#080">${event.name}</span>`, "" )
        );

    } else {
        TEST_SCENARIO.addElement( StepElement(event.name, event.toString(), "" ));
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
