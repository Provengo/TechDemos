const GVN = (function(){
    const LIB_NAME="Given";
    const DEFAULT_PRV="__DEFAULT_PRV__";

    /*******************************************************
     * Events and EventSets
     ******************************************************/

    const ALL_EVENTS = EventSet("Given-allEvents", function(e){
        return (!!e.data) && (e.data.lib==LIB_NAME);
    });

    function isPrerequisiteProvidedEvent(anEvent) {
        return ALL_EVENTS.contains(anEvent) &&
            anEvent.data.type === "give";
    }

    function e(preReqName, evtType){
        let c = (evtType==="take" ? ">" : (evtType==="give"?"+":""));
        return Event(`(${c}${preReqName})`, {
            lib: LIB_NAME,
            type: evtType,
            preRequisite: preReqName
        });
    }

    function makeTake(preReq, provider) {
        let evt = e(preReq, "take");
        evt.data.provider = provider;
        return evt;
    }

    function anyTake( preReqName ) {
        return EventSet(`anyTake-${preReqName}`, function(e){
            return ALL_EVENTS.contains(e) && e.data.preRequisite === preReqName && e.data.type === "take";
        });
    }

    function makeGive( preReq, provider ) {
        let evt = e(preReq, "give");
        evt.data.provider = provider;
        return evt;
    }

    function makeWasGiven( preReq ) {
        return EventSet("Was Given: " + preReq, function(e){
            return ALL_EVENTS.contains(e) && e.data.type==="give" && e.data.preRequisite ===preReq;
        });
    }

    /*******************************************************
     * Given storage
     ******************************************************/
    function storeKey(preReq) {
        return `${LIB_NAME}::${preReq}`;
    }
    function storeGiven(preReq) {
        bp.store.put(storeKey(preReq), true);
    }
    function wasGiven(preReq){
        return !!bp.store.get(storeKey(preReq));
    }


    /*******************************************************
     * DSL-like calls
     ******************************************************/

    /**
     * Wait until all the declared pre-requisites are provided by some provider. Also, creates a default provider.
     * If all pre-requisites were already provided, returns immediately.
     * 
     * @param {String* or String[]} preReq Name of pre-requisite we want to happen
     * @returns nothing
     */
    function given( preReqArrArgs ){
        let arr = __INTERNAL_HELPERS.captureArgs(arguments);
        let stillNeeded = arr.filter( pr => ! wasGiven(pr) );

        if ( stillNeeded.length === 0 ) return; //circuit breaker: all required pre-reqs have been provided

        stillNeeded.forEach( preReq => prepareMiranda(preReq));
        waitForAll(stillNeeded.map(preReq=>makeWasGiven(preReq)));
    }
    

    function provider( providerName ) { 
        return {
            gives: function(preReqName, providerFn ){
                if ( wasGiven(preReqName) ) return;
                bthread(`giver-${providerName}`, function(){
                    let take = sync({
                        request: makeTake(preReqName, providerName),
                        block:   makeGive(preReqName, DEFAULT_PRV), //makeTake(preReqName, DEFAULT_PRV),
                        waitFor: anyTake(preReqName) 
                    });
                    if ( take.data.provider === providerName ) {
                        if ( providerFn() ) {
                            storeGiven(preReqName);     // storing before, change will be published next sync
                            request(makeGive(preReqName, providerName)); // ta-da! next sync
                        }
                    }
                });
            }
        };
    }
    
    function prepareMiranda( preReqName ) {
        bthread(`__default__-${preReqName}`, function(){
            let take = sync({
                request: makeGive(preReqName, DEFAULT_PRV), //makeTake(preReqName, DEFAULT_PRV),
                waitFor: anyTake(preReqName) 
            });
            if ( take.data.provider === DEFAULT_PRV) {
                storeGiven(preReqName);
                // request( makeGive(preReqName, DEFAULT_PRV));
            }
        });
    }

    return {
        given: given,
        provider: provider,
        isPrerequisiteProvidedEvent:isPrerequisiteProvidedEvent,
        allEvents: ALL_EVENTS
    };
})();