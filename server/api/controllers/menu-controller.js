const { Menu } = require("../models/menuModel");

exports.createMenu = async ( req, res) =>{ 

    try{
        menu = await new Menu({
            product : req.body.product
        }).save();

        res.status(200).json(menu)
        
    }
    catch (error) {
        console.log(error)
    }

}

