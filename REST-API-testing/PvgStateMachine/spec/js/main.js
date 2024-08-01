//@provengo summon StateMachines

/**
 * Describe the main business flows for a customer, using a state machine.
 */

const mainSm = new StateMachine("customer-flow");

mainSm.connect("start");
mainSm.connect("add-new").to("check").to("update").to("delete").to("end");
mainSm.connect("load-existing").to("check");
mainSm.connect("start").to("add-new");
mainSm.connect("start").to("load-existing");
mainSm.connect("check").to("delete");
mainSm.connect("update").to("end");
mainSm.connect("check").to("end");

bthread("main", function(){
    // request(Event(mode));
    mainSm.doStart();
})
