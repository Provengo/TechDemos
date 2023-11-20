// @provengo summon ctrl

//event def for login
// defineEvent(SeleniumSession, "Login", function (session,event) {});
function login(session,event){
  request(bp.Event("Login"))
}

//event def for choosing a meeting-service
// defineEvent(SeleniumSession, "ChooseService", function (session,event) {});
function chooseService(){}

//event def for choosing a service-topic
defineEvent(SeleniumSession, "ChooseTopic", function (session,event) {});
// function chooseTopic(){}


//event def for scheduling meeting
// defineEvent(SeleniumSession, "SetTime", function (session,event) {});
function setTime(){}

//event def for setting the Branch (only if service=="meet_cashier")
// defineEvent(SeleniumSession, "SetBranch", function (session,event) {});
function setBranch(){}

//event def for moving forward to the next page
// defineEvent(SeleniumSession, "MoveToContactDataPage", function (session,event) {});
function moveToContactDataPage(){}

//event def for filling contact information.
// defineEvent(SeleniumSession, "FillContactData", function (session,event) {});
function fillContactData(){
  request(bp.Event("FillContactData"))
}

//event def for confirming the user contact information.
// defineEvent(SeleniumSession, "UserConfirmation", function (session,event) {});
function userConfirmation(){
  request(bp.Event("UserConfirmation"))
}

//event def for verifying the meeting details.
// defineEvent(SeleniumSession, "verifyConclusionMessage", function (session,event) {});
function verifyConclusionMessage(){
  request(bp.Event("verifyConclusionMessage"))
}
