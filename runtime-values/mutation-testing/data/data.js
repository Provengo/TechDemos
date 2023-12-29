/*
 *  This is a good place to put common test data, project-wide constants, etc.
 */

const SITE_UNDER_TEST = "https://www.google.com";

const SEARCH_TERM = "Weird Al Yankovic";
const NARROWER_SEARCH_TERM = ["Eat It", "Albuquerque", "Amish Paradise"];

/**
 * Locators for page components.
 */
const COMPONENTS = {
    homePage: {
        searchBar: '//textarea[@name="q"]',
    },
    resultPage: {
        resultStats: '//*[@id="result-stats"]',
        searchBar: '//textarea[@name="q"]'
    }
};

