// @provengo summon ctrl
// @provengo summon constraints


bthread("xferFunds", function(){
    GVN.given("LogIn");
    requestAtAnyOrder([
        Event("withdraw"),
        Event("deposit"),
        Event("updateStats-c1"),
        // Event("updateStats-c2")
    ]);
});

bthread("changeAddress", function(){
    GVN.given("LogIn");
    request(Event("personal page"));
    request(Event("change"));
});

bthread("announce", function(){
    waitFor(Event("public action"));
    GVN.given("LogIn");
    request(Event("Ka-Ching!"));
});

Constraints.block(Event("deposit")).until(Event("withdraw"));

// bthread("prvs?", function(){
//     if (maybe("prvs")) {
        GVN.provider("big-login").gives("LogIn", function(){
            let v = select("loginType").from("2FA", "u/p", "biometric");
            request( Event("Login-"+v) );
            return true;
        });
        
        GVN.provider("sml-login").gives("LogIn", function(){
            request( Event("Login: u/p") );
            return true;
        });
//     }
// });