

const URL = "https://dummy-bank.provengo.tech/";

const USERNAME = "teddyBear123";
const PASSWORD = "Bear123";

const MEETING_TYPE_2_SERVICE = {
    meet_banker:  ["banker topic 1", "banker topic 2"],
    meet_cashier: ["cashier topic 1", "cashier topic 2"],
    meet_invest:  ["investment topic 1", "investment topic 2","investment topic 3"]
};

const DAYPART_2_TIME = {
    "morning":
        ["09:00", "09:30", "10:30"],
    "afternoon":
        ["1:00","1:30","2:30"]
};

const REMOTE_BRANCH_1 = "Tel Aviv Central";
const REMOTE_BRANCH_2 = "Ashdod";
const REMOTE_BRANCH_3 = "Haifa";
const REMOTE_BRANCH_4 = "Ramat Gan";
const REMOTE_BRANCH_5 = "Beer Sheva";
const HOME_BRANCH = "Home Branch";


const EMAIL = "israel.israeli@example.co.il";
const PHONE = "054-1234567";
const REMARKS= "Some Remarks";

// Components repository, holds XPaths for UI elements.
const COMPONENTS = {
    userName:                           "//input[@id='username-input-container']",
    password:                           "//input[@id='password-input-container']",
    submitButton:                       "//button[@id='login-button']",
    dashboard:                          "//div[@class='dashboard-welcome']",
    meet_banker:                        "//button[@id='personal-banker-service-button']",
    meet_invest:                        "//button[@id='investment-specialist-service-button']",
    meet_cashier:                       "//button[@id='cashier-service-button']",
    dialog:                             "//p[@class='dialog-title']",
    topic_1:                            "//button[@id='topic-1']",
    topic_2:                            "//button[@id='topic-2']",
    topic_3:                            "//button[@id='topic-3']",
    setTimePage:                        "//div[@class='select-time']",
    setTimeAndBranchPage:               "//div[@class='set-time-and-branch']",
    "09:00":                            "//input[@id='hour-0']",
    "1:00":                             "//input[@id='hour-0']",
    "09:30":                            "//input[@id='hour-1']",
    "1:30":                             "//input[@id='hour-1']",
    "10:30":                            "//input[@id='hour-2']",
    "2:30":                             "//input[@id='hour-2']",
    setTime_btn_continue:               "//button[@id='set-time-continue-button']",
    remarks_btn_continue:               "//button[@id='remarks-continue-button']",
    form:                               "//form[@class='form contact-details']",
    branch:                             "//select[@id='branch-input']",
    "Tel Aviv Central":                 "//option[@value='Tel Aviv Central']",
    Ashdod:                             "//option[@value='Ashdod']",
    Haifa:                              "//option[@value='Haifa']",
    "Beer Sheva":                       "//option[@value='Beer Sheva']",
    "Ramat Gan":                        "//option[@value='Ramat Gan']",
    email_input:                        "//input[@id='email-input']",
    phone_input:                        "//input[@id='phone-input']",
    remarks_input:                      "//textarea[@id='remarks-input']",
    userConfirmationPage:               "//ul[@class='meeting-details']",
    user_confirmation_btn:              "//button[@id='user-confirmation-schedule-button']",
    meeting_details:                    "//ul[@class='meeting-details']",
    user_confirmation_message:          "//span[@id='user-confirmation-message']",
    done:                               "//span[@id='confirmation-notice']",
    header:                             "//div[@class='header']",
    conclusion_service:                 "//div[@id='user-confirmation-service']",
    conclusion_topic:                   "//div[@id='user-confirmation-topic']",
    conclusion_phone:                   "//div[@id='user-confirmation-phone']",


 };

////////////////////////////////////////////////////////////////////////////////////////
// Basic app flow

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
