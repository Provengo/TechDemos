/**
 * Experimental library for listing manual actions
 */
const Manual = (function(){
    function makeValidation(session, msg, details) {
        let data = {lib:"Manual", type:"validation", session:session, text:msg};
        if ( details ) {
            data.details = details;
        }
        return bp.Event("Validate: "+msg, data);
    }
    
    function makeAction(session, msg, details){
        let data = {lib:"Manual", type:"Act", session:session, text:msg};
        if ( details ) {
            data.details = details;
        }
        return bp.Event("Do: "+msg, data);
    }
    
    function validate(session, msg, details){
        request(makeValidation(session, msg, details));
    }
    
    function act(session, msg, details) {
        request(makeAction(session, msg, details));
    }

    function makeSession(name) {
        return {
            doAct: function(m,d){ return  act(name, m,d); },
            doValidate: function(m,d){ return  validate(name, m,d); },
            actionEvent:  function(m,d){ return makeAction(name, m,d); },
            validationEvent:  function(m,d){ return makeValidation(name, m,d); }
        }
    }

    return {
        defineUser: makeSession
    }

})();
