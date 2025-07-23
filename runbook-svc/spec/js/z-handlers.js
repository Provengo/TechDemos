const automicActions = {
  "upsert": {
    objectName: "UPSERT_USER",
    objectType: "JOBP",
  },
  "generate password": {
    objectName: "GENERATE_PASSWORD",
    objectType: "JOBP",
  },
  "send pass": {
    objectName: "SEND_PASSWORD",
    objectType: "JOBP",
  },
  "iis": {
    objectName: "IIS",
    objectType: "JOBP",
  },
  "linux": {
    objectName: "LINUX",
    objectType: "JOBP",
  },
};

//handlers 
actionsSVC.refine("Upsert Project OU").with(upsertOU);
actionsSVC.refine("Generate User").with(generatePass);
actionsSVC.refine("Send Password").with(sendPass);
actionsSVC.refine("Run Linux Command").with(handleLinux);
actionsSVC.refine("Run IIS Command").with(handleIis);
