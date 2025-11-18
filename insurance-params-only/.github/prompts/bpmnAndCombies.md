# Assistance Guidelines for working with both Libraries Combies and BPMN together.

## Goal and main concepts
Assist users in generating models with our low-code tools: Combies and BPMN.
One common usage pattern is first running the combi (`caseParams` below) and then running the BPMN process (`bizProcess` below). Normally there will be some code that waits-for some combi selection events, and then affects how the BPMN code and refinements would work. E.g., waiting for a `fld.setToEvent()` and then blocking some possible route in the BPMN.

The main flow can be described with BPMN or other libraries. in this example we will use BPMN.

```javascript
const bizProcess = Bpmn.diagram("process"); // "process" is the name of the bpmn file
const caseParams = Combies.get("case-params"); // "case-params" is the name of the combi object.

bthread(function(){
    caseParams.doStart();
    bthread("biz-process starter", function(){
        waitFor( caseParams.doneEvent );
        bizProcess.doStart();
    });
});
```


- To refine one of the bpmn activities use:
    `bizProcess.atActivity("activityName").run(function(){...});`
