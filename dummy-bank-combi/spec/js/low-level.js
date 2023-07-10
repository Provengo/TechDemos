// @provengo summon selenium

const session = new SeleniumSession("session");

function userLogin() {
  session.start(URL);
  session.writeText(COMPONENTS.LOGIN.userName, CUSTOMER_DETAILS.username);
  session.writeText(COMPONENTS.LOGIN.password, CUSTOMER_DETAILS.password);
  session.click(COMPONENTS.LOGIN.submitButton);
}

function dashboard() {
  session.waitForVisibility(COMPONENTS.dashboard, 1000);
}

function chooseService() {
  if (!bp.store.has("service")) {
    return;
  }

  let service = bp.store.get("service");
  let button;

  if (service === "Banker") {
    button = COMPONENTS.SERVICES.meet_banker;
  } else if (service === "Cashier") {
    button = COMPONENTS.SERVICES.meet_cashier;
  } else {
    button = COMPONENTS.SERVICES.meet_invest;
  }

  session.click(button);
}

function chooseTopic() {
  let button;
  let topic = bp.store.get("topic");

  if (topic.includes(1)) {
    button = COMPONENTS.TOPICS.topic_1;
  } else if (topic.includes(2)) {
    button = COMPONENTS.TOPICS.topic_2;
  } else if (topic.includes(3)) {
    button = COMPONENTS.TOPICS.topic_3;
  } else {
    button = COMPONENTS.TOPICS.topic_4;
  }

  session.click(button);
}

function setTimeAndBranch() {

  let hour = bp.store.get("hour");

  session.click(COMPONENTS.HOURS[hour]);

  let branch = bp.store.get("branch");
  let button = COMPONENTS.BRANCHES[branch];

  session.click(button);
  session.click(COMPONENTS.setTime_btn_continue);
}

function setTime() {
  let hour = bp.store.get("hour");

  session.click(COMPONENTS.HOURS[hour]);
  session.click(COMPONENTS.setTime_btn_continue);
}

function contactInfo() {
  session.writeText(
    COMPONENTS.CONTACT_INFO.email_input,
    CUSTOMER_DETAILS.email
  );
  session.click(COMPONENTS.CONTACT_INFO.remarks_btn_continue);
}

function userConfirmation() {
  session.waitForVisibility(
    COMPONENTS.USER_CONFIRM.user_confirmation_message,
    1000
  );
  session.waitForVisibility(COMPONENTS.USER_CONFIRM.meeting_details, 1000);

  session.waitForClickability(
    COMPONENTS.CONTACT_INFO.user_confirmation_btn,
    1000
  );
  session.click(COMPONENTS.CONTACT_INFO.user_confirmation_btn);
}

function systemConfirmation() {
//      session.waitForVisibility(COMPONENTS.USER_CONFIRM.done, 1000);
//      session.waitForVisibility(COMPONENTS.USER_CONFIRM.meeting_details, 1000);
//
//
//      let service = bp.store.get("service");
//  //    service = service.split("_")[1];//[1];//.toString();
//
//      if(service.toLowerCase().includes("cashier")){
//          let branch = bp.store.get("branch");
//          session.assertText(COMPONENTS.SYSTEM_CONFIRM.conclusion_branch, branch);
//      }
//
//      let topic = bp.store.get("topic");
//      topic = topic.slice(0,-1).trim();
//
//      let hour = bp.store.get("hour");
//
//      session.assertText(COMPONENTS.SYSTEM_CONFIRM.conclusion_service, service,
//      [TextAssertions.modifiers.IgnoreCase,TextAssertions.modifiers.Contains]);
//
//      session.assertText(COMPONENTS.SYSTEM_CONFIRM.conclusion_topic, topic,
//      [TextAssertions.modifiers.IgnoreCase]);

  bp.store.remove("service");
  bp.store.remove("branch");
  // bp.store.remove("dayPart");
  bp.store.remove("hour");
  bp.store.remove("topic");
}
