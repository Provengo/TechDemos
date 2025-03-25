// @provengo summon rtv

bthread("main", function() {
    rtv.doStore("person", choose(PEOPLE));
    request(Event("call @{person.name}"));
    request(Event("email @{person.email}"));
    request(Event("at @{person.email.split('@')[1]}")); // See below
    request(Event(`Use password: @{PASSWORDS[person.name]}`));
    request(MAIN_FLOW_DONE); 
});

/*
 
// People that don't like doing complex inline calculations, 
//  can use the rtv.run event to perform these calculations
//  in a more relaxed manner.
rtv.run( function(data){
    let person = data.get("person");
    let domain = person.email.split('@')[1];
    data.set("domain", domain);
});

 */