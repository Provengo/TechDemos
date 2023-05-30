// @provengo summon constraints

// App flow
const sm = new StateMachine("Dummy Bank Example");
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
    .to("contactInfo")
    .to("userConfirmation")
    .to("systemConfirmation");


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
Constraints.unless(sm.enterEvent("contactInfo")).after(selectEvent("service","Cashier"))
    .block(sm.enterEvent("setTime"))
    .until(sm.enterEvent("contactInfo"));

// if the selected service is either Banker or Investment Specialist, go to "setTime"
Constraints.unless(sm.enterEvent("contactInfo")).after(selectEvent("service","Banker").or(selectEvent("service","Investment Specialist")))
    .block(sm.enterEvent("setTimeAndBranch"))
    .until(sm.enterEvent("contactInfo"));

// function to get the sm instance from handlers.js file
function getSm(){
    return sm;
}