const getTotalPrice = async (req, res) => {
    const orderItems = req.body.orderItems;
    const promises = [];

    orderItems.forEach(async (el) => {
        promises.push(el)
    })

    const result = await Promise.all(promises)

    const products = result
    .map(item => ({
        price : item.price,
        qty : item.qty
    }))
    .map(item => ({
        price : item.price * item.qty
    }))
    
    const productsPrice = products.length > 0 ? products.reduce((previous, current) => ({
        price : previous.price + current.price
    })) : 0


    return productsPrice.price || 0
}


module.exports = getTotalPrice;