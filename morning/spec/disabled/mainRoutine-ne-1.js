/**
 * This is a basic linear morning process. Use as starting point for scenario elaboration.
 */

bthread("main", function () {
  request(Actions.wakeUp());
  
  // if ( maybe("tired") ) {
  //   while( maybe("sleep") ) {
  //     request(Actions.backToSleep());
  //   }
  // }

  if ( maybe("dress first") ) {
    dressUp();
    eat();
  } else {
     eat();
     dressUp();
  }
  
  request(Actions.brushTeeth());
  
  request(Actions.tidyUp());
  request(Actions.goOut());
});


function dressUp() {
  let toWear = [Actions.wear("pants"),
  Actions.wear("shirt"),
  Actions.wear("socks"),
  Actions.wear("shoes")];

  requestAtAnyOrder(toWear);
}

function eat() {
  let breakfastType = select("breakfastType").from("healthy", "quick", "basic");

switch (breakfastType) {
  case "healthy":
    request(Actions.eat("cucumber-kale-salad"));
    request(Actions.eat("banana"));
    break;
  case "quick":
    request(Actions.eat("banana"));
    request(Actions.eat("cereal"));
    break;
  case "basic":
    requestAtAnyOrder(
      Actions.eat("egg"),
      Actions.eat("salad"),
      Actions.eat("cheese")
    );
    break;
}
}