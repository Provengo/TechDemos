// @provengo summon constraints

bthread("must go out", function(){
    waitFor(Actions.wakeUp());
    Constraints.require(Actions.goOut()).eventually();
});

Constraints.limit(Actions.backToSleep(), 4).forever();