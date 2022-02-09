const { Menu } = require("../api/models/menuModel")

const getTotalPrice = async (req, res) => {
    const orderItems = req.body.orderItems;
    const promises = [];

    orderItems.forEach(async (el) => {
        el.menuItems.forEach(async (item_id) => {
            promises.push(Menu.findOne({ _id: item_id }).exec());
        })

    })

    const result = await Promise.all(promises)
    const products = result
        .map(item => ({
            price: item.product.price,
            qty: item.product.qty
        }))
        .map(item => ({
            price: item.price * item.qty
        }))
        .reduce((previous, current) => ({
            totalPrice: previous.price + current.price
        }))

    return products.totalPrice;
}

module.exports = getTotalPrice;