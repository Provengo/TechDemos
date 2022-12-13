/*
High-level flow between screens
*/

const highLevelFlow = StateMachine("high-level", false);

// Happy flow
highLevelFlow.connect("login")
    .to("mainScreen")
    .to("claimSettlementTab")
    .to("chooseTopic")
    .to("choosePlaintiffStage") 
    .to("addReceiptStage") 
    .to("paymentDetailsStage")
    .to("userApprovalStage") 
    .to("claimSettledMessage")
    .to("validateOnInternalSystemA")
    .to("validateOnInternalSystemB")
    ;

// Reject/Manual Acceptance routes never get to the approval screen, only to a "case submitted" one.
highLevelFlow.connect("userApprovalStage")
    .to("claimSubmittedMessage") 
    .to("validateOnInternalSystemA") 
    ;

// Add a route for excluded topics to go to the manual claim process.
highLevelFlow.connect("chooseTopic")
    .to("manualClaimProcess")
;

// When the claimant needs to update their contact details, show an update popup prior to enabling the main screen.
highLevelFlow.connect("login")
    .to("updateContactDetails")
    .to("mainScreen");
