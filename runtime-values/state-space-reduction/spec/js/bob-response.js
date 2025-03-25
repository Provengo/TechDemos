// @provengo summon ctrl

/**
 * When Bob is selected, greet him with a "Hi!" after the regular process is done.
 */

const bobSelected = EventSet("Bob selected", function(e){
    return e?.data?.lib == "bp-base" &&
            e?.data?.type == "choice" &&
            e.data.value.name == "Bob";
})

bthread("respond to bob", function(){
    waitFor( bobSelected );
    waitFor( MAIN_FLOW_DONE );
    request(Event("Hi, Bob!"));
});