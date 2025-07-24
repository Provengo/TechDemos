/*
 *  This is a good place to put common test data, project-wide constants, etc.
 */
// @provengo summon EventCategory

const flow = EventCategory.create("flow", {
    names: ["selectUser", "doSomeStuff", "enterUserDetails", "doSomeMoreStuff", "done"],
    color: "#92d6ef"
});

const CUSTOMERS = [
    {
        name: "John B. Dave",
        mobile: "(123) 456-1234",
        email: "john.dave@MGail.com"
    },
    {
        name: "Jane E. Smith",
        email: "jane.smith@example.com"
    },
    {
        name: "Alice M. Johnson",
        mobile: "(123) 456-2345",
    },
    {
        name: "Bob M. Brown",
        mobile: "(123) 456-3456",
    },
    {
        name: "Charlie E. Davis",
        email: "charlie.davis@example.com"
    },
    {
        name: "Diana E. Evans",
        email: "diana.evans@example.com"
    },
    {
        name: "Ethan B. Foster",
        mobile: "(123) 456-4567",
        email: "ethan.foster@example.com"
    },
    {
        name: "Fiona B. Green",
        mobile: "(123) 456-5678",
        email: "fiona.green@example.com"
    }
];


// Standard JS trickery to make prints easier to read.
const stringer = {
    toString: function(){
        return `Customer ${this.name}`;
    }
};

CUSTOMERS.forEach((customer) => {
    Object.setPrototypeOf(customer, stringer);
});
