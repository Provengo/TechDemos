/*
 *  This is a good place to put common test data, project-wide constants, etc.
 */


URL = "http://morning.provengo.tech/";

//  dev:
//  URL = "http://localhost:3000/";


// Components repository, holds XPaths for UI elements.
const COMPONENTS = {
  BUTTONS: {
    "btn-sleep": "//button[@id='btn-sleep']",
    "btn-shirt": "//button[@id='btn-shirt']",
    "btn-shoes": "//button[@id='btn-shoes']",
    "btn-pants": "//button[@id='btn-pants']",
    "btn-socks": "//button[@id='btn-socks']",
    "btn-banana": "//button[@id='btn-banana']",
    "btn-cereal": "//button[@id='btn-cereal']",
    "btn-brush-teeth": "//button[@id='btn-brush-teeth']",
    "btn-tidy-up": "//button[@id='btn-tidy-up']",
    "btn-go-out": "//button[@id='btn-go-out']",

    "btn-add": "//button[@id='btn-add']",

  },

  SVG_ELEMENTS: {
    svg: "//*[local-name()='svg']",
    eyes: "//*[@id='eyes']",
    eyeInnerRight: "//*[@id='eye-inner-right']",
    eyeInnerLeft: "//*[@id='eye-inner-left']",
    shirt: "//*[@id='top-shirt']",
    shoes: "//*[@id='shoes']",
    pants: "//*[@id='pants']",
    socks: "//*[@id='socks']",
    banana: "//*[@id='banana']",
    cereal: "//*[@id='cereal']",
    brush: "//*[@id='tooth-brush']",
    stars: "//*[@id='stars']",
    person: "//*[@id='layer1']",
  },

  //----------------------------------------------------------------//
  // test the new actions with the appearing text.
  TEXT_BOX: {
    text: "//*[@id='text-box']",
    input: "//*[@id='input']" ,

  },
};
