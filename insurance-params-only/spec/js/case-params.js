// @provengo summon combi
// @provengo summon constraints


/************************************************
 * Setting up the parameters for each test case *
 ************************************************/

/** The applicant may be a part of a collective, an individual, or previously a part of a collective. */
const isCollective = caseParams.field("collective")
                        .isOneOf(["collective","individual","expired"]);

/** Medical topics that may be claimed for */
const claimTopics = ["operations","illnesses","medicines",
                            "treatments","counseling"];

/** A claim topic is selected covered and non-covered topic lists. */
const claimTopic = caseParams.field("claimTopic").isOneOf(claimTopics);                    

/** The claim amount. Selected amounts that correspond to thresholds within the company's business logic. */
const claimAmount = caseParams.field("claimAmount").isOneOf(["100","1000","2000","2001","10000"]);

/** A policy may cover more than a single person. */
const policyPersonCount = caseParams.field("personCount").isOneOf("1","2","4","8");

/** The claimant may or may not be a child. */
const isChild = caseParams.yesNoField("isChildPlaintiff");

/** The claimant may or may not be the primary person on the policy. */
const isPrimary = caseParams.yesNoField("isPrimary");

/** The claimant may or may not submit the claim for herself. */
const isSelfClaim = caseParams.yesNoField("isSelfClaim");

/** A policy may or may not be valid */
const isPolicyValid = caseParams.yesNoField("isPolicyValid");        

/** The tariff may or may not be valid */
const isTariffValid = caseParams.yesNoField("isTariffValid");

/** A policy may have existing claims filed under it */
const hasExistingClaims = caseParams.yesNoField("hasExistingClaims");

/** The claimant might have unpaid company bills */
const hasDebts = caseParams.yesNoField("debts");

/** The expected result of processing the claim is Accept, Manual, or Reject. */
const expectedResult = caseParams.field("expectedResult").isOneOf(["Accept","Manual","Reject"]);

/*****************************************
 * Logic and parameter inter-connections *
 *****************************************/

// if a policy is not valid, all its tariffs are invalid 
isPolicyValid.whenSetTo(Combi.NO)
            .field( isTariffValid ).mustBe( Combi.NO );


// If the policy covers only one person, that person is the primary insured, and the case must be a self-claim case. 
policyPersonCount.whenSetTo("1")
                 .field( isPrimary ).mustBe(Combi.YES)
                 .field( isSelfClaim ).mustBe(Combi.YES);

// Non-primary insured can only claim for themselves. 
isPrimary.whenSetTo(Combi.NO)
         .field( isSelfClaim ).mustBe(Combi.YES);

// Children can only claim for themselves
isChild.whenSetTo(Combi.YES)
            .field( isSelfClaim ).mustBe(Combi.YES);

