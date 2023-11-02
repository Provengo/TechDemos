// @provengo summon combi

const bank = Combi("Dummy Bank");

const service = bank.field("service").isOneOf("Banker", "Cashier", "Investment Specialist");

const topic = bank.field("topic").isOneOf(TOPICS);

service.whenSetTo("Banker").field(topic).mustBe(MEETING_TYPE_2_TOPIC["meet_banker"]);
service.whenSetTo("Investment Specialist").field(topic).mustBe(MEETING_TYPE_2_TOPIC["meet_invest"]);
service.whenSetTo("Cashier").field(topic).mustBe(MEETING_TYPE_2_TOPIC["meet_cashier"]);

let dayPart = bank.field("dayPart").isOneOf(DAYPART);
let hour = bank.field("hour").isOneOf(HOURS);

dayPart.whenSetTo("morning").field(hour).cannotBe(DAYPART_2_TIME["afternoon"]);
dayPart.whenSetTo("afternoon").field(hour).cannotBe(DAYPART_2_TIME["morning"]);
let branch = bank.field("branch").isOneOf(REMOTE_BRANCHES);

service.whenSetTo("Banker").field(branch).mustBe("Home Branch");
service.whenSetTo("Investment Specialist").field(branch).mustBe("Home Branch");

function recordCombiValues() {
  bp.log.info("recording values");
  // Record combi fields so we can use the selection result for automation values.
  service.record();
  topic.record();
  dayPart.record();
  hour.record();
  branch.record();
}

// bank.doStart();
