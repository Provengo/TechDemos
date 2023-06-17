// @provengo summon selenium

/////////////////////////////////////////////////////////////////////////////
///
/// Low-level handlers that perform control flow based on user decisions,
/// and Selenium-based automation.
///                                                               |\_/|
///                                                               |o o|__
///                                                               --*--__\
///                                                               C_C_(___)
////////////////////////////////////////////////////////////////////////////

/**
 * The selenium automation session
 */
const session = new SeleniumSession("session");

function userLogin(){
     session.start(URL);
     session.writeText(COMPONENTS.LOGIN.userName, CUSTOMER_DETAILS.username);
     session.writeText(COMPONENTS.LOGIN.password, CUSTOMER_DETAILS.password);
     session.click(COMPONENTS.LOGIN.submitButton);
}

function dashboard(){
     session.waitForVisibility(COMPONENTS.dashboard,1000);
}

function chooseService(){
    let service = select("service").from("Banker","Investment Specialist","Cashier");
    let button;

    if(service === "Banker"){
        service = "meet_banker";
        button = COMPONENTS.SERVICES.meet_banker;
    }
    else if(service==="Investment Specialist"){
        service = "meet_invest";
        button = COMPONENTS.SERVICES.meet_invest;
    }
    else{
        service = "meet_cashier";
        button = COMPONENTS.SERVICES.meet_cashier;
    }

    //save service value for later use.
    bp.store.put("service",service);
    session.click(button);
};

function chooseTopic(){
    let button;
    let service = bp.store.get("service");
    let topic = select("topic").from(MEETING_TYPE_2_TOPIC[service]);
    bp.store.put("topic",topic);

    if(topic.includes(1)) {
        button = COMPONENTS.TOPICS.topic_1;
    }
    else if(topic.includes(2)) {
        button = COMPONENTS.TOPICS.topic_2;
    }
    else if(topic.includes(3)) {
        button = COMPONENTS.TOPICS.topic_3;
    }
    else {
        button = COMPONENTS.TOPICS.topic_4;
    }

    session.click(button);
   
    // alternative to blocking state entries in high-level.states.js#34
    // if ( bp.store.get("service") === "Cashier" ) {
    //     getSm().next.mustBe("setTimeAndBranch");
    // } else {
    //     getSm().next.mustBe("setTime");
    // }
   
};

function setTimeAndBranch(){
    let dayPart = select("day part").from(DAYPART);
    let hour = select("hour").from(DAYPART_2_TIME[dayPart]);
    bp.store.put("hour",hour);

    session.click(COMPONENTS.HOURS[hour]);

    let branch = select("branch").from(REMOTE_BRANCHES);
    let button = COMPONENTS.BRANCHES[branch];

    bp.store.put("branch",branch);
    session.click(button);
    session.click(COMPONENTS.setTime_btn_continue);
}

function setTime(){
    let dayPart = select("day part").from(DAYPART);
    let hour = select("hour").from(DAYPART_2_TIME[dayPart]);
    bp.store.put("hour",hour);

    session.click(COMPONENTS.HOURS[hour]);
    session.click(COMPONENTS.setTime_btn_continue);
}

function contactInfo(){
    session.writeText(COMPONENTS.CONTACT_INFO.email_input, CUSTOMER_DETAILS.email);
    session.click(COMPONENTS.CONTACT_INFO.remarks_btn_continue);
}

function userConfirmation(){
    session.waitForVisibility(COMPONENTS.USER_CONFIRM.user_confirmation_message, 1000);
    session.waitForVisibility(COMPONENTS.USER_CONFIRM.meeting_details, 1000);

    session.waitForClickability(COMPONENTS.CONTACT_INFO.user_confirmation_btn, 1000);
    session.click(COMPONENTS.CONTACT_INFO.user_confirmation_btn);
}

function systemConfirmation(){
    session.waitForVisibility(COMPONENTS.USER_CONFIRM.done, 1000);
    session.waitForVisibility(COMPONENTS.USER_CONFIRM.meeting_details, 1000);


    let service = bp.store.get("service");
    service = service.split("_")[1];

    if ( service.includes("cashier") ) {
        let branch = bp.store.get("branch");
        session.assertText(COMPONENTS.SYSTEM_CONFIRM.conclusion_branch, branch);
    }

    let topic = bp.store.get("topic");
    topic = topic.slice(0,-1).trim();

    let hour = bp.store.get("hour");

    session.assertText(
        COMPONENTS.SYSTEM_CONFIRM.conclusion_service, service, 
        [TextAssertions.modifiers.IgnoreCase,TextAssertions.modifiers.Contains]
    );

    session.assertText(
        COMPONENTS.SYSTEM_CONFIRM.conclusion_topic, topic,
        [TextAssertions.modifiers.IgnoreCase]
    );

    session.assertText(
        COMPONENTS.SYSTEM_CONFIRM.conclusion_time,hour,
        [TextAssertions.modifiers.Contains]
    );
    session.assertText(COMPONENTS.SYSTEM_CONFIRM.conclusion_email, CUSTOMER_DETAILS.email);
    session.assertText(COMPONENTS.SYSTEM_CONFIRM.conclusion_phone, CUSTOMER_DETAILS.phone);

    bp.store.remove("service");
    bp.store.remove("branch");
    bp.store.remove("hour");
    bp.store.remove("topic");
}
