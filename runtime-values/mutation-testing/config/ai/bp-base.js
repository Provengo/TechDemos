// it is forbidden for A to happen after B and C.
bthread("No A after B and C", function() {
    waitFor("B");
    waitFor("C");
    halt("No A after B and C");
});

// A may happen
if ( maybe("A") ) {
    // handle("A");
}

// A has become true
maybeEvent("A").yes;

// A has become false
maybeEvent("A").no;

// A has received a value
maybeEvent("A").any;

// A may be x, y, or z
let a = select("A").from("x","y","z");

// wait for any value of A
waitFor( select("A").any );

// request A, B, and then C while blocking D
block(D, function(){
    request(A);
    request(B);
    request(C);
});

