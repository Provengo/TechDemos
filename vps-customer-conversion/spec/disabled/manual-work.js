//@provengo summon ctrl
const t1 = Manual.defineUser("tester");

flow.at("visit").run(function(){
    t1.act("Open website","https://example.com");

    let destination = choose("about","contact us", "complaints", "prices");
    t1.act(`browse ${destination}`);
});

flow.at("beginTrial").run(function(){
    t1.act("join trail");
    Ctrl.doMark("We Pay");
    t1.validate("vps is working");
});

flow.at("endTrial").run(function(){
    t1.validate("alert of trial end is displayed");
});

flow.at("join").run(function(){
    t1.act("click 'join'");
    Ctrl.doMark("Customer Pays");
    t1.validate("process completed");
});

flow.at("leave").run(function(){
    t1.act("Visit some other site", "https://blender.org");
});

flow.at("mini plan").run(function(){
    t1.validate("at mini plan");
    t1.validate("server amount", "up to 100 servers");
});

flow.at("medium plan").run(function(){
    t1.validate("at medium plan");
    t1.validate("server amount", "up to 1000 servers");
});

flow.at("premium plan").run(function(){
    t1.validate("at premium plan");
    t1.validate("server amount", "1200 servers");
});
