importPackage(Packages.testory.testbooks);
importPackage(Packages.java.util);

const STATE_TEXTS = {
    login: {
        title: "Go to the login screen",
        remark: "Enter name, password, and OTP."
    },
    updateEmail: {
        title: "Update Email Pop-up",
        remark: "Update email pop-up should be visible. Enter a new email and close it."
    }, 
    mainScreen: {
        title: "Personal Customer Area",
        remark: "Personal customer area should be visible."
    },
    claimSettlementTab: {
        title: "Go to Auto Clearance",
        remark: "Click the 'claim settlement tab' on the tab row."
    }, 
    chooseTopic: {
        title: "Choose claim topic",
        remark: "Choose a claim topic from the circles (see above table)."
    },
    choosePlaintiffStage: {
        title:"Choose Plaintiff",
        remark:"When a primary user with a policy of more than one insured person, make sure to see all people on the policy. In other cases, only a single person should be visible."
    },
    paymentDetailsStage: {
        title: "Payment Details",
        remark: "Enter payment details. Try illegal credit card numbers and expired dates."
    },
    userApprovalStage: {
        title: "User Approval",
        remark: "Check the details, see that the claim and payment info are correct."
    },
    claimSettledMessage: {
        title: "Claim Settled Message",
        remark: "The system should show a message that the claim was settled."
    },
    claimSubmittedMessage: {
        title: "Claim Submitted Messages",
        remark: "The system should show a message that the claim is submitted (but not settled yet!)."
    },
    validateOnSMART: {
        title: "Validate on SMART",
        remark: "On the SMART system, check that the claim was recorded."
    },
    validateOnGreen: {
        title: "Validate on the Green System",
        remark: "On the green system, validate that a payment instruction was issued."
    }, 
    digitalForm: {
        title: "Digital Claim Form",
        remark: "The client should be routed to a 'traditional' digital claim form."
    }

};

// names of events to ignore
const MUTED = HashSet();
MUTED.add("Pre-Leave");
MUTED.add("Stay");
MUTED.add("Leave");
MUTED.add("BackToScreen");

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
        if ( d.lib == "STATES" ) {
            let stateText = STATE_TEXTS[event.name];
            if ( ! stateText ) {
                stateText = {title: event.name, remark: event.toString() };
            }
            TEST_SCENARIO.addElement( StepElement("Stage", stateText.title, stateText.remark ));

        } else if ( d.lib == "Instruct" ) {
            TEST_SCENARIO.addElement( StepElement("Do", d.text, (d.details?d.details:"") ));

        } else {
            TEST_SCENARIO.addElement( StepElement(event.name, event.toString(), "" ));
        }
        count++;
        
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

