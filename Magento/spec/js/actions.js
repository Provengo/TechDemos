/**
 * An helper for defining actions.
 *
 * @param {string} name - The name of the action to be defined.
 * @param {Function} func - The function to be executed when the action is triggered. This function should accept two parameters: the session and the data associated with the action.
 *
 * The function adds a new method to the SeleniumSession object. This method, when called, triggers the start of the action and executes the provided function.
 * The function also blocks any other start actions in the same session while the provided function is being executed.
 *
 */
defineAction = function (name, func) {
    // Check that the name is a valid identifier
    if (!/^[_$a-zA-Z\xA0-\uFFFF][_$a-zA-Z0-9\xA0-\uFFFF]*$/.test(name)) {
        throw new Error('The name parameter must be a valid identifier');
    }
    // Check that func is a function
    if (typeof func !== 'function') {
        throw new Error('The func parameter must be a function');
    }

    // Define an event filter for start events in a session
    const AnyStartInSession = function (s) {
        return EventSet("AnyStartInSession-" + s, function (e) {
            return e.data !== null && e.data.hasOwnProperty('startEvent') && e.data.startEvent && String(s).equals(e.data.session.name);
        });
    };

    // Add the new action to the SeleniumSession prototype
    SeleniumSession.prototype[name] = function (data) {
        // Merge the session and startEvent properties into the data object
        data = Object.assign({ session: this, startEvent: true }, data);

        // Request a start event
        request(Event(`Start(${name})`, data));

        // Block any other start events in the session while the function is executing
        block(AnyStartInSession(this.name), function () {
            func(data.session, data);
        });

        // Request an end event
        request(Event(`End(${name})`, data));
    };
}


/***********************************************************************************
 * Login to the store as a user.
 *
 * Parameters:
 *   username: string - The user that logs in
 *   password: string - The password of that user
 ************************************************************************************/
defineAction("Login", function (session, event) {
    
    // Use the session object's methods
    with (session) {

        // Click on the account trigger button
        click("//button[contains(@class,'accountTrigger-trigger-23q clickable-root-1HB')]");

        // Wait until the sign-in title is visible
        waitForVisibility("//span[contains(@class,'signIn-title-2hm capitalize')]", 1000);

        // Enter the username in the email input field
        writeText("css::input#email", event.username);

        // Enter the password in the Password input field
        writeText("css::input#Password", event.password);

        // Click on the Sign In button
        click("//span[text()='Sign-in to Your Account']/following::span[text()='Sign In']");

        // If an expected welcome message is provided, wait until it's visible
        if (event.expectedWelcome)
            waitForVisibility("(//span[text()='" + event.expectedWelcome + "'])[2]", 10000)
    }
});



/***********************************************************************************
 * Add an item to the cart of the currently logged-in user.
 *
 * Parameters:
 *   s: string                  - The name of the session in which we want this event to take place.
 *   category : string          - The category of the product that we want to add.
 *   subCategory : string       - The sub-category of the product that we want to add.
 *   product : string           - The  product that we want to add.
 *   options : array of strings - A list of options for the product.
 *   quantity: number, optional - The number of items to add.
 ************************************************************************************/
defineAction("AddToCart", function (session, event) {
    
    // Use the session object's methods
    with (session) {

        // Click the menu accordion button
        click("//div[@id='root']/main[1]/header[1]/div[1]/div[1]/button[1]")

        // Click the category
        click("//span[text()='" + event.product.category + "']");

        // Click the sub-category
        click("//span[text()='" + event.product.subCategory + "']");

        // Click the product
        click("//span[text() = '" + event.product.product + "']");

        // Click the options
        for (let opt in event.product.options) {
            // Click the option
            click("//button[@title='" + event.product.options[opt] + "']");

            // Verify that it was selected
            waitForVisibility("//button[@title='" + event.product.options[opt] + "' and contains(@class,'selected')]", 50000);
        }
        // Write the quantity
        if (event.product.quantity) {
            writeText("//input[@name='quantity']", event.product.quantity, true);
        }

        // Click the add to cart button
        click("//span[text()='Add to Cart']");

        // Click the menu accordion button
        click("//div[@id='root']/main[1]/header[1]/div[1]/div[1]/button[1]")

        // Go to main menu by clicking the <- button
        click("//span[text()='Main Menu']/preceding::button");

        // Exit the menu by clickin thx X button
        click("//span[text()='Main Menu']/preceding::button");
    }
})


