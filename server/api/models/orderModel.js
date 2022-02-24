const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const orderSchema = new Schema({
    orderItems: [{
            name: { type: String, required: true },
            price: { type: Number, required: true },
            qty: { type: Number, required: true, default: 1  },
        
    }],

    table: { type: mongoose.Schema.Types.ObjectId, ref: 'table', required: true },


    totalPrice: {
        type: Number,
    }
})

const Order = mongoose.model("order", orderSchema);


module.exports = { Order }