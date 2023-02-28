// @provengo summon ctrl

const manualTester = Manual.defineUser("user");

//event def for login
defineEvent(SeleniumSession, "Login", function (session,event) {
    with (session) {
        manualTester.doAct("Enter login details", 
                           `username: ${event.username}, password: ${event.password}`);
        manualTester.doAct("Click submit");
        // request( manualTester.actionEvent("Click submit")); // same as above
    }
});

//event def for choosing a meeting-service
defineEvent(SeleniumSession, "ChooseService", function (session,event) {
    with (session) {
        manualTester.doAct(`Choose service: ${event.service}`, 
        "Expected: Service is selected, moving on to next screen");
    }
});

//event def for choosing a service-topic
defineEvent(SeleniumSession, "ChooseTopic", function (session,event) {
    with (session) {
        manualTester.doAct(`Choose topic: ${event.topic}`, "Expected: Topic is selected, moving on to next screen");
    }
});

//event def for scheduling meeting
defineEvent(SeleniumSession, "SetTime", function (session,event) {
    with (session) {
        manualTester.doAct(`Choose time: ${event.time}`, "Expected: Time is selected, moving on to next screen");
    }
});

//event def for setting the Branch (only if service=="meet_cashier")
defineEvent(SeleniumSession, "SetBranch", function (session,event) {
    with (session) {
        manualTester.doAct(`Choose branch: ${event.branch}`, "Expected: Branch is selected, moving on to next screen");
    }
});

//event def for moving forward to the next page
defineEvent(SeleniumSession, "MoveToContactDataPage", function (session,event) {
    with (session) {
        manualTester.doAct("Click set time button");
    }
});

//event def for filling contact information.
defineEvent(SeleniumSession, "FillContactData", function (session,event) {
    with (session) {
        manualTester.doAct(
            "Fill contact data", 
          `Email: ${event.email}, Phone: ${event.phone}, remarks: ${event.remarks}`);
    }
});

//event def for confirming the user contact information.
defineEvent(SeleniumSession, "UserConfirmation", function (session,event) {
    with (session) {
        manualTester.doAct("Click 'confirm'");
    }
});

//event def for verifying the meeting details.
defineEvent(SeleniumSession, "verifyConclusionMessage", function (session,event) {
    with (session) {
        manualTester.doValidate("Details are correct",
         `Expected: Service:${event.service}, Email: ${event.email}, Phone: ${event.phone}, remarks: ${event.remarks}`);
    }
});

