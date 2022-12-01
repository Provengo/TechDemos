// @provengo summon constraints

bthread("gen->states", function(){
    waitFor( rec.doneEvent );
    highLevelFlow.doStart();
});

bthread("emailUpdateYes", function(){
    interrupt(isMailUpdateRequired.doneEvent, function(){
        waitFor(isMailUpdateRequired.setToEvent("Yes"));
        Constraints.block(highLevelFlow.enters("mainScreen"))
                    .until(highLevelFlow.enters("updateEmail"));
    });
});

bthread("emailUpdateNo", function(){
    interrupt(isMailUpdateRequired.doneEvent, function(){
        waitFor(isMailUpdateRequired.setToEvent("No"));
        Constraints.block(highLevelFlow.enters("updateEmail"))
                    .until(highLevelFlow.enters("mainScreen"));
    });
});

const esNonAmb = bp.EventSet("NonAmbTopics", function(e){
    return (e.data.lib == "COMBI") &&
            (e.data.combi == "case" ) &&
            (e.data.field == claimTopic.name ) &&
            ( nonAmbulatoryTopics.indexOf(e.data.value) > -1 );
});
const esAmb = bp.EventSet("AmbTopics", function(e){
    return (e.data.lib == "COMBI") &&
            (e.data.combi == "case" ) &&
            (e.data.field == claimTopic.name ) &&
            ( ambulatoryTopics.indexOf(e.data.value) > -1 );
});

bthread("non-amb-router", function(){
    interrupt(claimTopic.doneEvent, function(){
        waitFor(esNonAmb);
        Constraints.block(highLevelFlow.enters("choosePlaintiffStage")).forever();
    });
});
bthread("amb-router", function(){
    interrupt(claimTopic.doneEvent, function(){
        waitFor(esAmb);
        Constraints.block(highLevelFlow.enters("digitalForm")).forever();
    });
});

