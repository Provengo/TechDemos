/**
 * Watch for customer selection, then affect future flow based on properties.
 */

bthread("customizeFlow", function(){
    let customer = waitFor(select("customer").any()).data.value;
    bp.log.info(customer.toString());
    
    if ( customer.mobile ) {
        bp.store.put("mobile", true);
    }
    if ( customer.email ) {
        bp.store.put("email", true);
    }
});
