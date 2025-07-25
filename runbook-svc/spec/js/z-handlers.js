/** This is the object that we use to connect a Provengo action to its corresponding Automic action.
 * It uses the objectName and objectType to identify the Automic action.
 */
const AUTOMIC_ACTIONS = {
  upsert: {
    objectName: "UPSERT_USER",
    objectType: "JOBP",
  },
  "generate user": {
    objectName: "GENERATE_USER",
    objectType: "JOBP",
  },
  "send email": {
    objectName: "SEND_EMAIL",
    objectType: "JOBP",
  },
  iis: {
    objectName: "IIS",
    objectType: "JOBP",
  },
  linux: {
    objectName: "LINUX",
    objectType: "JOBP",
  },
};

//handlers
actionsSVC.refine("Upsert Project OU").with(function () {
  withAutomic(AUTOMIC_ACTIONS["upsert"].objectName);
});
actionsSVC.refine("Generate User").with(function () {
  withAutomic(AUTOMIC_ACTIONS["generate user"].objectName);
});
actionsSVC.refine("Send Email").with(function () {
  withAutomic(AUTOMIC_ACTIONS["send email"].objectName);
});
actionsSVC.refine("Run Linux Command").with(function () {
  withAutomic(AUTOMIC_ACTIONS["linux"].objectName);
});
actionsSVC.refine("Run IIS Command").with(function () {
  withAutomic(AUTOMIC_ACTIONS["iis"].objectName);
});
