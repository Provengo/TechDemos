/*
 *  This is a good place to put common test data, project-wide constants, etc.
 */

const Person = {
    toString: function(){
        return "[person: " + this.name + "]";
    }
}
const PEOPLE = [
    { name: 'Alice', email: "alice@example2.com" },
    { name: 'Bob',   email: "bob@example1.com" },
    { name: 'Carol', email: "carol@example3.com"},
    { name: 'Dave',  email: "dave@example1.com" },
    { name: 'Zak',   email: "zak@example3.com" }
];

PEOPLE.forEach( p => {
    Object.setPrototypeOf(p, Person);
    bp.log.info( p.toString() );
});

const PASSWORDS = {
    Alice: "alice123",
    Bob: "bob123",
    Carol: "carol123PassIsBad",
    Dave: "dave123",
    Zak: "zak123"
};

const MAIN_FLOW_DONE = Event("Done!");
