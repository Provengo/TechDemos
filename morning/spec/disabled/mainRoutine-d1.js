/**
 * This is a basic linear morning process. Use as starting point for scenario elaboration.
 */

bthread("main", function () {
  request(Actions.wakeUp());
  
  if (maybe("breakfast first")) {
    eat();
    dressUp();
  } else {
    dressUp();
    eat();
  }
  if ( maybe() ) {
    request(Actions.brushTeeth());
  }
  
  request(Actions.tidyUp());
  request(Actions.goOut());
});

function dressUp() {
  requestAtAnyOrder(
    Actions.wear("pants"),
    Actions.wear("shirt"),
    Actions.wear("socks"),
    Actions.wear("shoes")
   );
}

function eat() {
  let breakfastType = select("breakfast").from("healthy", "quick", "Israeli");
  
  switch ( breakfastType ) {
    case "healthy":
      request(Actions.eat("banana"));
      break;
    case "quick":
      request(Actions.eat("cereal"));
      break;
    case "Israeli":
      requestAtAnyOrder(
        Actions.eat("friedEgg"),
        Actions.eat("salad")
      );
      break;
  }
}