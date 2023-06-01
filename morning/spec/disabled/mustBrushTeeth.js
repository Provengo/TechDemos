bthread("must brush", function(){
    interrupt( Actions.brushTeeth(), function(){
        waitFor( Actions.goOut() );
        bp.ASSERT(false,"Can't leave house without brushing teeth!");
    })
});
