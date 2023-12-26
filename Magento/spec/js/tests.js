/* @provengo summon selenium */
const URL = "https://master-7rqtwti-c5v7sxvquxwl4.eu-4.magentosite.cloud/"

const NUM_OF_USERS = 2
const NUM_OF_PRODUCTS_PER_USER = 2

// Run sessions for each user in the users array (up to NUM_OF_USERS)
users.slice(0, NUM_OF_USERS).forEach(user => {
    bthread('Add to cart session for ' + user.username, function () {
        with (new SeleniumSession().start(URL)) {
            let addedProducts = new Set()

            // Login
            Login(user)

            // Add products to cart
            while (addedProducts.size < NUM_OF_PRODUCTS_PER_USER) {
                let product = choose(products.filter(product => !addedProducts.has(product)))
                addedProducts.add(product)
                AddToCart({ product: product, user: user })
            }

            // Remove a product from cart
            let product = choose(Array.from(addedProducts))
            addedProducts.delete(product)
            RemoveFromCart({ product: product, user: user })

            // Checkout
            if (addedProducts.size !== 0) {
                let notAdded = products.filter(product => !addedProducts.has(product))
                CheckOut({ shippingMethod: 'Fixed', user: user, verifyItems: Array.from(addedProducts), verifyNonexistenceOfItems: notAdded })
            }
        }
    })
});