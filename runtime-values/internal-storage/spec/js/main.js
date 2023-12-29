// @provengo summon rtv

bthread("main", function() {
     
    rtv.doStore("person", choose(PEOPLE));
    request(Event("call @{person.name}"));
    request(Event("email @{person.email}"));
    request(Event(rtv.eval("emailing eval-ed @{person.email}")));
    rtv.run( function(data){
        let person = data.get("person");
        let domain = person.email.split('@')[1];
        data.set("domain", domain);
    });
    request(Event("at @{domain}"));
    rtv.doStore("password", "@{PASSWORDS[person.name]}" );
    rtv.assertEq("@{person.name.toLowerCase()}123","@{password}");
    rtv.assertEq("@{person.name.toLowerCase()}123","@{PASSWORDS[person.name]}");
    rtv.assertLe(1,2);
    rtv.assertLt("@{person.name.length}",2000);
});