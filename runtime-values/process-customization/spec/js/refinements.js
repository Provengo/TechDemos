// @provengo summon rtv

const autos = EventCategory.create("automations", {color: "#68c68a"});

flow.refine("selectUser").with(function () {
    let customer = select("customer").from(CUSTOMERS);
    rtv.doStore("customer", customer);
});

flow.refine("doSomeStuff").with(function () {
    autos.do("Say Hi, @{customer.name}!");
});

flow.refine("enterUserDetails").with(function () {
    if ( bp.store.get("email") ) {
        autos.do("Send email to @{customer.email}");
    } 
    if ( bp.store.get("mobile") ) {
        autos.do("Send text to @{customer.mobile}");
    }
});

flow.refine("doSomeMoreStuff").with(function () {
    autos.do("Send coupon to @{customer.name}!");
});
