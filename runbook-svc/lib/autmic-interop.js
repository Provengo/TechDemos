const AUTOMIC_RESPONSES = EventSet("Automic responses", function(e){
    return e.name == AUTOMIC_RESPONSE_EVENT_NAME;
});

function automicResponse(requestName) {
    return EventSet(`ar-${requestName}`, function(evt){
        return (evt.name == AUTOMIC_RESPONSE_EVENT_NAME) &&
                (typeof evt.data != "undefined") && 
                ( evt.data.requestName == requestName );
    });
}

/**
 * Perform an action with Automic.
 * @param {string} name Event Name
 * @param {object} params event parameters
 * @returns Event the response from Automic or the Automic simulator
 */
function withAutomic(name, params) {
    switch (AUTOMATION_MODE) {
        case AUTOMATION_MODES.FULL:
            actions.do(name, params);
            return waitFor(automicResponse(name));
        case AUTOMATION_MODES.MARK_ONLY:
            return actions.do(name, params);
    }
}