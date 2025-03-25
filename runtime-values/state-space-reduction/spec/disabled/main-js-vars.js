// @provengo summon rtv

bthread("main", function() {
    let psn = choose(PEOPLE);
    bp.log.info(`Selected person: ${psn}`);
    request(Event(`call ${psn.name}`));
    request(Event(`email ${psn.email}`));
    let domain = psn.email.split('@')[1];
    request(Event(`at: ${domain}`));
    request(Event(`Use password: ${PASSWORDS[psn.name]}`));
    request(MAIN_FLOW_DONE);
});