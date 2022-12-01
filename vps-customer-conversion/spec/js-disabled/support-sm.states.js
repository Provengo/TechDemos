const supportSm = StateMachine("support", {autoStart: false});

supportSm.connect("triage").to("l1").to("l2").to("l3").to("solved");
supportSm.connect("l1").to("solved");
supportSm.connect("l2").to("solved");
supportSm.connect("triage").to("solved");

flow.at("support").embed(supportSm);