// @provengo summon selenium

const URL = "https://ecosia.org";

/**
 * Component repository, holds XPaths for UI elements.
 */
const COMPONENTS = {
    searchField:    "//input[@name='q']",
    submitButton:   "//button[@type='submit']",
    resultsSection: "//section[@data-test-id='mainline']",
    body:           "//body"
};

// Define a Selenium session. No window is opened yet.
const seleniumSession = new SeleniumSession("user");

bp.log.info("INFO MESSAGE");

/**
 * "Main" test scenario: Open a browser window, types a search term, and 
 * asserts that pages containing that term were found.
 */
bthread("basic search", function(){
    // Go to search screen
    seleniumSession.start(URL);

    // Wait up to 10 seconds for the target component to be visible.
    seleniumSession.waitForVisibility(COMPONENTS.searchField, 10000);

    // decide what we search for (this splits the scenario into 3 scenarios)
    let searchTerm = choose("pizza","banana","strawberry");

    // Enter search term
    seleniumSession.writeText(COMPONENTS.searchField, searchTerm);
    // Search!
    seleniumSession.click(COMPONENTS.submitButton);

    //// moving to the results screen
    // Wait for results for up to 10 seconds
    seleniumSession.waitForVisibility(COMPONENTS.resultsSection, 10000);
    // Assert that results were found
    seleniumSession.assertText( COMPONENTS.resultsSection,
        searchTerm,
        [TextAssertions.modifiers.IgnoreCase, 
        TextAssertions.modifiers.Contains]
    );
    
    // Explicitly state that we won't use the search term anymore.
    searchTerm = undefined;
    
    // Intentionally fail the test 1 out of 4 runs.
    // Added to make the logs more interesting.
    if ( choose("ok","fine","pass","fail") === "fail" ) {
        let failType = select("fail type").from(/*"visibility", "content", */"move");
        switch ( failType ) {
            case "visibility":
                seleniumSession.waitForVisibility("//notThere");
                break;
            case "content":
                seleniumSession.assertText( COMPONENTS.resultsSection,
                    "XXX-not-supposed-to-be-there-XXX",
                    [TextAssertions.modifiers.IgnoreCase, 
                    TextAssertions.modifiers.Contains]
                );
                break;
            case "move":
                seleniumSession.moveToElement("(//img[@alt=' Trail Jacket'])[last()]]]");
                break;
        }
    }

    // This will always succeed. It's here to show that after failure
    // actuations are skipped automatically.
    seleniumSession.waitForVisibility(COMPONENTS.body);

});

/**
 * Addition: if we chose to search for "strawberry",
 * don't test the failure scenario.
 */
bthread("Don't fail after strawberry", function(){
    waitFor(choiceEvent("strawberry"));
    block(choiceEvent("fail"));
});

