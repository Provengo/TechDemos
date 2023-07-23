
bthread("forbid socks after shoes", function(){
    waitFor(Actions.wear("shoes"));
    waitFor(Actions.wear("socks"));
    bp.ASSERT(false, "no socks after shoes");
});