// @provengo summon combi

const bank = Combi("Dummy Bank");

const service = bank.field("service").isOneOf("Banker","Cashier","Investment Specialist");
service.record();

let serv;
if(service==="Banker"){
    serv = "meet_banker"
}else if(service ==="Cashier"){
    serv = "meet_cashier";
}else{
    serv = "meet_invest";
}

const topic = bank.field("topic").isOneOf(MEETING_TYPE_2_TOPIC[serv]);

const dayPart = bank.field("dayPart").isOneOf("morning","afternoon");

let dp;
if(bp.store.get("dayPart")==="morning"){
    dp = "morning";
}
else{
    dp = "afternoon";
}

const hour = bank.field("hour").isOneOf(DAYPART_2_TIME[dp]);
const branch = bank.field("branch").isOneOf(REMOTE_BRANCHES);

service.whenSetTo("Banker").field(branch).mustBe("Home Branch");
service.whenSetTo("Investment Specialist").field(branch).mustBe("Home Branch");

topic.record();
hour.record();
branch.record();

bank.doStart();

bthread("connectSm", function start(){
    waitFor(bank.doneEvent);
    const sm = getSm();
    sm.doStart();
})




