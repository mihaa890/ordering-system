const express = require("express");
const path = require("path");
const bodyParser = require('body-parser');
const cors = require("cors");
const MongoDb = require("./mongo-connection")

const PORT = 3001;
const app = express();

app.use(cors());
app.set('view engine', 'ejs');

MongoDb.connectDb()
app.set('views', path.join(__dirname, 'views'));

app.use(bodyParser.urlencoded({ extended: false }))

app.use(bodyParser.json())

app.use(express.static("public"));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});
app.use('/api', require('./api/routes/routes.js'));

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});

