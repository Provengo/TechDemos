/* @provengo summon eventcategory */
/* @provengo summon rtv */


const actionsSVC = EventCategory.create("Actions", {
  names: [
    "Handle IIS",
    "Handle Linux",
    "Upsert Project OU",
    "Generate User",
    "Send Password",
    "Run Linux Command",
    "Run IIS Command",
    "Send Keytab",
  ],
  color: "#FF6F61",
});

function generatePassword() {
  var length = 8,
    charset = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789",
    retVal = "";
  for (var i = 0, n = charset.length; i < length; ++i) {
    retVal += charset.charAt(Math.floor(Math.random() * n));
  }
  return retVal;
}

bthread("SVC", function () {
  if (LogicLayer.requestData()) {
    bp.log.info("Request data: {0}", LogicLayer.requestData());
  } else {
    bp.log.info("Request data is null.");
  }
  actionsSVC.doUpsertProjectOu();
  actionsSVC.doGenerateUser();
  rtv.doStore("password",generatePassword());
  let p = "@{password}";
  actionsSVC.doSendPassword(p);

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