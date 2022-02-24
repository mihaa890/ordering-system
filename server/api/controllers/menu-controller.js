const { Menu } = require("../models/menuModel");

exports.createMenu = async ( req, res) =>{ 

    try{
        menu = await new Menu({
            product : req.body.product
        }).save();

        res.status(200).send(menu)
        
    }
    catch (error) {
        console.log(error)
    }

}

exports.getAll = async(req, res) => {

    Menu.find({}).then(function (items) {
        res.status(200).send(items)
    })
}

exports.getById = async(req, res) => {
    const ids = req.query.ids.split(',');

    Menu.find({ '_id': { $in: ids } }).then(function (items){
        res.status(200).send(items)
    })
}

exports.updateMenu = async(req, res) => {
    const id = req.params.id
    if(!id) {
        res.status(404).send({
            message: `Item with id ${id} does not exist`
        })
    }
    const body = req.body;
    if(!body) {
        res.status(400).send({
            message: "Something went wrong"
        })
    }
    Menu.findOneAndUpdate(id, req.body, {upsert: true}, function(err, doc) {
        if (err) return res.send(500, {error: err});
        return res.status(200).send(body)
    });

}
     

