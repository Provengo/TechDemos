// @provengo summon ctrl

/**
 * When Bob is selected, greet him with a "Hi!" after the regular process is done.
 * 
 */
bthread("respond to bob", function(){
    waitFor( choiceEvent(PEOPLE[1]) );
    waitFor( MAIN_FLOW_DONE );
    request(Event("Hi, Bob!"));
});