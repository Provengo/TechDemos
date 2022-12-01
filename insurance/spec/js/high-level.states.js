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
    .to("validateOnSMART")
    .to("validateOnGreen")
    ;

// RED/YELLOW routes never get to the approval screen, only to a "case submitted" one.
highLevelFlow.connect("userApprovalStage")
    .to("claimSubmittedMessage") // "Yellow"/"Red" paths
    .to("validateOnSMART") // "Yellow"/"Red" paths
    ;

// Non-ambulatory cases are routed to the "digital form"
highLevelFlow.connect("chooseTopic")
    .to("digitalForm")
;

// When an email update is required, show email update popup prior to enabling the main screen.
highLevelFlow.connect("login")
    .to("updateEmail")
    .to("mainScreen");
