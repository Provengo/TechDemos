/*
 *  This is a good place to put common test data, project-wide constants, etc.
 */

const SAMPLE_PARAMS = {
  parameters: {
    value: {
      svcProjectName: "Project name",
      isKerberos: true,
      siteUrl: "sample.sample.com",
      serverType: "linux",
    },
  },
};

/**
 * The main DRP process, defined in the BPMN file drp.bpmn.
 */
// const drpProcess = Bpmn.diagram("drp");

/**
 * Controlling automation level at the model. Essentially, the model's "resolution".
 */
const AUTOMATION_MODES = {
  /** Invoke, wait for external system reply */
  FULL: "full",
  /** Only mark that an invocation will happen */
  MARK_ONLY: "mark-only",
};

/** The active level of automation in the model. */
const AUTOMATION_MODE = getEnv("AUTOMATION_MODE") || AUTOMATION_MODES.MARK_ONLY;
// const AUTOMATION_MODE = (getEnv("AUTOMATION_MODE")) || AUTOMATION_MODES.FULL;

/**
 * The automation's event category and code.
 */
const actions = EventCategory.create("automic", {
  color: "#000055",
});

const AUTOMIC_RESPONSE_EVENT_NAME = "Automic response";

bp.log.info("Automation mode: " + AUTOMATION_MODE);

/**
 * Send out only instructions for Automic.
 */
const EVENT_OUTPUT_FILTER = actions.any;

function entriesTo(bpmnNodeName) {
  return EventSets.anyOf(
    drpProcess.getIncomingEventsTo(drpProcess.getIdForName(bpmnNodeName))
  );
}
