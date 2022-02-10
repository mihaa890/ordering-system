const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const orderSchema = new Schema({
    orderItems: [
        {
           menuItems : [{type : mongoose.Schema.Types.ObjectId, ref:'menuItems', required : true}],
        }
    ],

    table: { type: mongoose.Schema.Types.ObjectId, ref: 'table', required: true },


    totalPrice: {
        type: Number,
    }
})

const Order = mongoose.model("order", orderSchema);


module.exports = { Order }