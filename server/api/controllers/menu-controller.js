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
    const id = req.params.id; 
        Menu.find({_id : id }).then(function (item){
            res.status(200).json(item)
        })
}

