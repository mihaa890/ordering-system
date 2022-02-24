const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const menuItemsSchema = new Schema({

    product : {
        name: { type: String, required: true },
        price: { type: Number, required: true },
        qty: { type: Number, required: true , default:1 },

    }
  
})

const Menu = mongoose.model('menuItems', menuItemsSchema);

module.exports  = {Menu}


