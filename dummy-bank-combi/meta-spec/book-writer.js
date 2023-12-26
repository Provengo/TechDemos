/*
 * Default implementation for creating a manual test book
 * when using the "provengo gen-book" command.
 */

let count=0;

function startTrace() {
    count=0;
}

function documentEvent( event ) {

    GenBook.autoTag(event); // generate tags based on Combi and Choice events.
    let table_element = TableElement();
    table_element.newRow( );
    table_element.addCell("<ul><li><em>field:</em> &nbsp; service</li><li><em>lib:</em> &nbsp; COMBI</li><li><em>action:</em> &nbsp; done</li><li><em>combi:</em> &nbsp; Dummy Bank</li></ul>");

    const d = event.data;
    if ( d ) {
        if ( d.lib == "Manual" ){
            TEST_SCENARIO.addElement(
                table_element);
        } else if ( d.lib === "Ctrl" ) {
            if ( d.verb === "marker" ) {
                TEST_SCENARIO.addElement(
                    table_element);
            } else {
                TEST_SCENARIO.addElement(
                    table_element);
            }
        } else if (d.lib == "STATEORY") {
            TEST_SCENARIO.addElement(
                table_element
            );
        } else {
            if ( typeof d === "object" ) {
               let text = "";
                let lis = [];
                for ( let k of Object.keys(d) ) {
                    let value;
                    try {
                        value = String(d[k]);
                    } catch (e) {
                        value = "(object " + e + ")";
                    }
                    lis.push(`<li><em>${k}:</em> &nbsp; ${value}</li>`);
                }
                text = "<ul>" + (lis.join("")) + "</ul>";
                TEST_SCENARIO.addElement( table_element);
            } else {
                TEST_SCENARIO.addElement( table_element);
            }
        }
        
    } else {
        TEST_SCENARIO.addElement( table_element );
    }
    count++;
}

function endTrace() {
    TEST_SCENARIO.addMetadataLine("Event count: " + count);
}

// This object is the callback entry point.
const TEST_BOOK = {
    startTrace: startTrace,
    documentEvent: documentEvent,
    endTrace: endTrace
};
