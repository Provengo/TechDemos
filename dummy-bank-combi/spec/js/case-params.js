// @provengo summon combi

const bank = Combi("Dummy Bank");

const service = bank.field("service").isOneOf("Banker","Cashier", "Investment Specialist");

const dayPart = bank.field("dayPart").isOneOf("morning","afternoon");

const branch = bank.field("branch").isOneOf(REMOTE_BRANCHES);

service.whenSetTo("Banker").field(branch).mustBe("Home Branch");
service.whenSetTo("Investment Specialist").field(branch).mustBe("Home Branch");
service.whenSetTo("Cashier").field(branch).cannotBe("Home Branch");

service.record();
branch.record();
dayPart.record();

bank.doStart();

bthread("connectSm", function start(){
    waitFor(bank.doneEvent);
    const sm = getSm();
    sm.doStart();
})




