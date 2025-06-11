// @provengo summon selenium

const session = new SeleniumSession("session");

function userLogin(){
     session.start(URL);
     session.writeText(COMPONENTS.LOGIN.userName, CUSTOMER_DETAILS.username);
     session.writeText(COMPONENTS.LOGIN.password, CUSTOMER_DETAILS.password);
     session.click(COMPONENTS.LOGIN.submitButton);
}

function dashboard(){
     session.waitForVisibility(COMPONENTS.dashboard,1000);
     session.assertText(
             COMPONENTS.dashboard, "hello, teddybear123!",
             [TextAssertions.modifiers.IgnoreCase]
         );
}

function chooseService(){
    if(!bp.store.has("service")){
        return;
    }

    let service = String(bp.store.get("service")).trim();
    let button;

    bp.log.info("Service: {0}", service);

    if(service === "Banker"){
        button = COMPONENTS.SERVICES.meet_banker;
    }
    else if(service==="Cashier"){
        button = COMPONENTS.SERVICES.meet_cashier;
    }
    else{
        button = COMPONENTS.SERVICES.meet_invest;
    }

    session.click(button);

};

function chooseTopic(){
    let button;
    let chosenService = bp.store.get(service.name);
    bp.log.info("Chosen service: " + chosenService);
    let topic = select("topic").from(MEETING_TYPE_2_TOPIC[chosenService]);

    if ( topic.includes("1") ) {
        button = COMPONENTS.TOPICS.topic_1;
    }
    else if ( topic.includes("2") ) {
        button = COMPONENTS.TOPICS.topic_2;
    }
    else {
        button = COMPONENTS.TOPICS.topic_3;
    }

    session.click(button);
};

function setTimeAndBranch(){
    let chosenDayPart = bp.store.get(dayPart.name);
    let hour = select("hour").from(DAYPART_2_TIME[chosenDayPart]);
    session.click(COMPONENTS.HOURS[hour]);

    let branch = bp.store.get("branch");
    let button = COMPONENTS.BRANCHES[`${branch}`];

    session.click(button);
    session.click(COMPONENTS.setTime_btn_continue);

}

function setTime(){
    let chosenDayPart = bp.store.get(dayPart.name);
    let hour = select("hour").from(DAYPART_2_TIME[chosenDayPart]);

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
    bp.store.remove("service");
    bp.store.remove("branch");
    bp.store.remove("dayPart");
    bp.store.remove("hour");
    bp.store.remove("topic");
}
