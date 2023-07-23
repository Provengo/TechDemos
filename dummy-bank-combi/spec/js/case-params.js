// @provengo summon combi

const bank = Combi("Dummy Bank");

const service = bank
  .field("service")
  .isOneOf("Banker", "Cashier", "Investment Specialist");

const topic = bank
  .field("topic")
  .isOneOf(TOPICS);

service.whenSetTo("Banker").field(topic).mustBe(MEETING_TYPE_2_TOPIC["meet_banker"]);
service.whenSetTo("Investment Specialist").field(topic).mustBe(MEETING_TYPE_2_TOPIC["meet_invest"]);
service.whenSetTo("Cashier").field(topic).mustBe(MEETING_TYPE_2_TOPIC["meet_cashier"]);

const dayPart = bank.field("dayPart").isOneOf(DAYPART);
const hour = bank.field("hour").isOneOf(HOURS);

dayPart.whenSetTo("morning").field(hour).cannotBe(DAYPART_2_TIME["afternoon"]);
dayPart.whenSetTo("afternoon").field(hour).cannotBe(DAYPART_2_TIME["morning"]);

const branch = bank.field("branch").isOneOf(REMOTE_BRANCHES);

service.whenSetTo("Banker").field(branch).mustBe("Home Branch");
service.whenSetTo("Investment Specialist").field(branch).mustBe("Home Branch");

function recordCombiValues(){
  // Record combi fields so we can use the selection result for automation values.
  hour.record();
  topic.record();
  branch.record();
  dayPart.record();
  service.record();
}