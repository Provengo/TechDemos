bthread("Good Morning", function(){
    if ( maybe("Woke up late") ) {
        if ( maybe() ) {
            request( Actions.brushTeeth() );
        }
        request(Actions.goOut());
        return;
    }
    
    request(Actions.wakeUp());
    eatBreakfast();
    if ( maybe() ) {
        while ( true ) {
            request(Actions.wakeUp());
            requestOne(
                Actions.backToSleep(),
                Event("coffee break")
            );
        }
    }
    dressUp();
    request(Actions.brushTeeth());
    request(Actions.tidyUp());
    request(Actions.goOut());
    while( true ) {
        request(Event("work"));
        request(Event("coffee break"));
    }
});

function eatBreakfast(){
    requestAtAnyOrder(
        Actions.eat("Banana"),
        Actions.eat("Cornflakes")
    );
}

function dressUp() {
    requestAtAnyOrder(
        Actions.wear("socks"),
        Actions.wear("shoes"),
        Actions.wear("pants"),
        Actions.wear("shirt")
    );
}