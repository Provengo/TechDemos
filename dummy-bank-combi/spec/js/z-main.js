/**
 *  This file contains the main orchestrating b-thread of the tests. You can choose between running the case parameters, the 
 *  user-interface state machine, or both.
 */

/**  Run the case parameters combi */
const RUN_COMBI = true;
/**  Run the state machine */
const RUN_SM    = true;

/** Main b-thread, coordinates and runs the combi and state machine based on the above const values. */
bthread("main", function start() {
  if ( RUN_COMBI ){
    bank.doStart();
    waitFor(bank.doneEvent);
  }
  if ( RUN_SM ) {
    const sm = getSm();
    sm.doStart();
  }
});