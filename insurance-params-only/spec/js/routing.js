/*******************************************************
 * Routing expected outcomes based on case parameters. *
 *******************************************************/

// If the claimant has debts or the tariff is invalid, the claim must be rejected.
const mustBeRejected = hasDebts.setToEvent(Combi.YES)
                               .or(isTariffValid.setToEvent(Combi.NO));

// If the claim amount is above 2000, the claim must go through manual approval process.
const mustBeManual = claimAmount.anySetEvent.and( EventSet(">2000", function(e){
    if ( e?.data?.value ) {
        return (Number(e?.data?.value) > 2000);
    } else return false;
}));

// If a claim can be Rejected, it must be Rejected.
bthread("Rejection enforcer", function(){
    interrupt( caseParams.doneEvent, function(){
        sync({
            waitFor: mustBeRejected
        });
        expectedResult.mustBe("Reject");
    });
});

    
// If a claim can't be Rejected but can be Manually handled, it must be manually handled
bthread("Manual enforcer", function(){
    interrupt( caseParams.doneEvent.or(mustBeRejected), function(){
        sync({
            waitFor: mustBeManual
        });
        block( 
            expectedResult.anySetEvent.except( expectedResult.setToEvent("Manual"))
        );
    });
});          


// Claims that cannot be rejected or manually handled must be accepted.
Constraints.unless( mustBeRejected )
            .after( expectedResult.startEvent )
            .block( expectedResult.setToEvent("Reject") )
            .until( expectedResult.anySetEvent );

Constraints.unless( mustBeManual )
            .after( expectedResult.startEvent )
            .block( expectedResult.setToEvent("Manual") )
            .until( expectedResult.anySetEvent );


