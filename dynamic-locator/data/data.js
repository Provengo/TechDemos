/*
 *   ___________________________
 * < Test data go in this file >
 *  ---------------------------
 *         \   ^__^
 *          \  (oo)\_______
 *             (__)\       )\/\
 *                 ||----w |
 *                 ||     ||
 */

// const URL = "http://localhost:8080";
const URL = "https://content.provengo.tech/test-targets/dynamic-locators/";

const ITEMS = ["Hello", "dynamic", "world"];

/**
 * Page elements. We're using CSS locators and IDs here. XPath would be another option.
 */
const EMTS = {
    field:  "css::#itemInput",
    submit: "css::#btnSubmit",
    list:   "css::#itemsList"
};


