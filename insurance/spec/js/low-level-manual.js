
/**
 * may or may not abort the process.
 * @returns true iff leaving, false if staying
 */
function maybeAbort() {
    if ( choose("Pre-Leave","Stay") == "Pre-Leave" ) {
        t1.act("Pre-Exit Screen", "Click another tab on the screen. A dialog box should appear.");
        if ( choose("Leave", "BackToScreen")=="Leave" ) {
            t1.act("Exit Screen","Approve leave");
            Constraints.block(highLevelFlow.anyStateChange).forever();
            request(ABORT_EVENT);
            return true;
        } else {
            t1.act("Return to screen", "Close popup.");
        }
    }
    return false;
}

// When a user aborts the process, the system should send a follow-up email.
on(ABORT_EVENT, function(){
    t1.validate("Check Email","A follow-up instruction email should be sent");
});

// At the choosePlaintiff stage, the user should choose a claim and see that all buttons work.
highLevelFlow.at("choosePlaintiffStage").run(function(){
    if ( maybeAbort() ) return;
    requestOne(
        t1.Action("Choose existing claim"),
        t1.Action("Choose new claim")
        );
        t1.validate("all buttons work");
    });
    
// At the addReceipt stage, the user should add receipts or choose existing ones.
highLevelFlow.at("addReceiptStage").run(function(){
    if ( maybeAbort() ) return;
    request([
        t1.Action("Add receipt"),
        t1.Action("Choose existing receipt")
    ]);
    t1.act("Add treatment on receipt");
    t1.validate("Check that only .jpg, .png file types work");
});

// at the userApproval stage, the user must accept the terms to proceed. Also, the user may abort.
highLevelFlow.at("userApprovalStage").run(function(){
    if ( maybeAbort() ) return;
    t1.validate("Mandatory Accept","User must accept term to proceed, try to proceed without and validate that you can't.");
});

// at the paymentDetails stage, the user can choose between a credit card and a bank transfer. Also, the user may abort.
highLevelFlow.at("paymentDetailsStage").run(function(){
    if ( maybeAbort() ) return;
    request([
        t1.Action("Pay: Credit Card"),
        t1.Action("Pay: Bank Transfer")
    ]);
});
