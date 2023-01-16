// @provengo summon combi
// @provengo summon constraints

const rec = Combi("case");

/** The applicant may be a part of a collective, an individual, or previously a part of a collective. */
const isCollective = rec.field("collective")
                        .isOneOf(["collective","individual","expired"]);

/** A claimant may need to update her contact details. */
const isContactDetailsUpdateRequired = rec.yesNoField("isContactDetailsUpdateRequired");

/** Topics not covered by the policy */
const excludedTopics = ["operations","excluded illnesses","excluded medicines"];

/** Topics that are covered by the policy */
const coveredTopics = ["treatments","counselling","tests"];

/** A claim topic is selected covered and non-covered topic lists. */
const claimTopic = rec.field("claimTopic").isOneOf(coveredTopics.concat(excludedTopics));                    

/** The claim amount. Selected amounts that correspond to thresholds within the company's business logic. */
const claimAmount = rec.field("claimAmount").isOneOf(["100","1000","2000","2001","10000"]);

/** A policy may cover more than a single person. */
const policyPersonCount = rec.field("personCount").isOneOf("1","2","4","8");

/** The claimant may or may not be the primary person on the policy. */
const isPrimary = rec.yesNoField("isPrimary");

/** The claimant may or may not submit the claim for herself. */
const isSelfClaim = rec.yesNoField("isSelfClaim");

/** The claimant may or may not be a child. */
const isChild = rec.yesNoField("isChildPlaintiff");

/** A claim might be covered by more than a single policy. */
const hasMultiCoverage = rec.yesNoField("hasMultiCoverage");

/** A policy may or may not be valid */
const isPolicyValid = rec.yesNoField("isPolicyValid");        
/** The tariff may or may not be valid */
const isTariffValid = rec.yesNoField("isTariffValid");

/** A policy may have existing claims filed under it */
const hasExistingClaims = rec.yesNoField("hasExistingClaims");

/** The claimant might have unpaid company bills */
const hasDebts = rec.yesNoField("in debts");

/** The expected result of processing the claim is Accept, Manual, or Reject. */
const expectedResult = rec.field("expectedResult").isOneOf(["Accept","Manual","Reject"]);

//\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\
// Logic and parameter inter-connections
//\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\

/** if a policy is not valid, all its tariffs are invalid */
isPolicyValid.whenSetTo(Combi.NO)
            .field( isTariffValid ).mustBe( Combi.NO );

/** 
 * If the policy covers only one person, that person is the primary insured, and the case must be a self-claim case. */
policyPersonCount.whenSetTo("1")
                 .field( isPrimary ).mustBe(Combi.YES)
                 .field( isSelfClaim ).mustBe(Combi.YES);

/** 
 * Non-primary insured can only claim for themselves. */
isPrimary.whenSetTo(Combi.NO)
         .field( isSelfClaim ).mustBe(Combi.YES);

/**
 * Excluded topics are routed to previous system  */ 
bthread("non-amb-stopper", function(){
    var e = waitFor(claimTopic.anySetEvent);
    if ( excludedTopics.indexOf(e.data.value) > -1 ) {
        bp.store.put("covered", false);
        delete e;
        rec.doStop();
    
    } else {
        bp.store.put("covered", true);
    }
});



// //\/\/\/\/\/\/\/ Expected routing

// If the claimant has debts or the tariff is invalid, the claim must be rejected.
const mustBeRejected = hasDebts.setToEvent(Combi.YES)
                    .or(isTariffValid.setToEvent(Combi.NO));

// If the claim amount is above 2000 or there's a multi-coverage, the claim must 
//  go through manual process.
const mustBeManual = claimAmount.setToEvent("2001").or(claimAmount.setToEvent("10000"))
                                .or(hasMultiCoverage.setToEvent(Combi.YES));

// If a claim can be Rejected, it must be Rejected.
Constraints.after(mustBeRejected)
           .block(
                expectedResult.setToEvent("Accept").or( expectedResult.setToEvent("ManualAcceptance"))
            ).until(rec.doneEvent);
    
// If a claim can't be Rejected but can be Manually handled, it must be manually handled
Constraints.unless( mustBeRejected )
           .after( mustBeManual )
           .block(
                expectedResult.setToEvent("Accept").or( expectedResult.setToEvent("Reject") )
            ).until(rec.doneEvent);

// Claims that cannot be rejected or manually handled must be accepted.
Constraints.unless( mustBeRejected )
            .after( expectedResult.startEvent )
            .block( expectedResult.setToEvent("Reject") )
            .until( expectedResult.anySetEvent );

Constraints.unless( mustBeManual )
            .after( expectedResult.startEvent )
            .block( expectedResult.setToEvent("Manual") )
            .until( expectedResult.anySetEvent );

rec.doStart();
