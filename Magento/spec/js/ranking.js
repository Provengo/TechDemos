function goal_based_ranking_function(ensemble) {
    const goal_count = ensemble.filter(test => test.some((e) => e.name == "GOAL")).length
    return -goal_count
}


function variety_based_ranking_function(ensemble) {
    let set = new Set();

    for (let test of ensemble) {
        for (var i in test) {
            for (var j in test) {
                if (j > i) set.add([test[i], test[j]]);
            }
        }
    }
    return set.size;
}

function shipping_ranking_function(ensemble) {
    let found=0;
    let winAddStart=false;
    let winAddEnd=false;
    let winCheckoutEnd=0;
    let checkoutFound = 0;
    let winSize = 20;
    let runCode = false;

    // bp.log.info('\n\n//start')

    for (let test of ensemble) {
        checkoutFound = 0
        iFound = false
        for (let i in test) {
            // bp.log.info(test[i].name)
            if (test[i].name.includes('Click') && test[i].name.includes('the_Checkout')) {
                // bp.log.info('//found click CheckOutStory')
                checkoutFound = 1
                currentUser = test[i].session.split("_")[4]+'_'+test[i].session.split("_")[5] ;
                // bp.log.info('//found Click CheckoutStory in windows of '+checkoutFound+' for "'+currentUser+'"')

                winAddStart=false
                winAddEnd=false
            } else {
                if (checkoutFound && checkoutFound < winSize) {
                    checkoutFound += 1
                    if (test[i].name.includes(currentUser) && test[i].name.includes('message-success') && test[i].name.includes('Add_to_cart')){
                        // bp.log.info('//found WaitForVisibility AddToCartStory in windows of '+checkoutFound +' for "'+currentUser+'"')
                        winAddEnd=true
                    }
                    if (test[i].name.includes(currentUser) && test[i].name.includes('RunCode') ){
                        // bp.log.info('//found WaitForVisibility RunCode in windows of '+checkoutFound +' for "'+currentUser+'"')
                        runCode = true
                    }
                    if (runCode && winAddEnd && test[i].name.includes(currentUser) && test[i].name.includes('Your order number is') ){
                        iFound = true
                        // bp.log.info('//found WaitForClickable CheckOutStory after winAddEnd in windows of '+checkoutFound +' for "'+currentUser+'"')
                        checkoutFound=0         // end of checkout windows
                    }

                } else {
                    // checkoutFound = 0
                    winAddStart = false
                    winAddStart = false
                    runCode = false
                    winAddEnd = false
                }
            }
        }
        if (iFound)
            found+=1
        iFound = false
    }
    bp.log.info('//*found-'+found)
    return found;
}


function order_based_ranking_function(ensemble) {
    let set10 = new Set();
    let set20 = new Set();

    for (let test of ensemble) {
        set10.add(test[10])
        set10.add(test[20])
    }
    return set10.size + set20.size;

}


function deferred_events_ranking_function(ensemble) {
    let dict = {}

    for (let test of ensemble) {
        for (let i in test) {
            if (!(test[i] in dict) || (i > dict[test[i]])) {
                dict[test[i]] = i
            }
        }
    }

    let sum = 0.0
    for(let x in dict) {
        sum = sum + (dict[x]/100)
    }

    return sum
}


rankingFunction = shipping_ranking_function

