// @provengo summon selenium

{
  wakeUp;
  wearShirt;
  wearShoes;
  wearPants;
  wearSocks;
  eatBanana;
}

bthread("actuation layer", function () {
  block(Actions.any, function () {
    start();
  });
  while (true) {
    let selectedAction = waitFor(Actions.any);
    block(Actions.any, function () {
      if (selectedAction.contains(Actions.wakeUp())) {
        wakeUp();
      } else if (selectedAction.data.type === "wear") {
        if (selectedAction.data.name === "pants") {
          wearPants();
        } else if (selectedAction.data.name === "shirt") {
          wearShirt();
        } else if (selectedAction.data.name === "shoes") {
          wearShoes();
        } else if (selectedAction.data.name === "socks") {
          wearSocks();
        } else {
          session.writeText(COMPONENTS.TEXT_BOX.input, selectedAction.name);
          session.click(COMPONENTS.BUTTONS["btn-add"]);
          session.click(
            `//button[@id='btn-${selectedAction.data.type}-${selectedAction.data.name}']`
          );
          //validate
          session.assertText(
            COMPONENTS.TEXT_BOX.text,
            `Now I ${selectedAction.data.type} ${selectedAction.data.name}`
          );
        }
      } else if (selectedAction.data.type === "eat") {
        if (selectedAction.data.name === "banana") {
          eatBanana();
        } else if (selectedAction.data.name === "cereal") {
          eatCereal();
        } else {
          session.writeText(COMPONENTS.TEXT_BOX.input, selectedAction.name);
          session.click(COMPONENTS.BUTTONS["btn-add"]);
          session.click(
            `//button[@id='btn-${selectedAction.data.type}-${selectedAction.data.name}']`
          );
          //validate
          session.assertText(
            COMPONENTS.TEXT_BOX.text,
            `Now I ${selectedAction.data.type} ${selectedAction.data.name}`
          );
        }
      } else if (selectedAction.contains(Actions.brushTeeth())) {
        brushTeeth();
      } else if (selectedAction.contains(Actions.tidyUp())) {
        tidyUp();
      } else if (selectedAction.contains(Actions.goOut())) {
        goOut();
      } else if (selectedAction.contains(Actions.backToSleep())) {
        backToSleep();
      } else {
        session.writeText(COMPONENTS.TEXT_BOX.input, selectedAction.data.type);
        session.click(COMPONENTS.BUTTONS["btn-add"]);

        session.click(`//button[@id='btn-${selectedAction.data.type}']`);
        //validate
        session.assertText(
          COMPONENTS.TEXT_BOX.text,
          `Now I ${selectedAction.data.type}`
        );

        // bp.log.warn("unknown action " + selectedAction);
      }
    });
  }
});
