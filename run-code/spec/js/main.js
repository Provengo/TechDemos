// @provengo summon selenium
// @provengo summon constraints
// @provengo summon ctrl


const session = new SeleniumSession("main-xyz");
const next = Event("(-)");

/**
 * Base flow: open a browser, decide what to check.
 */
bthread("main flow",function() {
    session.start(URL);
    if ( maybe("small screen?") ) {
        session.setWindowSize("400x850");
    }
    if ( maybe("Check cell validity") ){
        request(next);
    }
    select("table").from("correctTable", "incorrectTable");
    select("direction").from("rows","columns");
    request(next);
    // Ctrl.doPause("About to close.");
    // session.close();
    session.quit();
});
