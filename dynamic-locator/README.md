# Dynamic Locator Example

---
2025-05-19 16:00:09
michael

Testing a page with dynamic locators. The basic challenge (raised in an internal WhatsApp discussion) was
"how can someone test a page which creates dynamic locators for specific elements". So here's an example.

## Main Things to Notice

* The target testing site is available here https://content.provengo.tech/test-targets/dynamic-locators/
* When adding an item on the form, the site creates an `li` with a random id at the bottom of the list.
* To handle this, the Provengo model grabs the id of the last `li` after each item generation and stores it in a runtime variable (`@{these_guys}`).
  * IMPORTANT: This is done *while blocking additional item generations*. Without this blocking, another thread might have created a new item and the test would become flaky. We do not like flaky.
* After the ID is stored, threads are again allowed to run in parallel, so we can check that different orderings do not confuse the page.
* Files of interest:
  * [spec/js/testModel.js](spec/js/testModel.js) The test model. This one contains both automation and logic.
  * [data/data.js](data/data.js) URLs, page elements, cow.
  * [config/provengo.yml](config/provengo.yml) Main Configuration file.
  * [sample-spaces](sample-spaces) Some sample spaces of test for 1, 2, and 3 items.


> Tool documentation, installation instructions, and more are available at https://docs.provengo.tech.