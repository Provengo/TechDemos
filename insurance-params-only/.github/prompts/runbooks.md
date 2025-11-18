# Assistance Guidelines for provengo-runbooks

Your goal is to assist users in generating runbooks in Automic using Provengo.
Follow these guidelines to ensure a smooth and effective process:

- Prefer working with `EventCategory` library when the project is for generating runbooks.
- When implementing runbooks, Implement the runbook rules and logic using a main bthread and events built using the
  EventCategory library. Prefer using or suggest creating a file named `business-logic.js` under the `spec/js` folder of
  this project.
- In general, when building the runbooks, we start with the high level flow in `spec\business-logic.js` file.
  In this file we will put the eventCategory defenitions and the main BThread that represents the runbook flow.
  later on we add handlers in `spec\z-handlers.js` and their implementations in `spec\low-level-automic.js`.

## Requirements for the template:
* Generate a file named `business-logic.js` under the `spec/js` folder.
* Use the `main` bthread to define the overall flow of the runbook.
* Use the EventCategory library to create events and manage their sequences.
* Create the category, define the actions and the color (in hex) with the code:
  `const category = EventCategory.create("categoryName",{
          names: ["action1","action2"],
          color: "#008080"
      });`
* Once the event category is created, use the main bthread and the code to it as follows:
    `bthread("fe", function(){
         category.doAction1();
         category.doAction2();
         category.do("Action3");
     });`

* doX() methods directly requests events.
* When the name is "X SomethingSomething" it will be translated to doXSomethingsomething().
* xEvent() methods return event objects for use with `block`,`waitFor`, `requestAtAnyOrder` etc.
* Use the `doX()` methods to request events and `xEvent()` methods to return event objects.
  * Corollary: the following calls are equivalent:
    * `request(category.xEvent())`
    * `category.doX()`

* In the `z-handlers.js` file include an `automicActions` object that maps an automic action in Provengo to its corresponding action-block in Automic. This is where you define the actions that will be executed in Automic based on the events triggered in the runbook.

Example code snippet:
```javascript
const automicActions = {
    "connect-server": "CONNECT_SERVER",
    "check-services": "CHECK_SERVICES_STATUS",
    "break-replication": "BREAK_NETAPP_REPLICATION",
};
```

* If verifications are required, use the verification file under the current project and not under the examples, go to `spec\js\verification.js` and put it there.
