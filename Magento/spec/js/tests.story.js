/* @provengo summon selenium */



// const URL = "http://localhost/"
// const URL = "https://magento2-demo.magebit.com/"
// const URL = "https://magento2-b2b.magebit.com/"

//const URL = "https://verbose-cod-v6xg74rrw9fwvw6-10000.preview.app.github.dev/"
//const URL = "http://localhost:10000"
const URL = "https://master-7rqtwti-c5v7sxvquxwl4.eu-4.magentosite.cloud/"

const NUM_OF_USERS = 1
const NUM_OF_PRODUCTS_PER_USER = 2

// Run sessions for each user in the users array (up to NUM_OF_USERS)
users.slice(0, NUM_OF_USERS).forEach(user => {
    bthread('Add to cart session for ' + user.username, function () {
        with (new SeleniumSession().start(URL)) {
            let addedProducts = new Set()

            // Login
            login(user)

            // Add products to cart
            while (addedProducts.size < NUM_OF_PRODUCTS_PER_USER) {
                let availableProducts = products.filter(product => !addedProducts.has(product))
                let product = choose(availableProducts)
                addedProducts.add(product)
                addToCart({ product: product, user: user })
            }

            // Remove a product from cart
            let product = choose(Array.from(addedProducts))
            addedProducts.delete(product)
            removeFromCart({ product: product, user: user })

            // Checkout
            if (addedProducts.size !== 0) {
                let notAdded = products.filter(product => !addedProducts.has(product))
                checkOut({ shippingMethod: 'Fixed', user: user, verifyItems: Array.from(addedProducts), verifyNonexistenceOfItems: notAdded })
            }
        }
    })
});


// bthread('Checkout', function (user) {
//     waitFor(Any('AddToCart'))
//     with (new SeleniumSession().start(URL)) {

//         // waitFor(Any('AddToCart'))
//         // bp.log.info("//checkout "+user.username)
//         login({ user: user })
//         waitFor(Any("EndOfAction").and(Any({ eventName: 'AddToCart' })).and(Any({ user: user })))
//         checkOut({ shippingMethod: 'Fixed', user: user })
//     }
// })

//
// bthread('Remove product','User.Admin',function (user) {
//     with (new SeleniumSession().start(URL)) {
//         login({user: user})
//         let product = getRandomProduct()
//         removeFromStore(product)
//     }
// })

// story('Admin activities',function () {
//     with (new SeleniumSession().start(URL+'admin')) {
//         ctx.story('Change product price by admin','User.Admin',function (user) {
//             adminLogin({user: user})
//             changeProductPrice({product: {options: ['XS', 'Yellow'], product: 'Chloe Compete Tank', newPrice: 52}})
//         })
//         ctx.story('Add product by admin','User.Admin',function (user) {
//             adminLogin({user: user})
//             addProduct({product:
//                     {category: "Men", subCategory: "Tops", subSubCategory: "Tees",
//                         options: ['XS', 'Yellow'], name: 'Tee shirt', sku: 'test-men-top-tee-XS-Yellow', price: 27, qty: 50}})
//         })
//     }
// })
// ctx.story('Check price', 'User.All', function (user) {
//     with (new SeleniumSession().start(URL)) {
//         login({user: user})
//         for (let j = 0; j < NUM_OF_PROD; j++) {
//             let product = getRandomProduct()
//             checkPrice({product: product})
//         }
//     }
// })





//
// // ctx.story("Cant Checkout with empty cart", "User.EmptyCart", function (user) {
// //     block(Any("CheckOut").and(Any({username: user.username})))
// //     // block(Any(/Proceed to Checkout/).and(Any(RegExp(user.username)))) // <---- This version exposes a bug in Magento
// // })
// //
// // ctx.story("Amplifier", "User.NonEmptyCart", function (user) {
// //     block(Any("AddToCart").and(Any({username: user.username})), function () {
// //         waitFor(Any("CheckOut").and(Any({username: user.username})))
// //     })
// // })
//
//
// ///////////////////////////////////////////////////////////////////////////////////////////
//
//
// // const e1 = Any(/Click \[SeleniumSession=CheckOutStory xpath=\/\/button\[@id="send2"]]/);
// // const e2 = Any(/Click \[SeleniumSession=AddToCartStory\d xpath=\/\/button\[@id='product-addtocart-button']\/span]/);
// //
// // bthread("GOAL", function () {
// //     sync({waitFor: e1, interrupt: e2})
// //     choose(['GOAL'])
// // })
//
//
// //
// // story("CO", function () {
// //     startSeleniumSession("CO", url)
// //
// //     block(Any('AddToCart'), function () {
// //         login({
// //             s: "CO", username: 'roni_cost@example.com', password: 'roni_cost3@example.com'
// //         })
// //     })
// //
// //     let ordered = []
// //     while (true) {
// //         let e = waitFor(Any('AddToCart'), function () {
// //             return checkOut({
// //                 s: "CO", shippingMethod: 'Fixed', verifyItems: ordered
// //             })
// //         })
// //
// //         if (e.name == 'AddToCart')
// //             ordered.push(e.data.product)
// //         else
// //             break
// //     }
// //
// // })
//
//
// // bthread('Add men jacket story', function () {
// //     when( Any('Login'), function(e) {
// //         addToCart({
// //             s: e.s, category: 'Men', subCategory: 'Tops', subSubCategory: 'Jackets', product: 'Kenobi Trail Jacket', options: ['S', 'Blue'], quantity: 3
// //         });
// //
// //         checkOut({
// //             s: e.s, shippingMethod: 'Fixed'
// //         });
// //     })
// // });
//
// // bthread("Don't add to cart after checkout", function () {
// //     when(Any('CheckOut'), function(e) {
// //         block(Any('AddToCart').and(Any({s: e.s})));
// //     });
// // });
//
// //     addToCart({
// //         s: 'C1', category: 'Men', subCategory: 'Tops', subSubCategory: 'Jackets', product: 'Kenobi Trail Jacket', options: ['S', 'Blue'], quantity: 3
// //     });
// //
// //     removeFromCart({
// //         s: 'C1', product: 'Kenobi Trail Jacket'
// //     });
// //
// //     checkExistenceOfProductInCart({
// //         s: 'C1', product: 'Stellar Solar Jacket'
// //     });
// //
// //     checkOut({
// //         s: 'C1', verifyItems: ['Stellar Solar Jacket'], verifyNonexistenceOfItems: ['Kenobi Trail Jacket']
// //     });
// // });