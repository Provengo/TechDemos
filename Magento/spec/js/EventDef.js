const EXCLUDE_LOW_LEVEL = java.lang.System.getProperty("EXCLUDE_LOW_LEVEL");

// Define the events that we want to use in our test. Needed only for auto-completion.
function login({ user }) { }
function adminLogin({ user }) { }
function addToCart({ product, user }) { }
function checkOut({ shippingMethod, user }) { }
function addProduct({ product }) { }
function changeProductPrice({ product }) { }


// If we are running in exclude-low-level mode, we define empty events.
if (EXCLUDE_LOW_LEVEL == "true") {
    defineEvent(SeleniumSession, "Login", function (session, event) { });
    defineEvent(SeleniumSession, "AdminLogin", function (session, event) { });
    defineEvent(SeleniumSession, "AddToCart", function (session, event) { });
    defineEvent(SeleniumSession, "CheckOut", function (session, event) { });
    defineEvent(SeleniumSession, "AddProduct", function (session, event) { });
    defineEvent(SeleniumSession, "AddProductToCart", function (session, event) { });
    defineEvent(SeleniumSession, "ChangeProductPrice", function (session, event) { });

    // If we are not running in exclude-low-level mode, we define Selenium content in the events.    
} else {
    /***********************************************************************************
     * Login to the store as a regular user.
     *
     * Parameters:
     *   username: string - The user that logs in
     *   password: string - The password of that user
     ************************************************************************************/
    defineEvent(SeleniumSession, "Login", function (session, event) {
        with (session) {
            click("//button[contains(@class,'accountTrigger-trigger-23q clickable-root-1HB')]");
            waitForVisibility("//span[contains(@class,'signIn-title-2hm capitalize')]", 1000);
            writeText('//input[@id="email"]', event.username);
            writeText("css::input#Password", event.password);
            click("xpath:://span[text()='Sign-in to Your Account']/following::span[text()='Sign In']");

            if (event.expectedWelcome)
                waitForVisibility("(//span[text()='" + event.expectedWelcome + "'])[2]", 10000)
        }
    });



    /***********************************************************************************
     * Login to the store as an admin user.
     *
     * Parameters:
     *   username: string - The user that logs in
     *   password: string - The password of that user
     ************************************************************************************/
    defineEvent(SeleniumSession, "AdminLogin", function (session, event) {
        with (session) {
            // bp.log.info("AdminLogin "+event.user.username+" "+event.user.password)
            writeText('//input[@id="username"]', event.user.username);
            writeText('//input[@id="login"]', event.user.password);
            click('//button[@class="action-login action-primary"]');
        }
    });

    /***********************************************************************************/
    defineEvent(SeleniumSession, "AddProduct", function (session, event) {
        with (session) {

            waitForClickability('//li[contains(@class,"item-catalog")]', 3000);
            click('//li[contains(@class,"item-catalog")]');
            waitForClickability('//li[contains(@class,"item-catalog-products")]', 3000);
            click('//li[contains(@class,"item-catalog-products")]');
            waitForClickability('//button[@id="add_new_product-button"]', 3000);
            click('//button[@id="add_new_product-button"]');

            waitForVisibility('//input[@name="product[name]"]', 10000);
            clear('//input[@name="product[name]"]');
            writeText('//input[@name="product[name]"]', event.product.name);
            clear('//input[@name="product[sku]"]');
            writeText('//input[@name="product[sku]"]', event.product.sku);
            clear('//input[@name="product[quantity_and_stock_status][qty]"]');
            writeText('//input[@name="product[quantity_and_stock_status][qty]"]', event.product.qty);
            clear('//input[@name="product[price]"]');
            writeText('//input[@name="product[price]"]', event.product.price);

            click('//div[text()="Select..."]');

            clear('//div[@class="action-menu _active"]/div[@class="admin__action-multiselect-search-wrap"]/input[@class="admin__control-text admin__action-multiselect-search"]')
            writeText('//div[@class="action-menu _active"]/div[@class="admin__action-multiselect-search-wrap"]/input[@class="admin__control-text admin__action-multiselect-search"]', "Tees");

            click('//label[@class="admin__action-multiselect-label"]/span[text()="Default Category / Men / Tops"]');

            click('//button[@class="action-default"]');

            click('//button[@id="save-button"]');

            // waitForClickability('//a[@title="My Account"]', 14000);
            // click('//a[@title="My Account"]');
            // click('//a[@title="Sign Out"]');
        }
    });
    /***********************************************************************************/
    defineEvent(SeleniumSession, "ChangeProductPrice", function (session, event) {
        with (session) {

            waitForClickability('//li[contains(@class,"item-catalog")]', 5000);
            click('//li[contains(@class,"item-catalog")]');
            waitForClickability('//li[contains(@class,"item-catalog-products")]', 5000);
            click('//li[contains(@class,"item-catalog-products")]');

            productName = event.product.product + '-' + event.product.options[0] + '-' + event.product.options[1];
            bp.log.info("ProductName " + productName)

            waitForVisibility('//input[@class="admin__control-text data-grid-search-control"]', 3000);
            clear('//input[@class="admin__control-text data-grid-search-control"]')
            writeText('//input[@class="admin__control-text data-grid-search-control"]', productName);
            waitForClickability('//button[@data-bind="click: apply.bind($data, false)"]', 1000);
            // data-bind="i18n: 'Search'"
            click('//button[@data-bind="click: apply.bind($data, false)"]');
            click('//a[@class="action-menu-item"]');

            waitForVisibility('//input[@name="product[price]"]', 3000);
            clear('//input[@name="product[price]"]')
            writeText('//input[@name="product[price]"]', event.product.newPrice);

            click('//button[@id="save-button"]');

            // waitForClickability('//a[@title="My Account"]', 14000);
            // click('//a[@title="My Account"]');
            // click('//a[@title="Sign Out"]');
        }
    });

    /***********************************************************************************
     * Logout a regular user.
     *
     ************************************************************************************/
    defineEvent(SeleniumSession, "Logout", function (session, event) {
        with (session) {
            click("//span[@class='customer-name']//button");
            click("//a[normalize-space()='Sign Out']");
        }
    });

    /***********************************************************************************
     * Register a  user.
     *
     * Parameters:
     *   s: string              - The name of the session in which we want this event to take place
     *   firsntame : string     - The name of the new user
     *   lastname : string      - The surname of the new user
     *   email_address : string - An email address for the user. Must be unique.
     *   password : string      - Password for the new user.
     ************************************************************************************/
    defineEvent(SeleniumSession, "Register", function (session, event) {
        with (session) {
            click("//a[@href='http://localhost/customer/account/create/']");
            writeText('//input[@id="firstname"]', event.firstname);
            writeText('//input[@id="lastname"]', event.lastname);
            writeText('//input[@id="email_address"]', event.email_address);
            writeText('//input[@id="password"]', event.password);
            writeText('//input[@id="password-confirmation"]', event.password);
            click('//button[@type="submit" and contains(concat(" ",normalize-space(@class)," ")," action ") and contains(concat(" ",normalize-space(@class)," ")," submit ")]');
            assertText("//div[@data-ui-id='message-success']//div[1]", "Thank you for registering with Main Website Store.")
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
    defineEvent(SeleniumSession, "AddToCart", function (session, event) {
        with (session) {
            click("//button[contains(@class,'navTrigger-root-3uS clickable-root-1HB')]");

            click("//span[text()='" + event.product.category + "']");
            click("//span[text()='" + event.product.subCategory + "']");


            //let image = "//img[@alt='" + event.product.product + "']";
            //moveToElement(image)
            //waitForClickability(image, 10000);

            click("//span[text() = '" + event.product.product + "']");
            //click(image);

            for (let opt in event.product.options) {
                // Click the options
                click("//button[@title='" + event.product.options[opt] + "']");

                // Verify that it was selected
                waitForVisibility("//button[@title='" + event.product.options[opt] + "' and contains(@class,'selected')]", 5000);
            }
            if (event.product.quantity) {
                writeText("//input[@name='quantity']", event.product.quantity, true);
            }

            // if (event.product.expected_image) {
            //     waitForVisibility("//img[contains(@loading='lazy' and @src, '" + event.product.expected_image + "')]", 5000);
            // }
            click("//span[text()='Add to Cart']");
            // waitForVisibility("//div[@data-ui-id='message-success']//div[1]", 5000);
            // assertText("//div[@data-ui-id='message-success']//div[1]", "You added " + event.product.product + " to your shopping cart.");
            // sleep(5000);
        }
    })

    defineEvent(SeleniumSession, "CheckPrice", function (session, event) {
        with (session) {

            refresh();
            click("//span[text()='" + event.product.category + "']");
            click("(//span[text()='" + event.product.category + "'])/following::span[text()='" + event.product.subCategory + "']/following::a[text()[normalize-space()='" + event.product.subSubCategory + "']]");

            selectByValue("xpath:://div[@class='toolbar toolbar-products']/following::select[@id='limiter']", '36')

            scrollToElement("(//img[@alt='" + event.product.product + "'])[last()]")
            waitForClickability("(//img[@alt='" + event.product.product + "'])[last()]", 1000);
            click("(//img[@alt='" + event.product.product + "'])[last()]");

            for (let opt in event.product.options) {
                // Click the options
                click("//div[@data-option-label='" + event.product.options[opt] + "']");

                // Verify that it was selected
                waitForVisibility("//div[@data-option-label='" + event.product.options[opt] + "' and contains(@class,'selected')]", 5000);
            }

            waitForVisibility("//span[@class=\"price-wrapper \"]", 5000);
            assertText("//span[@data-price-amount][1]", event.product.price);
        }
    })

    /***********************************************************************************
     * Remove an item from the cart of the currently logged-in user.
     *
     * Parameters:
     *   s: string        - The name of the session in which we want this event to take place.
     *   product : string - The  product that we want to remove.
     ************************************************************************************/
    defineEvent(SeleniumSession, "RemoveFromCart", function (session, event) {
        with (session) {
            click("xpath:://a[@class='action showcart']");
            click("xpath:://a[text()[normalize-space()='" + event.product + "']]/following::a[@class='action delete']");
            click("xpath:://div[text()='Are you sure you would like to remove this item from the shopping cart?']/following::span[text()='OK']");
            waitForInvisibility("//div[contains(@class,'block block-minicart')]//img[@alt='" + event.product + "']", 5000);
            click("//button[@id='btn-minicart-close']");
        }
    });

    /***********************************************************************************
     * Check that a product exists in the cart of the currently logged-in user.
     *
     * Parameters:
     *   s: string -      - The name of the session in which we want this event to take place.
     *   product : string - The  product that we want to remove.
     ************************************************************************************/
    defineEvent(SeleniumSession, "CheckExistenceOfProductInCart", function (session, event) {
        with (session) {
            click("//a[@class='action showcart']");
            waitForVisibility("//div[contains(@class,'block block-minicart')]//img[@alt='" + event.product + "']", 5000);
            click("//button[@id='btn-minicart-close']");
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
     ************************************************************************************/
    defineEvent(SeleniumSession, "CheckOut", function (session, event) {

        with (session) {
            // waitForClickability("//a[@class='level-top ui-corner-all']", 200000);
            // click("//a[@class='level-top ui-corner-all']");
            refresh();

            waitForClickability("//a[@class='action showcart']", 50000);
            click("//a[@class='action showcart']");
            waitForClickability("//button[@title='Proceed to Checkout']", 2000);
            click("//button[@title='Proceed to Checkout']", 5000);

            if (event.verifyItems || event.verifyNonexistenceOfItems) {
                waitForClickability("//div[contains(@class,'items-in-cart')]//div", 5000);
                waitForClickability("//div[contains(@class,'items-in-cart')]//div", 5000);
                click("//div[contains(@class,'items-in-cart')]//div");
            }

            if (event.verifyItems) {
                for (item in event.verifyItems) {
                    waitForVisibility("//img[@alt='" + event.verifyItems[item] + "']", 5000);
                }
            }

            if (event.verifyNonexistenceOfItems) {
                for (item in event.verifyNonexistenceOfItems) {
                    waitForInvisibility("//img[@alt='" + event.verifyNonexistenceOfItems[item] + "']", 5000);
                }
            }

            if (event.shippingMethod) {
                waitForClickability("//td[text()='" + event.shippingMethod + "']", 5000);
                click("//td[text()='" + event.shippingMethod + "']");
            }

            click("//span[text()='Next']");

            if (event.verifyItems) {
                for (item in event.verifyItems) {
                    waitForVisibility("//img[@alt='" + event.verifyItems[item] + "']", 5000);
                }
            }
            if (event.verifyNonexistenceOfItems) {
                for (item in event.verifyNonexistenceOfItems) {
                    waitForInvisibility("//img[@alt='" + event.user.verifyNonexistenceOfItems[item] + "']", 5000);
                }
            }


            waitForClickability("//button[contains(@class,'action primary')]", 5000);
            runCode("jQuery(document.querySelectorAll('button[class*=\"action primary\"]')).click()");
            waitForVisibility("//p[text()='Your order number is: ']", 5000);
            click("//span[text()='Continue Shopping']");
        }
    });


}