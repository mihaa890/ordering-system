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

exports.getAll = async(req, res) => {

    Menu.find({}).then(function (items) {
        res.status(200).json(items)
    })
}

exports.getById = async(req, res) => {
    const ids = req.query.ids.split(',');

    Menu.find({ '_id': { $in: ids } }).then(function (items){
        res.status(200).json(items)
    })
}

