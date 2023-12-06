// @provengo summon ctrl

//event def for login
defineEvent(SeleniumSession, "Login", function (session, event) {
  with (session) {
    waitForVisibility(COMPONENTS.header, 100000);
    waitForVisibility(COMPONENTS.submitButton, 10000);

    writeText(COMPONENTS.userName, event.username);
    writeText(COMPONENTS.password, event.password);
    click(COMPONENTS.submitButton);
  }
});

//event def for choosing a meeting-service
defineEvent(SeleniumSession, "ChooseService", function (session, event) {
  with (session) {
    waitForVisibility(COMPONENTS.dashboard, 10000);
    click(COMPONENTS[event.service]);
  }
});

//event def for choosing a service-topic
defineEvent(SeleniumSession, "ChooseTopic", function (session, event) {
  with (session) {
    waitForVisibility(COMPONENTS.dialog, 10000);
    let topic = COMPONENTS[event.topic];
    click(topic);
  }
});

//event def for scheduling meeting
defineEvent(SeleniumSession, "SetTime", function (session, event) {
  with (session) {
    waitForVisibility(COMPONENTS.setTimePage, 1000);
    click(COMPONENTS[event.time]);
  }
});

//event def for setting the Branch (only if service=="meet_cashier")
defineEvent(SeleniumSession, "SetBranch", function (session, event) {
  with (session) {
    waitForVisibility(COMPONENTS.setTimeAndBranchPage, 1000);
    click(COMPONENTS.branch);
    selectByValue(COMPONENTS.branch, event.branch);

    if (event.branch.equals(REMOTE_BRANCH_5)) {
      Ctrl.doMark(REMOTE_BRANCH_5);
    }
  }
});

//event def for moving forward to the next page
defineEvent(
  SeleniumSession,
  "MoveToContactDataPage",
  function (session, event) {
    with (session) {
      waitForClickability(COMPONENTS.setTime_btn_continue, 1000);
      click(COMPONENTS.setTime_btn_continue);
      waitForVisibility(COMPONENTS.form, 1000);
      waitForVisibility(COMPONENTS.phone_input, 1000);
    }
  }
);

//event def for filling contact information.
defineEvent(SeleniumSession, "FillContactData", function (session, event) {
  with (session) {
    waitForVisibility(COMPONENTS.email_input, 1000);
    writeText(COMPONENTS.email_input, event.email);
    writeText(COMPONENTS.phone_input, event.phone);
    writeText(COMPONENTS.remarks_input, event.remarks);
    waitForClickability(COMPONENTS.remarks_btn_continue, 1000);
    click(COMPONENTS.remarks_btn_continue);
  }
});

//event def for confirming the user contact information.
defineEvent(SeleniumSession, "UserConfirmation", function (session, event) {
  with (session) {
    
    waitForVisibility(COMPONENTS.meeting_details, 1000);
    
    waitForVisibility(COMPONENTS.user_confirmation_btn, 1000);
    click(COMPONENTS.user_confirmation_btn);
  }
});

//event def for verifying the meeting details.
defineEvent(
  SeleniumSession,
  "verifyConclusionMessage",
  function (session, event) {
    with (session) {
      waitForVisibility(COMPONENTS.done, 1000);

      //verify service and phone
      let expectedService = event.service.slice(5);

      //check if the expected Email string equals to the xpath's string
      session.assertText(COMPONENTS.conclusion_email, CUSTOMER_DETAILS.email);
    }
  }
);
