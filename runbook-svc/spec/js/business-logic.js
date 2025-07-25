/* @provengo summon eventcategory */
/* @provengo summon rtv */


// Using the EventCategory library to define the actions available in the service account creation process.
const actionsSVC = EventCategory.create("Actions", {
  names: [
    "Handle IIS",
    "Handle Linux",
    "Upsert Project OU",
    "Generate User",
    "Send Email",
    "Run Linux Command",
    "Run IIS Command",
    "Send Keytab",
  ],
  color: "#FF6F61",
});

// if ( LogicLayer.requestData()?.parameters?.value?.serverType ) {
//   bp.log.info("Checking server type.");

//   if (LogicLayer.requestData().parameters.value.serverType === "linux") {
//     Constraints.block(selectEvent("serverType","iis") ).forever()
// } else {
//   Constraints.block(selectEvent("serverType","linux") ).forever()
//   }
// }
if ( LogicLayer.requestData()?.parameters?.value?.isKerberos ) {
  bp.log.info("Checking need for Kerberos authentication.");
  if (LogicLayer.requestData().parameters.value.isKerberos === true) {
    Constraints.block(maybeEvent("isKerberos").no ).forever()
  } else {
    Constraints.block(maybeEvent("isKerberos").yes ).forever()
  }
}

// main bthread of this project.
bthread("SVC", function () {
  if (LogicLayer.requestData()) {
    bp.log.info("Request data: {0}", LogicLayer.requestData());
  } else {
    bp.log.info("Request data is null.");
  }
  actionsSVC.doUpsertProjectOu();
  actionsSVC.doGenerateUser();
  actionsSVC.doSendEmail("Password generated successfully.");

  if(maybe("isKerberos")){
    let type= select("serverType").from("linux","iis");
    if(type==="linux"){
        actionsSVC.doRunLinuxCommand();
    }
    else{
        actionsSVC.doRunIisCommand();
    }
  }
  actionsSVC.doSendKeytab();
});

if (LogicLayer.isInServer()) {
  bp.log.info("Running IN SERVER, environment simulation OFF.");
} else {
  bp.log.info("Running OUT OF SERVER, environment simulation ON.");
  bthread("sim env", function () {
    waitFor(Ctrl.markEvent("ready"));
    request(Event("EXTERNAL", { num: 1 }));
  });
}


/// add like the example on svc with the maybeEvent- on the Question isKerberos?
