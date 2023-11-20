// Assert that there are no cashier meetings at the 'Ashdod' branch
bthread("Assert that there are no cashier meetings at the 'Ashdod' branch", function(){
    waitFor(choiceEvent("meet_cashier"));
    waitFor(choiceEvent("Ashdod"));
    bp.ASSERT(false, "No cashier meetings at the 'Ashdod' branch");
});