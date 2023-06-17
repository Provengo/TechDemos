// @provengo summon ctrl

bthread("shirt-then-socks", function(){
    waitFor(Actions.wear("shirt"));
    waitFor(Actions.wear("socks"));
    Ctrl.doMark("good test");
});

