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

// if the selected service is Cashier, do not go into the "setTime" screen
//  (since the user needs to select the branch as well).
Constraints.unless(sm.enterEvent("contactInfo"))
    .after(selectEvent("service","Cashier"))
    .block(sm.enterEvent("setTime"))
    .until(sm.enterEvent("contactInfo"));

// if the selected service is either Banker or Investment Specialist, do not go to the  "setTimeAndBranch"
//  screen, since the branch is implied to be the user's home branch.
Constraints.unless(sm.enterEvent("contactInfo"))
    .after(  
        // Using .or() to compose event sets
        selectEvent("service","Banker").or(selectEvent("service","Investment Specialist"))
    ).block(sm.enterEvent("setTimeAndBranch"))
     .until(sm.enterEvent("contactInfo"));

/**
 * 
 * @returns the state machine defined in high-level.states
 */
function getSm(){
    return sm;
}