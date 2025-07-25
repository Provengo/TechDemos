/**
 * Adds title and tags to a scenario.
 * 
 * This is an implementation starting point, which calls default
 * methods in the ScenarioUtils object. Change this as your project requires.
 * 
 * See https://docs.provengo.tech/ProvengoCli/0.9.5/dsls/scenario-objects.html for more info.
 * 
 * @param {Scenario} aScenario The scenario to be named and tagged.
 */
function addMetadata( aScenario ) {
    ScenarioUtils.autoTitle(aScenario);
    ScenarioUtils.autoTag(aScenario);
}
