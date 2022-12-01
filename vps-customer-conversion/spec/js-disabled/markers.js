//@provengo summon ctrl

flow.whileAt("beginTrial", function(){
    Ctrl.doMark("We Pay");
});

flow.at("join").run(function(){
    Ctrl.doMark("Customer Pays");
});

// flow.at("leave").run(function(){
//     Ctrl.doMark("No One Pays");
// });
