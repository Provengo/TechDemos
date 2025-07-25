bthread("No linux auth for Kerberos", function () {
    waitFor(maybeEvent("isKerberos").yes);
    waitFor(selectEvent("serverType","linux"));

    halt("No linux for Kerberos auth");
});
