const { Order } = require("../models/orderModel");
const getTotalPrice = require("../../utils/totalPrice")

exports.createOrder = async (req, res) => {

    try {
        order = await new Order({
            orderItems: req.body.orderItems,
            user: req.body.user,
            table : req.body.table,
            totalPrice : await getTotalPrice(req, res)   
        }).save();

        res.status(200).json(order)
        
    }
    catch (error) {
        console.log(error)
    }
}