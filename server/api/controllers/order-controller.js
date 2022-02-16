const { Order } = require("../models/orderModel");
const getTotalPrice = require("../../utils/totalPrice")

exports.order = async (req, res) => {
    try {
        order = await new Order({
            orderItems: req.body.orderItems,
            table : req.body.table,
            totalPrice : await getTotalPrice(req, res)   
        }).save();

        res.status(200).send(order)
    }
    catch (error) {
        console.log(error)
    }
}

exports.getOrderById = async (req, res) => {

    const id = req.params.id;

    Order.find({_id : id}).then(function (order) {
        res.status(200).json(order)
    })
}