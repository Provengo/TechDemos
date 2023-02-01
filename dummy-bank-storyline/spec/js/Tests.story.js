//@provengo summon selenium


////////////////////////////////////////////////////////////////////////////////////////
//
// Basic app flow
//
//                         +----------+
//                  +----->| set time |
//                  |      +---+------+
//                  |          |         +-------+
//   +-----+   +----+----+     +-------->|contact|   +--------+   +-------+
//-->|Login|-->|Dashboard|               |  and  |-->|approval|-->|confirm|
//   +-----+   +----+----+     +-------->|remarks|   +--------+   +-------+
//                  |          |         +-------+
//                  |      +---+------+
//                  |      |set time  |
//                  +----->|and branch|
//                         +----------+
//
////////////////////////////////////////////////////////////////////////////////////////


// Define a Selenium session. No window is opened yet.
const seleniumSession = new SeleniumSession("user");
story('TestBank', function () {
    with (seleniumSession.start(URL)) {
        // Open a browser window, go to dummy-bank.provengo.tech and login with username and password.
        login({username: CUSTOMER_DETAILS.username, password: CUSTOMER_DETAILS.password});

        // choose a service for the meeting
        let service = choose("meet_banker","meet_invest","meet_cashier");
        chooseService({service:service});

        // choose a topic (by service)
        let topic = choose(MEETING_TYPE_2_SERVICE[service]);
        chooseTopic({topic:"topic_"+topic.charAt(topic.length-1)});

        // schedule the meeting
        let dayPart = choose("morning","afternoon");
        let time = choose(DAYPART_2_TIME[dayPart]);
        setTime({time:time});

        // for meeting with a cashier, choose the branch location as well
        if ( service === "meet_cashier" ) {
            let branch = choose(REMOTE_BRANCH_1,REMOTE_BRANCH_2,REMOTE_BRANCH_3,REMOTE_BRANCH_4,REMOTE_BRANCH_5);
            setBranch({branch:branch});
        }

        // fill in contact info
        moveToContactDataPage();
        fillContactData({
            email:CUSTOMER_DETAILS.email,
            phone:CUSTOMER_DETAILS.phone,
            remarks:CUSTOMER_DETAILS.remarks
        });

        // confirm contact info
        userConfirmation();

        // system confirmation for the scheduled meeting
        verifyConclusionMessage({
            service:service,
            phone:CUSTOMER_DETAILS.phone
        });
    }
});

bthread("No investors in the afternoon", function(){
    waitFor(choiceEvent("meet_invest"));
    waitFor(choiceEvent("afternoon"));
    bp.ASSERT(false, "No investors in the afternoon");
});