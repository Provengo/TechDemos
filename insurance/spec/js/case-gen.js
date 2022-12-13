// @provengo summon combi
// @provengo summon constraints

const rec = Combi("case");

/** The applicant may be part of a collective, or may be an individual, or may have been a part of a collective once. */
const isCollective = rec.field("collective")
                        .isOneOf(["collective","individual","expired"]);

/** Does the claimant need to update their contact details?
 * When YES, the client's first interaction with the site should be the contact details screen. */
const isContactDetailsUpdateRequired = rec.yesNoField("isContactDetailsUpdateRequired");

/** Topics not covered by the policy */
const excludedTopics = ["operations","excluded illnesses","excluded medicines"];

/** Topics that are covered by the policy */
const coveredTopics = ["treatments","counselling","tests"];

/** Claim topic */
const claimTopic = rec.field("claimTopic").isOneOf(coveredTopics.concat(excludedTopics));                    

/** The claim amount. Selected amounts that correspond to thresholds within the company's business logic. */
const claimAmount = rec.field("claimAmount").isOneOf(["100","1000","2000","2001","10000"]);

/** How many people are insured by the policy */
const policyPersonCount = rec.field("personCount").isOneOf("1","2","4","8");

/** Is the claimant the primary insured person? */
const isPrimary = rec.yesNoField("isPrimary");

/** Does the claim involves the claimant? */
const isSelfClaim = rec.yesNoField("isSelfClaim");

/** Is the claimant a child? */
const isChild = rec.yesNoField("isChildPlaintiff");

/** dual coverage */
const hasMultiCoverage = rec.yesNoField("hasMultiCoverage");

/** Validity of policy and tariffs. Note that a policy is composed of tariffs here. */
const isPolicyValid = rec.yesNoField("isPolicyValid");        
const isTariffValid = rec.yesNoField("isTariffValid");

/** Are there any existing claims on the policy? */
const hasExistingClaims = rec.yesNoField("hasExistingClaims");

/** Does the claimant have debts for the insurance company? */
const hasDebts = rec.yesNoField("hasDebts");

/** The expected result of processing the claim. */
const expectedResult = rec.field("expectedResult").isOneOf(["Accept","Manual","Reject"]);

//\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\
// Logic and parameter inter-connections
//\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\

/** if a policy is not valid, all its tariffs are invalid */
isPolicyValid.whenSetTo(Combi.NO)
            .field( isTariffValid ).mustBe( Combi.NO );

/** If the policy covers only one person, that person is the primary insured.  */
policyPersonCount.whenSetTo("1")
                 .field( isPrimary ).mustBe(Combi.YES)
                 .field( isSelfClaim ).mustBe(Combi.YES);

/**
Non-primary insured can only claim for themselves. */
isPrimary.whenSetTo(Combi.NO)
         .field( isSelfClaim ).mustBe(Combi.YES);

// Excluded topics are routed to previous system
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

// Cases that require Rejected
const mustBeRejected = hasDebts.setToEvent(Combi.YES)
                    .or(isTariffValid.setToEvent(Combi.NO));

// Cases that require Manual treatment
const mustBeManual = claimAmount.setToEvent("2001").or(claimAmount.setToEvent("10000"))
                                .or(hasMultiCoverage.setToEvent(Combi.YES));

// If it can be Rejected, it must be Rejected.
Constraints.after(mustBeRejected)
           .block(
                expectedResult.setToEvent("Accept").or( expectedResult.setToEvent("ManualAcceptance"))
            ).until(rec.doneEvent);
    
// If it can't be Rejected but can be Manually handled, it must be manually handled
Constraints.unless( mustBeRejected )
           .after( mustBeManual )
           .block(
                expectedResult.setToEvent("Accept").or( expectedResult.setToEvent("Reject") )
            ).until(rec.doneEvent);

// Otherwise, Accept
Constraints.unless( mustBeRejected )
            .after( expectedResult.startEvent )
            .block( expectedResult.setToEvent("Reject") )
            .until( expectedResult.anySetEvent );

Constraints.unless( mustBeManual )
            .after( expectedResult.startEvent )
            .block( expectedResult.setToEvent("Manual") )
            .until( expectedResult.anySetEvent );

rec.doStart();
