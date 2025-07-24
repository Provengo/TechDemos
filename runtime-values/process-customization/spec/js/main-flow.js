
bthread("main", function(){
    flow.doSelectUser();
    flow.doDoSomeStuff();
    flow.doEnterUserDetails();
    flow.doDone();
    if ( maybe("more?") ) {
        flow.doDoSomeMoreStuff();
    }
});