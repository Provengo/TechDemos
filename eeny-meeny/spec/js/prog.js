// @provengo summon constraints

bthread("eeny-meeny", function(){
    request(bp.Event("Eeny"));
    request(bp.Event("Meeny"));
    request(bp.Event("Miny"));
    request(bp.Event("Moe"));
});

bthread("akka-bakka", function(){
    // Norwegian version (https://en.wikipedia.org/wiki/Akka_bakka_bonka_rakka)
    request(bp.Event("Akka"));
    request(bp.Event("Bakka"));
    request(bp.Event("Banka"));
    request(bp.Event("Ranka"));
});

// bthread("English first", function(){
//     sync({
//         waitFor: bp.Event("Miny"),
//         block: bp.Event("Banka")
//     });
// });

// bthread("EMMM after bakka", function(){
//   sync({
//       waitFor:bp.Event("Bakka"),
//         block:bp.Event("Eeny")
//   });
// });

// bthread("pop after bakka", function ()  {
//     waitFor(bp.Event("Bakka"));
//     request(bp.Event("Pop!"));
// });

// Constraints.after(bp.Event("Banka"))
//            .require(bp.Event("Moe"))
//            .eventually();

// bthread("splitter!", function(){
//     const history = [];
//     const allEvents = bp.EventSet("*",e=>true);
//     while ( true ) {
//         let e = waitFor(allEvents);
//         history.push(e);
//     }
// });