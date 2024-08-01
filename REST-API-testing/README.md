# REST API Testing // Provengo

An example for testing a REST API system with Provengo.

## What's Here

* [RestAPISimulator](RestAPISimulator) A REST-API microservice for storing client data. Start by typing `npm start` from that directory.
* [StateMachine Tests](PvgStateMachine) A state-machine-based provengo test model for this.


## Running This Example

### Start the server: 

NOTE: You'll need [Node.js](https://nodejs.org/en/download/prebuilt-installer) installed for this server to run.

```shell
cd RestAPISimulator
npm start
```

To see that it's all working: http://localhost:3003/customers

### Run `provengo`

Run the `provengo` with the [PvgStateMachine](PvgStateMachine) model. This model consists of two layers: business logic and REST-API automation. The business logic layer is based on a state machine. The automation layer adds action hooks to that state machine to perform the automations at the correct sequence.