/***********************************************************************************
 * Remove an item from the cart of the currently logged-in user.
 *
 * Parameters:
 *   s: string        - The name of the session in which we want this event to take place.
 *   product : string - The  product that we want to remove.
 ************************************************************************************/
defineAction("RemoveFromCart", function (session, event) {
    
    // Use the session object's methods
    with (session) {            
        
        // Show the cart
        runCode(`document.querySelectorAll('button[class*="cartTrigger"]')[0].click()`);

        // Click the remove button
        click(`//div[contains(@class,'productList')]//a[contains(.,'${event.product.product}')]/following-sibling::button[contains(@class,'deleteButton')]`)

        // Hide the cart
        runCode(`document.querySelectorAll('button[class*="cartTrigger"]')[0].click()`);
    }
});



/***********************************************************************************
 * Check-out the items in the cart of the currently logged-in user.
 *
 * Parameters:
 *   s: string                                              - The name of the session in which we want this event to take place.
 *   verifyItems : array of strings, optional               - A list of items that we expect to see in the cart.
 *   verifyNonexistenceOfItems : array of strings, optional - A list of items that we expect not to see in the cart.
 *   shippingMethod : string, optional                      - The shopping method that we want to use for this order.
 *   cardHolderName : string, optional                      - The name of the card holder.
 *   cardNumber : string, optional                          - The card number.
 *   expirationDate : string, optional                      - The expiration date of the card.
 *   cvv : string, optional                                 - The CVV of the card.
 * 
 ************************************************************************************/
defineAction("CheckOut", function (session, event) {

    // Use the session object's methods
    with (session) {
        
        // Show the cart
        runCode(`document.querySelectorAll('button[class*="cartTrigger"]')[0].click()`);

        // Click the checkout button
        waitForClickability("//span[text()='CHECKOUT']", 20000);
        click("//span[text()='CHECKOUT']");

        // Wait for the checkout page to load
        waitForVisibility("//*[text()='Credit Card']", 20000);

        // Click the credit card button
        click('//*[@id="paymentMethod--braintree"]');

        // Type the card holder name
        switchFrame("//iframe[@id='braintree-hosted-field-cardholderName']");
        writeText("//input[@id='cardholder-name']", event.user.cardHolderName);
        switchFrame("Main Frame")

        // Type the card number
        switchFrame("//iframe[contains(@id,'braintree-hosted-field-number')]");
        writeText("//input", event.user.cardNumber);
        switchFrame("Main Frame")

        // Type the expiration date
        switchFrame("//iframe[@id='braintree-hosted-field-expirationDate']");
        writeText("//input[@id='expiration']", event.user.expirationDate);
        switchFrame("Main Frame")

        // Type the CVV
        switchFrame("//iframe[@id='braintree-hosted-field-cvv']");
        writeText("//input[@id='cvv']", event.user.cvv);
        switchFrame("Main Frame")

        click("//span[text()='Review Order']");

        // Verify that items are in the cart
        if (event.verifyItems) {
            for (item of event.verifyItems) {
                waitForVisibility("//img[@alt='" + item.product + "']", 5000);
            }
        }

        // Verify that items are not in the cart
        if (event.verifyNonexistenceOfItems) {
            for (item of event.verifyNonexistenceOfItems) {
                checkNonExistance("//img[@alt='" + item.product + "']", 5000);
            }
        }

        // Place the order and wait for the confirmation
        click("//span[text()='Place Order']");
        waitForVisibility("//*[contains(., 'Thank you for your order!')]", 1000000);
    }
});
