
/**
 * Addition: if we chose to search for "strawberry",
 * don't test the failure scenario.
 */
bthread("Don't fail after strawberry", function(){
    waitFor(choiceEvent("strawberry"));
    block(choiceEvent("fail"));
});
