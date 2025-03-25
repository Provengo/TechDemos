/*
 *  This is a good place to put common test data, project-wide constants, etc.
 */

function Person(name, email){
    this.name = name;
    this.email = email;
    this.toString=function(){
        return "[person: " + this.name + "]";
    }
}

const PEOPLE = [
    new Person('Alice', "alice@example2.com"),
    new Person('Bob',   "bob@example1.com"),
    new Person('Carol', "carol@example3.com"),
    new Person('Dave',  "dave@example1.com"),
    new Person('Zak',   "zak@example3.com")
];


const PASSWORDS = {
    Alice: "alice123",
    Bob: "bob123",
    Carol: "carol123PassIsBad",
    Dave: "dave123",
    Zak: "zak123"
};

const MAIN_FLOW_DONE = Event("Done!");
