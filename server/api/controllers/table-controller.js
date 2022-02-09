const { Table } = require("../models/tableModel")

exports.createTable = async (req, res) => {

    try {
        table = await new Table({
            tableIdentifier: req.body.tableIdentifier,
            capacity: req.body.capacity,
            status: req.body.status
        }).save();

        res.status(200).json(table)
    }
    catch (error) {
        console.log(error)
    }
}

exports.updateTable = async ( req, res) => {
}