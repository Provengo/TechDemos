/*
 *  Simulates the Automic service. Generates responses when a request to Automic is made.
 */
if ( AUTOMATION_MODE !== AUTOMATION_MODES.MARK_ONLY) {
    bthread("Automic Simulator", function() {
        let evt = undefined;
        let params = undefined;
        while ( true ) {
            evt = waitFor(actions.any);
            params = Object.assign({}, evt.data);
            params.requestName = evt.name;

            // if ( evt.name === "PING_SUCCESS" ) {
            //     params.approved = maybe("Approved?");
            // }
            // if ( evt.name === "Receive approval" ) {
            //     params.approved = maybe("Approved?");
            // }
            
            // little hack to get different coloring for the responses.
            params.color = "#888800";
            params.category = "automic-response"
            params.lib = "EventCategory"
            
            request(Event(AUTOMIC_RESPONSE_EVENT_NAME,params))


            evt = undefined;
            params = undefined;
        }
    });
}