// @provengo summon combies
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
  requestAtAnyOrder(
    Actions.wear("pants"),
    Actions.wear("shirt"),
    Actions.wear("socks"),
    Actions.wear("shoes"));
  
  // Eat
  let breakfast = Combies.get("Breakfast");
  breakfast.doStart();
  waitFor( breakfast.doneEvent);
  
  // Preparations
  request(Actions.brushTeeth());
  
  if ( maybe("have time") ) {
    request(Actions.tidyUp());
  }
  
  // Done!
  request(Actions.goOut());
});




// bthread("combi->eat", function(){
//   let breakfast = Combies.get("Breakfast");
//   let e = null;
//   interrupt( breakfast.doneEvent, function(){
//     while( true ) {
//       e = waitFor(breakfast.anyFieldSetEvent);
//       if ( e.data.value !== "none" ) {
//         sync({
//           block: breakfast.anyEvent,
//           request: Actions.eat(e.data.value)
//         });
//       }
//     }
//   });
// });