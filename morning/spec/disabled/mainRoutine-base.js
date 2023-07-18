/**
 * This is a basic linear morning process. Use as starting point for scenario elaboration.
 */

bthread("main", function () {
  request(Actions.wakeUp());
  
  request(Actions.wear("pants"));
  request(Actions.wear("shirt"));
  request(Actions.wear("socks"));
  request(Actions.wear("shoes"));
  
  request(Actions.brushTeeth());
  request(Actions.eat("cereal"));
  request(Actions.eat("banana"));
  request(Actions.eat("mango"));
  
  request(Actions.tidyUp());
  request(Actions.goOut());
});

