// @provengo summon selenium


//לנפח את הקובץ עם הרבה סטפים

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

    bp.store.put("topic",topic);
    session.click(button);
    bp.store.remove("service");
};

function setTimeAndBranch(){
    let dayPart = select("day part").from("morning","afternoon");
    let hour = select("hour").from(DAYPART_2_TIME[dayPart]);
    bp.store.put("hour",hour);

    session.click(COMPONENTS.HOURS[hour]);

    let branch = select("branch").from(REMOTE_BRANCHES);
    let button = COMPONENTS.BRANCHES[`${branch}`];
    bp.store.put("branch",branch);

    session.click(button);
    session.click(COMPONENTS.setTime_btn_continue);
}

function setTime(){
    let dayPart = select("day part").from("morning","afternoon");
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
    session.assertText(COMPONENTS.SYSTEM_CONFIRM.conclusion_email, CUSTOMER_DETAILS.email);
    //check all fields
}