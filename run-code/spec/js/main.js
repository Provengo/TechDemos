// @provengo summon selenium
// @provengo summon constraints
// @provengo summon ctrl


const session = new SeleniumSession("main");
const next = Event("(-)");

/**
 * Base flow: open a browser, decide what to check.
 */
bthread("main flow",function() {
    session.start(URL);
    if ( maybe("Check cell validity") ){
        request(next);
    }
    select("table").from("correctTable", "incorrectTable");
    select("direction").from("rows","columns");
    request(next);
    session.close();
});
