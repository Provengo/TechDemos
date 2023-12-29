// @provengo summon ctrl
// @provengo summon rtv
// @provengo summon selenium


const browser = new SeleniumSession("main");

/**
 * Takes a result string, returns the number of results.
 * @param {String} str Google result string
 */
function cleanResultStr( str ) {
    let idx = 0;
    // consume str until we find a digit
    while ( !/[0-9]/.test(str[idx]) ) idx++;
    let start = idx;
    // consume str until we find a non-digit
    while ( /[0-9,]/.test(str[idx]) ) idx++;
    let end = idx;
    return str.substring(start, end).replace(/,/g, "");
}


bthread("main", function() {
    // open browser
    browser.start(SITE_UNDER_TEST);

    // broad search
    browser.writeText(COMPONENTS.homePage.searchBar, SEARCH_TERM);
    browser.writeText(COMPONENTS.homePage.searchBar, "\n");
    
    // sample data
    browser.waitForVisibility(COMPONENTS.resultPage.resultStats, 10000);
    browser.store(COMPONENTS.resultPage.resultStats, "resultStats1");
    
    // process data into a number
    rtv.run(function(values) {
        values.set("resultStats1", cleanResultStr(values.get("resultStats1")));
    });
    
    // narrow search
    browser.writeText(COMPONENTS.homePage.searchBar, SEARCH_TERM + " "
                             + choose(NARROWER_SEARCH_TERM), true);
    browser.writeText(COMPONENTS.homePage.searchBar, "\n");

    // sample data again
    browser.waitForVisibility(COMPONENTS.resultPage.resultStats, 10000);
    browser.store(COMPONENTS.resultPage.resultStats, "resultStats2");
    rtv.run(function(values) {
        values.set("resultStats2", cleanResultStr(values.get("resultStats2")));
    });
 
    // validate
    rtv.assertLt("@{resultStats2}", "@{resultStats1}");
    // Silly validation, but shows that we can do arbitrary JS expressions inside @{}s.
    rtv.assertLt("@{resultStats1-resultStats2}", "@{resultStats2+resultStats1}");
});