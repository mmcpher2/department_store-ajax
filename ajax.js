$(document).ready(function () {

    let productOutputEl = $('.products')
    let listOfProducts = []
    let listOfCategories = []

    $.ajax({
        "url": "data/products.json",
        "method": "GET"
    }).done(
        function (productData) {
            $.ajax({
                "url": "data/categories.json",
                "method": "GET"
            }).done(
                function (categoryData) {

                    listOfProducts = productData.products
                    listOfCategories = categoryData.categories

                    productOutputEl.html(updateDOM(listOfProducts, listOfCategories))

                    const currentSeasonClicked = $("#season").change(function () {
                        let thisSeason = this.value
                        // Repopulate DOM upon clicking new season discount from list
                        productOutputEl.html(updateDOM(listOfProducts, listOfCategories))
                        

                        const categorySelected = listOfCategories.find(function (category) {
                            return category.season_discount === thisSeason
                        })
                        const categoryDiscount = (1 - categorySelected.discount)
                        const categoryId = categorySelected.id
                        const priceList = Array.from($(`.${categoryId}`))
                        console.log(priceList)

                        priceList.forEach(function (price) {
                            priceValue = price.innerHTML
                            const discountedItem = (categoryDiscount * priceValue).toFixed(2)
                            price.innerHTML = discountedItem
                        })

                    })
                })
        })
})    
    
let updateDOM = (listOfProducts, listOfCategories) => {
    // Start with no HTML
    let finalHTML = ""
    listOfProducts.forEach(product => {
        const productCategory = listOfCategories.find(c => c.id === product.category_id)
        const currentProductName = product.name
        const currentProductPrice = product.price

        finalHTML += `
        <section id="productCategory.name">
        <h3>Product: ${currentProductName}</h3>
        <div>Category: ${productCategory.name}</div>
        <p class="${product.category_id}">${currentProductPrice}</p>
        </section>
        `
    })
    return finalHTML
}