// @provengo summon selenium

/////////////////////////////////////////////////////////////////////////////
///
/// Low-level handlers that only affect the user flow,
/// but does not handle automation. Useful for validating 
/// test flow with non-technical users, through visualization.
///
///                                                               |\_/|
///                                                               |o o|__
///                                                               --*--__\
///                                                               C_C_(___)
////////////////////////////////////////////////////////////////////////////

function userLogin() {}

function dashboard() {}

function chooseService(){
    let service = select("service").from("Banker","Investment Specialist","Cashier");

    if ( service === "Banker" ) {
        service = "meet_banker";
    } else if ( service==="Investment Specialist" ) {
        service = "meet_invest";
    } else {
        service = "meet_cashier";
    }

    // save service value for later use.
    bp.store.put("service",service);
};

function chooseTopic(){
    let service = bp.store.get("service");
    select("topic").from(MEETING_TYPE_2_TOPIC[service]);

    bp.store.remove("service"); 
};

function setTimeAndBranch() {
    let dayPart = select("day part").from("morning","afternoon");
    select("hour").from(DAYPART_2_TIME[dayPart]);
    select("branch").from(REMOTE_BRANCHES);
}

function setTime() {
    let dayPart = select("day part").from("morning","afternoon");
    select("hour").from(DAYPART_2_TIME[dayPart]);
}

function contactInfo() {}

function userConfirmation() {}

function systemConfirmation() {}