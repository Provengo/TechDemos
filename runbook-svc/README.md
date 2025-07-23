# runbook-svc
This is an example project for implementing an Automic runbook using Provengo. 
The model in this project represents an Automic flow for creating a new service account. 

## Important files
- [spec/js/business-logic.js](spec/js/business-logic.js) - contains the flow definition for the runbook. This is where the actions are defined and the flow is controlled. Using the EventCaegory library.
`actionsSVC` - eventCategory object that describes the actions available in the service account creation process. contains a list of `names` which are the actions we can use in this category, and a `color` which is used to represent this category in the graphs and reports.

- [spec/js/z-handlers.js](spec/js/z-handlers.js) - contains the `automicActions` object that maps each provengo action to an automic action with an `objectName` and an `objectType`. 
It also defines the handlers for the category actions we used in the business logic. These handlers are used to connect the automic actions to the Provengo actions.

- [spec/js/low-level-automic.js](spec/js/low-level-automic.js) - contains the implementation of the handlers functions that connects the automic action to the Provengo actions. it uses the `withAutomic`
function to add it to the automation event category. (which is the `actions` object in the `data/data.js` file)

- [spec/disabled/verification.js](spec/disabled/verification.js) - halts the flow when it meets the bthread conditions. 

