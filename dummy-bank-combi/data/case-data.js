const URL = "https://dummy-bank.provengo.tech/";

const MEETING_TYPE_2_TOPIC = {
  meet_banker: [
    "create new account 1",
    "manage your account 2",
    "evaluate overdrafts and loans 3",
  ],
  meet_cashier: [
    "Receive payments 1",
    "issue receipts 2",
    "track transactions 3",
    "payments 4",
  ],
  meet_invest: [
    "consult a specialist 1",
    "make smart investments 2",
    "make new financial goals 3",
  ],
};

const TOPICS = [
  "create new account 1",
  "manage your account 2",
  "evaluate overdrafts and loans 3",
  "Receive payments 1",
  "issue receipts 2",
  "track transactions 3",
  "payments 4",
  "consult a specialist 1",
  "make smart investments 2",
  "make new financial goals 3",
];

const DAYPART = ["morning", "afternoon"];

const DAYPART_2_TIME = {
  morning: ["09:00", "09:30", "10:30"],
  afternoon: ["1:00", "1:30", "2:30"],
};
const HOURS = ["09:00", "09:30", "10:30", "1:00", "1:30", "2:30"];

const CUSTOMER_DETAILS = {
  email: "israel.israeli@example.co.il",
  phone: "054-1234567",
  remarks: "Some Remarks",
  username: "teddyBear123",
  password: "Bear123",
};

const REMOTE_BRANCHES = [
  "Tel Aviv Central",
  "Ashdod",
  "Haifa",
  "Ramat Gan",
  "Beer Sheva",
  "Home Branch",
];

// Components repository, holds XPaths for UI elements.
const COMPONENTS = {
  LOGIN: {
    userName: "//input[@id='username-input-container']",
    password: "//input[@id='password-input-container']",
    submitButton: "//button[@id='login-button']",
  },

  SERVICES: {
    meet_banker: "//button[@id='personal-banker-service-button']",
    meet_invest: "//button[@id='investment-specialist-service-button']",
    meet_cashier: "//button[@id='cashier-service-button']",
  },

  dashboard: "//div[@class='dashboard-welcome']",
  dialog: "//p[@class='dialog-title']",
  setTimePage: "//div[@class='select-time']",
  setTimeAndBranchPage: "//div[@class='set-time-and-branch']",
  setTime_btn_continue: "//button[@id='set-time-continue-button']",
  setTime_btn_back: "//button[@id='set-time-back-button']",
  form: "//form[@class='form contact-details']",
  header: "//div[@class='header']",
  branchSelect: "//select[@id='branch-input']",

  TOPICS: {
    topic_1: "//button[@id='topic-1']",
    topic_2: "//button[@id='topic-2']",
    topic_3: "//button[@id='topic-3']",
    topic_4: "//button[@id='topic-4']",
  },

  HOURS: {
    "09:00": "//input[@id='Morning-hour-0']",
    "1:00": "//input[@id='Afternoon-hour-0']",
    "09:30": "//input[@id='Morning-hour-1']",
    "1:30": "//input[@id='Afternoon-hour-1']",
    "10:30": "//input[@id='Morning-hour-2']",
    "2:30": "//input[@id='Afternoon-hour-2']",
  },

  BRANCHES: {
    "Tel Aviv Central": "//option[@value='Tel Aviv Central']",
    Ashdod: "//option[@value='Ashdod']",
    Haifa: "//option[@value='Haifa']",
    "Beer Sheva": "//option[@value='Beer Sheva']",
    "Ramat Gan": "//option[@value='Ramat Gan']",
    //        "Home":                             "//option[@value='Ramat Gan']",
  },

  CONTACT_INFO: {
    email_input: "//input[@id='email-input']",
    phone_input: "//input[@id='phone-input']",
    remarks_input: "//textarea[@id='remarks-input']",
    userConfirmationPage: "//ul[@class='meeting-details']",
    user_confirmation_btn: "//button[@id='user-confirmation-schedule-button']",
    remarks_btn_continue: "//button[@id='remarks-continue-button']",
  },

  USER_CONFIRM: {
    meeting_details: "//ul[@class='meeting-details']",
    user_confirmation_message: "//span[@id='user-confirmation-message']",
    done: "//span[@id='confirmation-notice']",
  },

  SYSTEM_CONFIRM: {
    conclusion_service: "//div[@id='user-confirmation-service']",
    conclusion_topic: "//div[@id='user-confirmation-topic']",
    conclusion_time: "//div[@id='user-confirmation-time']",
    conclusion_branch: "//div[@id='user-confirmation-branch']",
    conclusion_email: "//div[@id='user-confirmation-email']",
    conclusion_phone: "//div[@id='user-confirmation-phone']",
  },
};
