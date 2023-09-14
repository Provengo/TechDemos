bthread("main", function () {
  request(Actions.wakeUp());

  requestAtAnyOrder(
    Actions.wear("pants"),
    Actions.wear("shirt"),
    Actions.wear("socks"),
    Actions.wear("shoes"));

  request(Actions.brushTeeth());

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

  request(Actions.tidyUp());
  request(Actions.goOut());
});

