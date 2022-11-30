//@provengo summon ctrl

flow.whileAt("beginTrial", function(){
    Ctrl.doMark("We Pay");
});

flow.whileAt("join", function(){
    Ctrl.doMark("Customer Pays");
});

flow.whileAt("leave", function(){
    Ctrl.doMark("No One Pays");
});