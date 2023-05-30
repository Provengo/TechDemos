// @provengo summon selenium

const session = new SeleniumSession("session");
//רק מה שבורחים ומה שמשפיע על הפלו

function userLogin() {}

function dashboard() {}

function chooseService(){
    let service = select("service").from("Banker","Investment Specialist","Cashier");

    if(service === "Banker"){
        service = "meet_banker";
    }
    else if(service==="Investment Specialist"){
        service = "meet_invest";
    }
    else{
        service = "meet_cashier";
    }

    //save service value for later use.
    bp.store.put("service",service);
};

function chooseTopic(){
//    let button;
    let service = bp.store.get("service");
    let topic = select("topic").from(MEETING_TYPE_2_TOPIC[service]);

    bp.store.remove("service");
};

function setTimeAndBranch() {
    let dayPart = select("day part").from("morning","afternoon");
    let hour = select("hour").from(DAYPART_2_TIME[dayPart]);
//    bp.store.put("hour",hour);
    let branch = select("branch").from(REMOTE_BRANCHES);
}

function setTime() {
    let dayPart = select("day part").from("morning","afternoon");
    let hour = select("hour").from(DAYPART_2_TIME[dayPart]);
}

function contactInfo() {}

function userConfirmation() {}

function systemConfirmation() {}