# morning

---
2023-03-15 00:17:30
michael

Provnego project for spec-ing and testing my system.


## Important Files

* README.md This file.
* [config](config) Configuration files and administrative data.
    * [provengo.yml](config/provengo.yml) Main Configuration file
    * [hooks](config/hooks) Hook scripts (pre/post/...)
* [spec](spec) The code creating the specification space lives here. Organized by language.
    * [js](spec/js) JavaScript files
      * [hello-world.js](spec/js/hello-world.js) Initial model file.
* [meta-spec](meta-spec) Code for working with the specification space
    * [ensemble-code.js](meta-spec/ensemble-code.js) Sample code for generating test optimized test suites (ensembles)
    * [book-writer.js](meta-spec/book-writer.js) Sample code for generating test books
    * [script-writer.js](meta-spec/script-writer.js) Code for generating test scripts.
* [lib](lib) Place to store JavaScript libraries. Loaded first.
* [data](data) Place to store data files. Loaded second (so you can use library code to in your data).
    * [data.js](data/data.js) Sample data file.
* [products](products) Artifacts generated from the spec (such as run logs, scripts, and test-books) will be stored here. Much like `build` directories in other platforms, this directory can be ignored by version control systems (e.g. `git`).


## Useful Commands

⚠️ NOTE: In the below listings, we assume that `provengo` properly installed  [https://downloads.provengo.tech/](see here)  and that the terminal is at the project's directory.

For full documentation go to [https://docs.provengo.tech](docs.provengo.tech).

### Randomized Run 

Perform a single run through the specification. Good for "Sanity checks", i.e. to see examples of what can happen.

    provengo run --dry 


### Visualize the Spec

Draw the specification in a PDF file.

    provengo analyze -f pdf 


⚠️ NOTE: This requires [Graphviz](http://graphviz.org) to be installed.


### Sample Runs from the Spec

Sample 10 scenarios into a file. The scenarios are stored in a file called `samples.json` (this can be changed using the `-o`/`--output-file` switch).

    provengo sample --delete-previous --size 10 


### Create an Optimized Test Suite

Generate a test suite of 5 tests that provides a good coverage of items in the [GOALS](z-ranking.js#L18) array.

**Requires running `sample` first** (the previous command)**.**

    provengo ensemble --size 5 

#### Visualize the Spec and the Suite

Draw the specification, and highlight the traces in the optimized test suite create by the previous command.

    provengo analyze -f pdf --highlight ensemble.json 

### Create Test Scripts for Third Party Systems

Converts the runs in `ensemble.json` to automation test scripts.

    provengo gen-scripts -s ensemble.json 