importPackage(Packages.testory.testbooks);
importPackage(Packages.java.util);

const TEXTS = {
    "eat": {
        "banana": "Ensure the banana is yellow.",
        "cereal": "Don't spill too much milk!", 
    },
    "wake up": {
        "": "Don't forget to tidy up your bed."
    },
    "wear": {
        "socks": "The ankle part should be aligned with the ankle.",
        "shirt": "No, you can't wear this one, you wore it yesterday. Take a clean one from the closet.",
        "shoes": "Laces should be tied properly."
    }
}

let count=0;
let countToShirt=0;

function startTrace() {
    count=0;
    countToShirt=0;
}

function documentEvent( event ) {
    count++;
    
    GenBook.autoTag(event); 
    if ( event.name==="wear shirt" ) {
        countToShirt = count;
    }
    const d = event.data;
    if ( d ) {
        if ( d.lib == "COMBI" ) return; // Handled at the Java level
        if ( d.lib == "ACTION" ){
            let details = "";
            if ( TEXTS[d.type] && TEXTS[d.type][d.name] ) {
                details = TEXTS[d.type][d.name];
            }
            TEST_SCENARIO.addElement(
                StepElement(
                    event.name.split(" ")[0],
                    `${d.type}${d.name? ": ":""} ${d.name}`, details 
                ));
        } else if ( d.lib === "Ctrl" ) {
            if ( d.verb === "marker" ) {
                TEST_SCENARIO.addElement(
                    StepElement(`<strong>${d.value}</strong>`,
                        `<div style="background-color:green; color:black">Mark: ${d.value}</div>`, "" ));
            } else {
                TEST_SCENARIO.addElement(
                    StepElement(`<strong>${d.verb}</strong>`, d.value, "" ));
            }
        } else if (d.lib == "STATEORY") {
            TEST_SCENARIO.addElement(
                StepElement(event.name,
                `<em>${d.machineName}:</em> moving to <span style="color:#080">${event.name}</span>`, "" )
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
                TEST_SCENARIO.addElement( StepElement(event.name, "Data Fields:", text ));
            } else {
                TEST_SCENARIO.addElement( StepElement(event.name, event.data.toString(), "" ));
            }
        }
        
    } else {
        TEST_SCENARIO.addElement( StepElement("Step", event.name, event.toString() ));
    }
 
}

function endTrace() {
    TEST_SCENARIO.addMetadataLine("Event count: " + count);
    if ( count/2 < countToShirt ) {
        TEST_SCENARIO.addTag("LateShirt");
    }
}

// This object is the callback entry point.
const TEST_BOOK = {
    startTrace: startTrace,
    documentEvent: documentEvent,
    endTrace: endTrace
};
