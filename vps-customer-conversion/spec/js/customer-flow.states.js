// @provengo summon constraints

const flow = new StateMachine("customer");

// Standard "Happy" Flow
flow.connect("visit")
    .to("beginTrial")
    .to("endTrial")
    .to("join")
    .to("medium plan");

// Customer cases
flow.connect("join").to("mini plan");
flow.connect("join").to("premium plan");
// "see Jira #3445"
flow.connect("premium plan").to("support").to("premium plan");

// Onboard fail
flow.connect("endTrial").to("leave");

// Marketing failure
flow.connect("visit").to("leave");

// A trial can't last forever
Constraints.after(flow.enters("beginTrial"))
           .require( flow.enters("join").or( flow.enters("leave")) )
           .eventually();

// More trial time
flow.connect("endTrial").to("30-more").to("beginTrial");

