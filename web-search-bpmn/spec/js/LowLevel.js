// @provengo summon selenium
//
let URL = "https://ecosia.org";

/**
 * Component repository, holds XPaths for UI elements.
 */
const COMPONENTS = {
    searchField:    "//input[@name='q']",
    submitButton:   "//button[@type='submit']",
    resultsSection: "//section[@data-test-id='mainline']"
};

const searchFlowDiagram = Bpmn.diagram("HighLevelFlow");
let seleniumSession;


searchFlowDiagram.atStartEvent("start session").run(function(){
    // Define a Selenium session. No window is opened yet.
    seleniumSession = new SeleniumSession("user");
    // Go to search screen
    seleniumSession.start(URL);

});

searchFlowDiagram.atActivity("search").run(function(){
    // Wait up to 10 seconds for the target component to be visible.
    seleniumSession.waitForVisibility(COMPONENTS.searchField, 10000);

    // decide what we search for (this splits the scenario into 3 scenarios)
    let searchTerm = choose("pizza","banana","strawberry");
    bp.store.put("term", searchTerm);
    // Enter search term
    seleniumSession.writeText(COMPONENTS.searchField, searchTerm);
    // Search!
    seleniumSession.click(COMPONENTS.submitButton);

});

searchFlowDiagram.atActivity("validate").run(function(){
        // Wait for results for up to 10 seconds
        seleniumSession.waitForVisibility(COMPONENTS.resultsSection, 10000);
        // Assert that results were found
        seleniumSession.assertText( COMPONENTS.resultsSection,
            bp.store.get("term"),
            [TextAssertions.modifiers.IgnoreCase,
            TextAssertions.modifiers.Contains]
        );

        // Explicitly state that we won't use the search term anymore.
        bp.store.remove("term");

        // Intentionally fail the test 1 out of 4 runs.
        // Added to make the logs more interesting.
       if ( choose("ok","fine","pass","fail") === "fail" ) {
           seleniumSession.waitForVisibility("//notThere");
       }
});

searchFlowDiagram.doStart();

