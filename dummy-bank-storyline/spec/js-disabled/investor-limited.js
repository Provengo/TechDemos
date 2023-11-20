// Assert that there are no invest meetings at 09:30
bthread("Assert that there are no invest meetings at 09:30", function(){
    waitFor(choiceEvent("meet_invest"));
    waitFor(choiceEvent("09:30"));
    bp.ASSERT(false, "No investors in the afternoon");
});
