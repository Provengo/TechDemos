// @provengo summon combi
// @provengo summon constraints

const rec = Combi("case");

// Collective insurance can apply, not apply, or previously apply
const isCollective = rec.field("collective")
                        .isOneOf(["collective","individual","expired"]);

// non-ambulatory treatments
const nonAmbulatoryTopics = ["operations","severeIllnesses","unfundedMedicines","transplants"];

// ambulatory treatments
const ambulatoryTopics = ["treatments","nonOperationCounselling","tests"];

// dual coverage
const hasMultiCoverage = rec.yesNoField("hasMultiCoverage");

// Claim topic can be ambulatory or non-ambulatory
const claimTopic = rec.field("claimTopic")
                      .isOneOf(ambulatoryTopics.concat(nonAmbulatoryTopics));                    
                    
const isPolicyValid = rec.yesNoField("isPolicyValid");
          
const isTariffValid = rec.yesNoField("isTariffValid");

// if a policy is not valid, all its tariffs are invalid
isPolicyValid.whenSetTo(Combi.NO)
            .field( isTariffValid ).mustBe( Combi.NO );

const policyPersonCount = rec.field("personCount").isOneOf(["1","2","4","8"]);

const isPrimary = rec.yesNoField("isPrimary");

const isSelfClaim = rec.yesNoField("isSelfClaim");

const isChild = rec.yesNoField("isChildPlaintiff");

const hasExistingClaims = rec.yesNoField("hasExistingClaims");

const hasForeclosure = rec.yesNoField("hasForeclosure");

const hasDebts = rec.yesNoField("hasDebts");

const claimAmount = rec.field("claimAmount").isOneOf(["100","1000","2000","2001","10000"]);

const isOtherHealthcareInvolved = rec.yesNoField("isOtherHealthcareInvolved");

const hasHierarchyException = rec.yesNoField("hasHierarchyException");

const isMailUpdateRequired = rec.field("isMailUpdateRequired").isOneOf(["Yes", "No"]);

const expectedRoute = rec.field("expectedRoute").isOneOf(["Green","Yellow","Red"]);

// -----
// Logic and parameter inter-connections

// If the policy covers only one person, that person is the primary insured.
policyPersonCount.whenSetTo("1")
                 .field( isPrimary ).mustBe(Combi.YES)
                 .field( isSelfClaim ).mustBe(Combi.YES);

// Non-primary insured can only claim for themselves.
isPrimary.whenSetTo("No")
         .field( isSelfClaim ).mustBe(Combi.YES);

// Non-ambulatory topics are routed to previous system
bthread("non-amb-stopper", function(){
    var e = waitFor(claimTopic.anySetEvent);
    if ( nonAmbulatoryTopics.indexOf(e.data.value) > -1 ) {
        bp.store.put("ambulatory", false);
        delete e;
        rec.doStop();
    
    } else {
        bp.store.put("ambulatory", true);
    }
});

// //\/\/\/\/\/\/\/ Expected routing

// Cases that require RED
const mustBeRed = hasDebts.setToEvent(Combi.YES)
                    .or(hasForeclosure.setToEvent(Combi.YES))
                    .or(isTariffValid.setToEvent(Combi.NO));

// Cases that require YELLOW
const mustBeYellow = claimAmount.setToEvent("2001").or(claimAmount.setToEvent("10000"))
                                .or(hasHierarchyException.setToEvent(Combi.YES))
                                .or(isOtherHealthcareInvolved.setToEvent(Combi.YES));

// If it can be RED, it must be RED.
Constraints.after(mustBeRed)
           .block(
                expectedRoute.setToEvent("Green").or( expectedRoute.setToEvent("Yellow"))
            ).until(rec.doneEvent);
    
// If it can't be RED but can be YELLOW, it must be YELLOW
Constraints.unless( mustBeRed )
           .after( mustBeYellow )
           .block(
                expectedRoute.setToEvent("Green").or( expectedRoute.setToEvent("Red") )
            ).until(rec.doneEvent);

// If it's not RED or YELLOW, it's GREEN
Constraints.unless( mustBeRed )
            .after( expectedRoute.startEvent )
            .block( expectedRoute.setToEvent("Red") )
            .until( expectedRoute.anySetEvent );

Constraints.unless( mustBeYellow )
            .after( expectedRoute.startEvent )
            .block( expectedRoute.setToEvent("Yellow") )
            .until( expectedRoute.anySetEvent );

rec.doStart();
