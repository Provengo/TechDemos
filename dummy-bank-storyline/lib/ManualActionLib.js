/**
 * Experimental library for listing manual actions. Usages:
 * 
 * const session = Manual.makeSession()
 * 
 * session.doAct("enter ID num", "num must be valid")
 * session.doAct("enter ID num", {
 *      note: "num must be valid",
 *      expected: "label becomes green"
 * });
 * 
 * waitFor( session.anyEvent );
 */
const Manual = (function(){

    const LIBRARY_SIG = "Manual";

    const ALL_EVENTS = EventSet("ManualEvents", function(e){
        if ( ! e ) return false;
        if ( isEvent(e) ) {
            let d = e.data;
            return d ? d.lib === LIBRARY_SIG : false;
        } else {
            return false;
        }
    });

    function makeValidation(session, msg, details) {
        let data = {lib:LIBRARY_SIG, type:"validation", session:session, text:msg};
        if ( details ) {
            data.details = details;
        }
        return Event("Validate: "+msg, data);
    }
    
    function makeAction(session, msg, details){
        let data = {lib:"Manual", type:"action", session:session, text:msg};
        if ( details ) {
            data.details = details;
        }
        return Event("Do: "+msg, data);
    }
    
    function validate(session, msg, details){
        request(makeValidation(session, msg, details));
    }
    
    function act(session, msg, details) {
        request(makeAction(session, msg, details));
    }

    function makeSession(name) {
        return {
            doAct: function(m,d){ return act(name, m,d); },
            doValidate: function(m,d){ return  validate(name, m,d); },
            actionEvent:  function(m,d){ return makeAction(name, m,d); },
            validationEvent:  function(m,d){ return makeValidation(name, m,d); },
            anyEvent: EventSet(name+": AnyEvent", function(e){
                if ( ! e ) return false;
                if ( ! (typeof e.data !== "object") ) return false;
                return (e.data.lib === LIBRARY_SIG  && e.data.session===name);
            })
        };
    }

    return {
        defineUser: makeSession,
        SIG: LIBRARY_SIG,
        allEvents: ALL_EVENTS
    };
})();
