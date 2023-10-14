/* global bp */

/* @provengo summon context */


function getRandomProduct() {
    let products = ctx.runQuery("Product.All")
    return products[choose(Object.keys(products))]
}

//////////////////////////////////////////////////////////////////////////////////////////////////

ctx.registerQuery("Product.All", entity => entity.type.equals("Product"))

ctx.registerQuery("User.All", entity => entity.type.equals("User"))
ctx.registerQuery("User.Admin", entity => entity.type.equals("Admin"))

ctx.registerQuery("User.EmptyCart", entity => {
    return (entity.type.equals("User") && entity.cart.length == 0)
})

ctx.registerQuery("User.NonEmptyCart", entity => {
    return (entity.type.equals("User") && entity.cart.length != 0)
})


//////////////////////////////////////////////////////////////////////////////////////////////////

ctx.registerEffect("CheckOut", function (e) {
    let user = ctx.getEntityById(e.user.username)

    user.checkingOut = true;
})

ctx.registerEffect("ChangeProductPrice", function (e) {
    let product = ctx.getEntityById(e.product.product)

    product.price = '"$'+e.product.newPrice+'.00"';
})
ctx.registerEffect("AddProduct", function (e) {
    ctx.insertEntity(ctx.Entity(e.product.name, 'Product',
        {category: e.product.category, subCategory: e.product.subCategory, subSubCategory: e.product.subSubCategory, options: e.product.option, product: e.product.name, expected_image: e.product.sku, price: '"$'+e.product.price+'.00"'}))
})


ctx.registerEffect("EndOfAction", function (e) {
    if (e.eventName == "AddToCart") {
        let user = ctx.getEntityById(e.user.username)

        // if (!user.checkingOut)
        //     user.cart.push(e.product)

    } else if (e.eventName == "CheckOut") {
        let user = ctx.getEntityById(e.user.username)

        user.checkingOut = false;
    }
})


ctx.populateContext([
    // Admins
    ctx.Entity('user@admin',     'Admin', {username: 'user', password: 'user123', expectedWelcome: 'Welcome, Veronica Costello!', cart: [], cheikingOut: false}),

    //User
    ctx.Entity('roni_cost@example.com',     'User', {username: 'roni_cost@example.com', password: 'roni_cost3@example.com', expectedWelcome: 'Welcome, Veronica Costello!', cart: [], cheikingOut: false}),
    ctx.Entity('david_lowcost@example.com', 'User', {username: 'david_lowcost@example.com', password: 'david_lowcost3@example.com', expectedWelcome: 'Welcome, David Lowcost!', cart: [], cheikingOut: false}),

    // Products
    ctx.Entity('Hero Hoodie',                           'Product', {category: 'Men', subCategory: 'Tops', subSubCategory: 'Hoodies & Sweatshirts', options: ['XL', 'Green'], product: 'Hero Hoodie', expected_image: 'mh07-green_main', price: "$54.00"}),
    ctx.Entity('Atomic Endurance Running Tee (V-neck)', 'Product', {category: 'Men', subCategory: 'Tops', subSubCategory: 'Tees', options: ['S', 'Green'], product: 'Atomic Endurance Running Tee (V-neck)', price: "$28.00"}),
    ctx.Entity('Meteor Workout Short',                  'Product', {category: 'Men', subCategory: 'Bottoms', subSubCategory: 'Shorts', options: ['36', 'Green'], product: 'Meteor Workout Short', price: "$32.50"}),
    ctx.Entity('Layla Tee',                             'Product', {category: 'Women', subCategory: 'Tops', subSubCategory: 'Tees', options: ['M', 'Green'], product: 'Layla Tee', price: "$29.00"}),
    ctx.Entity('Chloe Compete Tank',                    'Product', {category: 'Women', subCategory: 'Tops', subSubCategory: 'Bras & Tanks', options: ['XS', 'Yellow'], product: 'Chloe Compete Tank', price: "$39.00"}),
    ctx.Entity('Inez Full Zip Jacket',                  'Product',  {category: 'Women', subCategory: 'Tops', subSubCategory: 'Jackets', options: ['XS', 'Orange'], product: 'Inez Full Zip Jacket', price: "$59.00"})
])


