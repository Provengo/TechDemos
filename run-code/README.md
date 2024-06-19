# Run Code Example

---
michael

A project to demo the usage of <a href="https://docs.provengo.tech/ProvengoCli/0.9.5/libraries/selenium.html#_sn_runcodecode"><code>runCode</code></a>,
a Selenium library command that runs code in the browser and reports back to Provengo. Here we test a page with a two tables. Each table has a an internal logic between rows and columns (need to sum numbers on some of the cells). One table is correct, the other one contains several errors.

NOTE: THIS IS STILL AN EXPERIMENTAL FEATURE, TO BE FULLY ROLLED OUT LATER THIS MONTH.

## Notable Files

* **README.md:** This file.
* **[SUT](SUT):** The sample page we test. Also hosted [here](https://content.provengo.tech/SUT-run-code.html).
* **[`spec/js/main.js`](spec/js/main.js):** The main test flow. Contains browser start and stop, and events for directing which tests will happen. 
* **[`spec/js/run-automation.js`](spec/js/run-automation.js):** `runCode` automation b-threads, expand the `main` bthread above with appropriate `runCode` executions.

## General Flow
Created using `provengo analyze -f pdf`.

![Test space](testSpace.png)


## Usage

1. Make sure you have a Selenium server running. The project is configured to use a local server, but you can specify another server in [config/provengo.yml](config/provengo.yml), using the `selenium.server` key.
1. To run a random single scenario, use `provengo run`. If you want to see what is going on (not much here, but still), use the `--dev` flag, like so: `provengo run --dev`.
2. This model is not very large, so it's easy to just generate a sample of all scenarios using `provengo sample -a full`. This will generate a samples file in `products/run-source/samples.json`.
3. To run the samples, use `provengo run -s products/run-source/samples.json`.
4. Finally, to see the test results, use `provengo report`.

