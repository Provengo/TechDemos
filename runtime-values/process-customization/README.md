# Customize RTV

Schematic solution for having multiple similar (but not identical!) customers go through a process, 
and auto-customizing the process based on the relevant parts of their data. This design pattern uses [RTV](https://docs.provengo.tech/ProvengoCli/0.9.5/libraries/runtimevars.html) for the customer specific data, and [bp.store](https://docs.provengo.tech/ProvengoCli/0.9.5/dsls/bp-object.html#_bp_store) for general required behavior.

General idea:

- Choose a customer via `select().from()`
- Store full customer value using `RTV`
- WaitFor customer selection, and add bthreads/block events/update `bp.store` based on *traits* of the selected customer, not the exact customer data. So we can say things like "When a customer has an `email` field, send them an email". That's different from  "Record customer's email, send them email if that field is not empty" as the first adds 2 paths (with and without email) and the latter adds a path for each customer.

Threads:

* [main-flow](spec/js/main-flow.js) The main flow bthread, delineating the business process at a high-level.
* [refinements](spec/js/refinements.js) Defines what to do at each business-level step. Customizes behavior based on `bp.store` states. 
* [adders](spec/js/adders.js) Updates the status of `bp.store` based on customer selection. 