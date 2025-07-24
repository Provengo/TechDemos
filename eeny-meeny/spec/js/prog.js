// @provengo summon constraints

bthread("eeny-meeny", function(){
    request(Event("Eeny"));
    request(Event("Meeny"));
    request(Event("Miny"));
    request(Event("Moe"));
});

// // Norwegian version 
// // see https://en.wikipedia.org/wiki/Akka_bakka_bonka_rakka
bthread("akka-bakka", function(){
    request(Event("Akka"));
    request(Event("Bakka"));
    request(Event("Banka"));
    request(Event("Ranka"));
});

bthread("door for Norway", function(){
    // waitFor( choiceEvent("useDoor") );
    sync({
        block: Event("Eeny"),
        waitFor: Event("Bakka")
    });
});

// bthread("English first", function(){
//     sync({
//         waitFor: Event("Miny"),
//         block: Event("Banka")
//     });
// });

// bthread("EMMM after bakka", function(){
//   sync({
//       waitFor:Event("Bakka"),
//         block:Event("Eeny")
//   });
// });

bthread("pop after bakka", function ()  {
    waitFor(Event("Bakka"));
    request(Event("Pop!"));
});


// Constraints.after(Event("Banka"))
//            .require(Event("Moe"))
//            .eventually();

// bthread("splitter!", function(){
//     const history = [];
//     const allEvents = EventSet("*",e=>true);
//     while ( true ) {
//         let e = waitFor(allEvents);
//         history.push(e);
//     }
// });