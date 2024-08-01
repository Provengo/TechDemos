// @provengo summon rtv
// @provengo summon rest

const svc = new RESTSession(SERVER_ENDPOINT, "client", {
    headers: {"Content-Type":"application/json"}
});

/**
 * quick sanity - list customers, see that we get what we expect
 */
mainSm.at("start").run(function(){
    // reset the data to reduce flakey-ness
    svc.put("/reset", {
        body:JSON.stringify({action:"reset"})
    });

    // test beings.
    svc.get("/customers", {
        callback: function(response, rtv){
            const respObj = JSON.parse(response.body);
            rtv.set(RT_KEYS.customer_count, respObj.length);
            return true;
        }
    });
});

mainSm.at("add-new").run(function(){
    const fName = select("first_name").from("Joe", "Jane", "John", "Jill");
    const lName = select("last_name").from("Katz", "Smith", "Doe", "Johnson");
    const age = select("age").from("15", "30", "45", "75");
    svc.post("/customers", {
        body: JSON.stringify({
                "first_name":fName,
                "last_name":lName,
                "age": age,
                "address":"student Test address"
            }),
        callback: function(response, rtv){
            const respObj = JSON.parse(response.body);
            if ( ! respObj.success ) return false;
            rtv.set(RT_KEYS.customer_id, respObj.response.ID);
            return true;
        }
    });
});

/**
 * Check that the customer ID is in the customer list
 */
mainSm.at("check").run(function(){
    svc.get("/customers", {
        callback: function(response, rtv){
            const respObj = JSON.parse(response.body);
            let ids = respObj.map(c => c.ID);
            return ids.includes(rtv.get(RT_KEYS.customer_id));
        },
        expectedResponseCodes: [200]
    });
});

mainSm.at("delete").run(function(){
    if ( maybe("rainyDayDelete") ) {
        svc.delete("/customers", {
           parameters: {"id":"@{customer_id}XXXXXXX"},
           expectedResponseCodes: [404]
        });    
    }
    svc.delete("/customers", {
        parameters:{"id":"@{customer_id}"},
        expectedResponseCodes: [200],
        callback: function(response, rtv){
            const respObj = JSON.parse(response.body);
            return respObj.success;
        }
    });
    svc.get("/customers", {
        callback: function(response, rtv){
            const respObj = JSON.parse(response.body);
            let ids = respObj.map(c => c.ID);
            return ! ids.includes(rtv.get(RT_KEYS.customer_id));
        },
        expectedResponseCodes: [200]
    });
});

mainSm.at("end").run(function(){
    
});

mainSm.at("load-existing").run(function(){
    let cst_id = select("customer_id").from(INITIAL_CUSTOMERS.map(c => c.ID));
    rtv.doStore(RT_KEYS.customer_id, cst_id);
});


mainSm.at("update").run(function(){
    // maybe attempt a bad update
    if ( maybe("rainyDayUpdate") ) {
        svc.put("/customers",{ 
            parameters:  {"id":"@{RT_KEYS.customer_id}XXXXXXX"},
            body: JSON.stringify({
                "first_name":"Joe",
                "last_name":"Katz",
                "age": "15",
                "address":"student Test address"
            }),
            expectedResponseCodes: [404]
        });
    }

    // update current customer
    svc.put("/customers", {
        parameters: {"id":"@{customer_id}"},
        body: JSON.stringify({
            "first_name":"updated first name",
            "last_name":"updated last name",
            "age": "40",
            "address":"updated address"
        }),
        expectedResponseCodes: [200, 201, 202],
        callback: function(response, rtv){
            const respObj = JSON.parse(response.body);
            return respObj.success;
        }
    });

    // validate the update worked
    svc.get("/customers", {
        callback: function(response, rtv){
            const respObj = JSON.parse(response.body);
            let customer = respObj.find(c => c.ID == rtv.get(RT_KEYS.customer_id));
            return customer.first_name == "updated first name" &&
                   customer.last_name == "updated last name" &&
                   customer.age == "40" &&
                   customer.address == "updated address";
        },
        expectedResponseCodes: [200]
    });
});

