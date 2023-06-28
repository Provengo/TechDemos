// @provengo summon selenium

const session = new SeleniumSession("session");
function start() {
  session.start(URL);
  session.waitForVisibility(COMPONENTS.SVG_ELEMENTS.svg, 5000);
}
function wakeUp() {
  session.click(COMPONENTS.BUTTONS["btn-sleep"]);
  session.waitForVisibility(COMPONENTS.SVG_ELEMENTS.eyeInnerLeft, 5000);
  session.waitForVisibility(COMPONENTS.SVG_ELEMENTS.eyeInnerRight, 5000);
}

function wearShirt() {
  session.click(COMPONENTS.BUTTONS["btn-shirt"]);
  session.waitForVisibility(COMPONENTS.SVG_ELEMENTS.shirt, 5000);
}
function wearShoes() {
  session.click(COMPONENTS.BUTTONS["btn-shoes"]);
  session.waitForVisibility(COMPONENTS.SVG_ELEMENTS.shoes, 5000);
}
function wearPants() {
  session.click(COMPONENTS.BUTTONS["btn-pants"]);
  session.waitForVisibility(COMPONENTS.SVG_ELEMENTS.pants, 5000);
}
function wearSocks() {
  session.click(COMPONENTS.BUTTONS["btn-socks"]);
  session.waitForVisibility(COMPONENTS.SVG_ELEMENTS.socks, 5000);
}
function eatBanana() {
  session.click(COMPONENTS.BUTTONS["btn-banana"]);
  session.waitForVisibility(COMPONENTS.SVG_ELEMENTS.banana, 2000);
  session.waitForInvisibility(COMPONENTS.SVG_ELEMENTS.banana, 10000);
}
function eatCereal() {
  session.click(COMPONENTS.BUTTONS["btn-cereal"]);
  session.waitForVisibility(COMPONENTS.SVG_ELEMENTS.cereal, 2000);
  session.waitForInvisibility(COMPONENTS.SVG_ELEMENTS.cereal, 10000);
}
function brushTeeth() {
  session.click(COMPONENTS.BUTTONS["btn-brush-teeth"]);
  session.waitForVisibility(COMPONENTS.SVG_ELEMENTS.brush, 2000);
  session.waitForInvisibility(COMPONENTS.SVG_ELEMENTS.brush, 10000);
}
function tidyUp() {
  session.click(COMPONENTS.BUTTONS["btn-tidy-up"]);
  session.waitForVisibility(COMPONENTS.SVG_ELEMENTS.stars, 2000);
  // session.waitForInvisibility(COMPONENTS.SVG_ELEMENTS.stars,10000);
}

function goOut() {
  session.click(COMPONENTS.BUTTONS["btn-go-out"]);
  session.waitForInvisibility(COMPONENTS.SVG_ELEMENTS.person, 10000);
}

function backToSleep() {
  session.click(COMPONENTS.BUTTONS["btn-go-out"]);
  session.waitForInvisibility(COMPONENTS.SVG_ELEMENTS.eyeInnerLeft, 2000);
  session.waitForInvisibility(COMPONENTS.SVG_ELEMENTS.eyeInnerRight, 2000);
}

function play() {
  session.click(COMPONENTS.BUTTONS["btn-play"]);
  session.assertText(COMPONENTS.TEXT_BOX.text,"Now I play");
}

function wearScarf() {
  session.click(COMPONENTS.BUTTONS["btn-wear-scarf"]);
  session.assertText(COMPONENTS.TEXT_BOX.text,"Now I wear scarf");
}


