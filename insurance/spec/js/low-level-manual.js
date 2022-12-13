
/**
 * may or may not leave the process.
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

on(ABORT_EVENT, function(){
    t1.validate("Check Email","A continuation instruction email should be sent");
});

highLevelFlow.whileAt("choosePlaintiffStage", function(){
    if ( maybeAbort() ) return;
    requestOne(
        t1.Action("Choose existing claim"),
        t1.Action("Choose new claim")
    );
    t1.validate("all buttons work");
});

highLevelFlow.whileAt("addReceiptStage", function(){
    if ( maybeAbort() ) return;
    request([
        t1.Action("Add receipt"),
        t1.Action("Choose existing receipt")
    ]);
    t1.act("Add treatment on receipt");
    t1.validate("Check that only .jpg, .png file types work");
});

highLevelFlow.whileAt("userApprovalStage", function(){
    if ( maybeAbort() ) return;
    t1.validate("Mandatory Accept","User must accept term to proceed, try to proceed without and validate that you can't.");
});

highLevelFlow.whileAt("paymentDetailsStage", function(){
    if ( maybeAbort() ) return;
    request([
        t1.Action("Pay: Credit Card"),
        t1.Action("Pay: Bank Transfer")
    ]);
});
