
const TEST_BOOK = {
    
    documentEvent: function(event){
        if ( GenBook.autoTag(event) ) return; 
        if ( event.data ){
            TEST_SCENARIO.addElement( StepElement("Step", event.name));
        } else {
            TEST_SCENARIO.addElement( StepElement("Step", event.name, event.data));
        }
    },
    startTrace: function(){},
    endTrace: function(){}
};
