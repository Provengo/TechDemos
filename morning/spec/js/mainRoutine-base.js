// @provengo summon constraints

bthread("main", function(){

    request(Actions.wakeUp());
    
    requestAtAnyOrder(
        Actions.wear("pants"),
        Actions.wear("shirt"),
        Actions.wear("socks"),
        Actions.wear("shoes")
    ); 

    request(Actions.brushTeeth());

    if ( maybe("eat breakfast") ) {
        requestAtAnyOrder(
            Actions.eat("Cereal"),
            Actions.eat("Coffee")
        );
    }
    
    request(Actions.tidyUp());
    request(Actions.goOut());
    
});

function dressUp() {
    requestAtAnyOrder(
        Actions.wear("socks"),
        Actions.wear("shoes"),
        Actions.wear("pants"),
        Actions.wear("shirt")
        );
    }
    
function food() {
    requestAtAnyOrder(
        Actions.brushTeeth(),
        Actions.eat("Cereal"));
}