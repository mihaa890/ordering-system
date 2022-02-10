const { Order } = require("../models/orderModel");
const getTotalPrice = require("../../utils/totalPrice")

exports.order = async (req, res) => {

    try {
        order = await new Order({
            orderItems: req.body.orderItems,
            table : req.body.table,
            totalPrice : await getTotalPrice(req, res)   
        }).save();

        res.status(200).json(order)
        
    }
    catch (error) {
        console.log(error)
    }
}