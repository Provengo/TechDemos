const py = Manual.defineUser("python");

/**
 * may or may not leave the process.
 * @returns true iff leaving, false if staying
 */
function maybeAbort() {
    if ( choose("Pre-Leave","Stay") == "Pre-Leave" ) {
        py.act("Pre-Exit Screen", "Click another tab on the screen. A dialog box should appear.");
        if ( choose("Leave", "BackToScreen")=="Leave" ) {
            py.act("Exit Screen","Approve leave");
            Constraints.block(highLevelFlow.anyStateChange).forever();
            request(ABORT_EVENT);
            return true;
        } else {
            py.act("Return to screen", "Close popup.");
        }
    }
    return false;
}

on(ABORT_EVENT, function(){
    py.validate("Check Email","A continuation instruction email should be sent");
});

highLevelFlow.whileAt("choosePlaintiffStage", function(){
    if ( maybeAbort() ) return;
    requestOne(
        py.Action("Choose existing claim"),
        py.Action("Choose new claim")
    );
    py.validate("all buttons work");
});

highLevelFlow.whileAt("addReceiptStage", function(){
    if ( maybeAbort() ) return;
    requestOne(
        py.Action("Add receipt"),
        py.Action("Choose existing receipt")
    );
    py.act("Add treatment on receipt");
    py.validate("Check that only .jpg, .png file types work");
});

highLevelFlow.whileAt("userApprovalStage", function(){
    if ( maybeAbort() ) return;
    py.validate("Mandatory Accept","User must accept term to proceed, try to proceed without and validate that you can't.");
});

highLevelFlow.whileAt("paymentDetailsStage", function(){
    if ( maybeAbort() ) return;
    requestOne(
        py.Action("Pay: Credit Card"),
        py.Action("Pay: Bank Transfer")
    );
});
