/** 
 * Can't wear shoes until we wore socks
 * Rainy Day
 * This file should be used together with socksAndShoes-assume.js, to prevent
 * generation of a test case where socks are worn after shoes.
 */
bthread("fail shoes until socks", function(){
    waitFor( Actions.wakeUp() );
    sync({
        waitFor: Actions.wear("socks"), 
        request: Actions.fail("shoes") // Fail wearing shoes
    });
});

bthread("no socks after shoes", function(){
    waitFor(Actions.wear("shoes"));
    if ( maybe("test socks") ) {
        request(Actions.fail("socks"));
    }
});
