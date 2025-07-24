bthread("must brush teeth before going out", function(){
    interrupt( Actions.brushTeeth(), function(){
        waitFor( Actions.goOut() );
        halt("Can't leave house without brushing teeth!");
    })
});
