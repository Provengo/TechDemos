/*
 *  This is a good place to put common test data, project-wide constants, etc.
 */

const SERVER_ENDPOINT = 'http://localhost:3003';

/**
 * Keys for runtime values - so that we don't mis-spell stuff
 * and get annoying runtime errors.
 */
const RT_KEYS = {
    "customer_count": "customer_count",
    "customer_id": "customer_id"
};

/**
 * Initial existing customers, copied verbatim from the RestAPISimulator data folder.
 */
const INITIAL_CUSTOMERS = [
    {
        "ID":"l3b7f4pfwra1pmti1qb",
        "first_name":"James",
        "last_name":"Jamesowitch",
        "age": "25",
        "address":"14 JJ Road, Jamesvile"
    },
    {
        "ID":"l3b89i4db2exeypliws",
        "first_name":"Janet",
        "last_name":"Tenaj",
        "age": "32",
        "address":"Rue de Janet, Tenajtown"
    },
    {
        "ID":"l3b89qnxhugfuapmtpn",
        "first_name":"Gobi",
        "last_name":"Goberman",
        "age": "22",
        "address":"Gobi Street, Gobi City"
    },
    {
        "ID":"l3b89vsg71sy70auph7",
        "first_name":"Bob",
        "last_name":"LeBuilderr",
        "age": "45",
        "address":"Builders Blvd, Bobbington"
    }
];

const CUSTOMER_IDS = INITIAL_CUSTOMERS.map(c => c.ID);