const { Table } = require("../models/tableModel")

exports.createTable = async(req, res) => {

    try {
        table = await new Table({
            tableIdentifier: req.body.tableIdentifier,
            capacity: req.body.capacity,
            status: req.body.status
        }).save();

        res.status(200).json(table)
    } catch (error) {
        console.log(error)
    }
}
exports.tablesList = async(req, res) => {

    Table.find({ "status": 'free' })
        .then(function(tables) {
            res.send(tables);
        });
}

exports.getById = async(req, res) => { 
    const id = req.params.id;

    Table.find({_id : id}).then(function (table) {
        res.status(200).json(table)
    })
}