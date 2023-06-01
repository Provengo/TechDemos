// @provengo summon constraints
// https://docs.provengo.tech/main/site/ProvengoCli/0.9.5/libraries/constraints.html

Constraints.block(Actions.wear("shoes"))
           .until(Actions.wear("socks"));

// bthread("no shoes until socks", function(){
//     sync({
//         block: Actions.wear("shoes"),
//         waitFor: Actions.wear("socks")
//     });
// });
        
// Can't wear shoes until we wore socks
// Rainy Day
// bthread("fail shoes until socks", function(){
//     waitFor( Actions.wakeUp() );
//     sync({
//         waitFor: Actions.wear("socks"), 
//         request: Actions.fail("shoes") // Fail wearing shoes
//     });
// });
// bthread("no shoes until socks", function(){
//     sync({
//         block: Actions.wear("shoes"),
//         waitFor: Actions.wear("socks")
//     });
// });
// bthread("no socks after shoes", function(){
//     waitFor(Actions.wear("shoes"));
//     request(Actions.fail("socks"));
// });

// Spec Verification / Regulation
bthread("forbid socks after shoes", function(){
    waitFor(Actions.wear("shoes"));
    waitFor(Actions.wear("socks"));
    bp.ASSERT(false, "no socks after shoes");
});


// Constraints.after(Actions.wakeUp())
        //             .require(Actions.goOut())
        //             .eventually();
