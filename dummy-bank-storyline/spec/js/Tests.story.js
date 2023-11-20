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
        let service = choose(Object.keys(MEETING_TYPE_2_SERVICE));
        chooseService({service:service});

        // choose a topic (by service)
        if(typeof analyzeMode === 'undefined') {
            let topic = choose(MEETING_TYPE_2_SERVICE[service])
            chooseTopic({ topic: 'topic_' + topic.charAt(topic.length - 1) })
        }

        // schedule the meeting
        let dayPart = choose(Object.keys(DAYPART_2_TIME));
        let time = choose(DAYPART_2_TIME[dayPart]);
        setTime({time:time});

        // for meeting with a cashier, choose the branch location as well
        if ( service === "meet_cashier" ) {
            let branch = choose(REMOTE_BRANCHES);
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
            email:CUSTOMER_DETAILS.email,
            phone:CUSTOMER_DETAILS.phone,
            remarks:CUSTOMER_DETAILS.remarks
        });
    }
});
