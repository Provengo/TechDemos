// @provengo summon ctrl

//event def for login
defineEvent(SeleniumSession, "Login", function (session,event) {});

//event def for choosing a meeting-service
defineEvent(SeleniumSession, "ChooseService", function (session,event) {});

//event def for choosing a service-topic
defineEvent(SeleniumSession, "ChooseTopic", function (session,event) {});

//event def for scheduling meeting
defineEvent(SeleniumSession, "SetTime", function (session,event) {});

//event def for setting the Branch (only if service=="meet_cashier")
defineEvent(SeleniumSession, "SetBranch", function (session,event) {});

//event def for moving forward to the next page
defineEvent(SeleniumSession, "MoveToContactDataPage", function (session,event) {});

//event def for filling contact information.
defineEvent(SeleniumSession, "FillContactData", function (session,event) {});

//event def for confirming the user contact information.
defineEvent(SeleniumSession, "UserConfirmation", function (session,event) {});

//event def for verifying the meeting details.
defineEvent(SeleniumSession, "verifyConclusionMessage", function (session,event) {});

