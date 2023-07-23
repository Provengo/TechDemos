/**
 * This is a basic linear morning process. Use as starting point for scenario elaboration.
 * Try the following:
 *  - Add all possible dress-up scenarios, by calling "requestAtAnyOrder()" rather than a series of calls to "request()"
 *  - Make some actions optional using "if ( maybe() )"
 *  - Use "select().from()" and "selectSome().from()" to vary the breakfast content
 * 
 * (*) See more commands at the bp-base language reference page:
 *       https://docs.provengo.tech/main/site/ProvengoCli/0.9.5/dsls/bp-base.html
 * 
 */

bthread("main", function () {
  request(Actions.wakeUp());
  
  // Dress up
  request(Actions.wear("pants"));
  request(Actions.wear("shirt"));
  request(Actions.wear("socks"));
  request(Actions.wear("shoes"));
  
  // Eat
  request(Actions.eat("cereal"));
  request(Actions.eat("banana"));
  request(Actions.eat("mango"));
  
  // Preparations
  request(Actions.brushTeeth());
  request(Actions.tidyUp());
  
  // Done!
  request(Actions.goOut());
});

