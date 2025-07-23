function upsertOU() {
  withAutomic(automicActions["upsert"].objectName);
}
function generatePass() {
  withAutomic(automicActions["generate password"].objectName);
}
function sendPass() {
  withAutomic(automicActions["send pass"].objectName);
}
function handleLinux() {
  withAutomic(automicActions["linux"].objectName);
}
function handleIis() {
  withAutomic(automicActions["iis"].objectName);
}
