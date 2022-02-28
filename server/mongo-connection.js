const mongoose  = require("mongoose");
const Config = require('./services/config');

const config = Config.load()


const connectDb = async () => {
    const mongoDB = 'mongodb://' + config.db.host + '/db';

mongoose.connect(mongoDB, {useNewUrlParser: true, useUnifiedTopology: true}).then(connection => {
  console.log(`Connected to Mongo database "${connection.connections[0].name}"`)
})

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
}

module.exports = {connectDb}