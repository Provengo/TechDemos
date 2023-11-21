//@provengo summon selenium
// Define a Selenium session. No window is opened yet.
const seleniumSession = new SeleniumSession('user')


////////////////////////////////////////////////////////////////////////////////////////
//
//   Main scenario:                         +-------+
//   +-----+   +---------+   +----------+   |contact|   +--------+   +-------+
//-->|Login|-->|Dashboard|-->| set time |-->|  and  |-->|approval|-->|confirm|
//   +-----+   +---------+   +----------+   |remarks|   +--------+   +-------+
//                                          +-------+
//
//   Cashier scenario:
//   +-----------+                    +----------+   +---------–––-+
//-->| Dashboard |––––––––––––––––––->| set time |-->|select branch|
//   +-----------+ (service=cashier)  +----------+   +-------------+
//
////////////////////////////////////////////////////////////////////////////////////////


// Main scenario:
//      Login, choose a service, choose a topic, set time,
//      fill in contact info, confirm contact info, confirm meeting
story('Main scenario', function () {
  with (seleniumSession.start(URL)) {
    // Open a browser window, go to dummy-bank.provengo.tech and login with username and password.
    login({ username: CUSTOMER_DETAILS.username, password: CUSTOMER_DETAILS.password })

    // choose a service for the meeting
    let service = choose(Object.keys(MEETING_TYPE_2_SERVICE))
    chooseService({ service: service })

    // choose a topic (by service)
    if (typeof analyzeMode === 'undefined') {
      let topic = choose(MEETING_TYPE_2_SERVICE[service])
      chooseTopic({ topic: 'topic_' + topic.charAt(topic.length - 1) })
    }

    // schedule the meeting
    let dayPart = choose(Object.keys(DAYPART_2_TIME))
    let time = select('time').from(DAYPART_2_TIME[dayPart])
    setTime({ time: time })

    if (typeof analyzeMode === 'undefined' && service === 'meet_cashier') {
      let branch = choose(REMOTE_BRANCHES)
      setBranch({ branch: branch })
    }

    // fill in contact info
    moveToContactDataPage()
    fillContactData({
      email: CUSTOMER_DETAILS.email,
      phone: CUSTOMER_DETAILS.phone,
      remarks: CUSTOMER_DETAILS.remarks
    })

    // confirm contact info
    userConfirmation()

    // system confirmation for the scheduled meeting
    verifyConclusionMessage({
      service: service,
      email: CUSTOMER_DETAILS.email,
      phone: CUSTOMER_DETAILS.phone,
      remarks: CUSTOMER_DETAILS.remarks
    })
  }
})

// Cashier scenario:
//      If the service is 'cashier',
//      the customer must choose a branch after selecting time.
story('meeting with cashier requires branch location', function () {
  waitFor(choiceEvent('meet_cashier'))
  waitFor(Any(/time/))
  choose(REMOTE_BRANCHES)
})

