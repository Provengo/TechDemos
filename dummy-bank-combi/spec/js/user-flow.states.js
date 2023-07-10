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


// Automation handlers
sm.at("login").run(userLogin);
sm.at("dashboard").run(dashboard);
sm.at("chooseService").run(chooseService);
sm.at("chooseTopic").run(chooseTopic);
sm.at("contactInfo").run(contactInfo);
sm.at("userConfirmation").run(userConfirmation);
sm.at("systemConfirmation").run(systemConfirmation);

sm.at("setTime").run(setTime);
sm.at("setTimeAndBranch").run(setTimeAndBranch);

// if the selected service is Cashier, go to "setTimeAndBranch"
// if the selected service is either Banker or Investment Specialist, go to "setTime" (default branch is home-branch).
Constraints.after(service.setToEvent("Banker")).block(sm.enterEvent("setTimeAndBranch")).forever();
Constraints.after(service.setToEvent("Investment Specialist")).block(sm.enterEvent("setTimeAndBranch")).forever();
Constraints.after(service.setToEvent("Cashier")).block(sm.enterEvent("setTime")).forever();


// function to get the sm instance from other js files
function getSm(){
    return sm;
}


