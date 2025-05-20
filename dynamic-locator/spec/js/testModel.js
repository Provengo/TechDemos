// @provengo summon selenium
// @provengo summon ctrl
// @provengo summon textassertion
// @provengo summon rtv

const SESSION = new SeleniumSession("main");

bthread("main flow", function(){
    SESSION.start(URL);

    for ( let item of ITEMS ) {
        Ctrl.doMark("Adding Item");
        // Add a new item
        SESSION.writeText( EMTS.field, item );
        SESSION.click( EMTS.submit );
        
        // Start a b-thread that tests generated item.
        checkNewestItem(item);
    }
});

/**
 * Creates a bthread that check the last item at the time of the call
 * works correctly.
 */
function checkNewestItem(itemName){
    
    // Sanitizing the RTV variable name. RTV vars need to be valid JS variable names.
    const rtvName = "s"+itemName.replaceAll(/[^a-zA-Z1-9]/g,"_");
    const liLocator = `//li[@id='@{${rtvName}}']`;
    bthread(`check-item-${rtvName}`, function(){
        // first, get the dynamic row id. Block new rows from being generated while at it.
        block(Ctrl.markEvent("Adding Item"), function(){
            SESSION.runCode({
                itemName: rtvName
            }, captureItem);
        });

        SESSION.waitForVisibility(liLocator);
        if ( maybe(`complete-${rtvName}`) ) {
            SESSION.click(`${liLocator}/button`);
            SESSION.assertText(`${liLocator}/div`, "(done)", TextAssertions.modifiers.Contains);
        }
    });
}

function captureItem(){
    let items = document.querySelectorAll("li");
    let newItem = items.item(items.length-1);
    let newItemId = newItem.id;
    pvg.rtv.set(pvg.params.itemName,newItemId);
    pvg.log("Id of new item: " + newItemId);
}