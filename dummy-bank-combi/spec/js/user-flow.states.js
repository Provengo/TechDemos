// @provengo summon constraints

// App flow
const sm = new StateMachine("Dummy Bank Example",false);
sm.connect("login")
    .to("dashboard")
    .to("chooseService")
    .to("chooseTopic")
    .to("setTime")
    .to("contactInfo")
    .to("userConfirmation")
    .to("systemConfirmation");

sm.connect("chooseTopic")
    .to("setTimeAndBranch")
    .to("contactInfo");


// if the selected service is Cashier, go to "setTimeAndBranch"
// if the selected service is either Banker or Investment Specialist, go to "setTime" (default branch is home-branch).
Constraints.after(service.setToEvent("Banker"))
            .block(sm.enterEvent("setTimeAndBranch"))
            .until(sm.enterEvent("contactInfo"));

Constraints.after(service.setToEvent("Investment Specialist"))
            .block(sm.enterEvent("setTimeAndBranch"))
            .until(sm.enterEvent("contactInfo"));
            
Constraints.after(service.setToEvent("Cashier"))
            .block(sm.enterEvent("setTime"))
            .until(sm.enterEvent("contactInfo"));


// function to get the sm instance from other js files
function getSm(){
    return sm;
}


