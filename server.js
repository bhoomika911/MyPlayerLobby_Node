const express = require('express');
const bodyParser = require('body-parser');

// Configuring the database
const dbConfig = require('./config/database.config.js');
const mongoose = require('mongoose');
mongoose.Promise = global.Promise;


// create express app
const app = express();

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }))

// parse requests of content-type - application/json
app.use(bodyParser.json())

console.log("process.env.NODE_ENV===>",process.env.NODE_ENV);
// Connecting to the database
mongoose.connect(dbConfig[process.env.NODE_ENV].url, {
    useNewUrlParser: true
}).then(() => {
    // console.log("Successfully connected to the database");
}).catch(err => {
    // console.log('Could not connect to the database. Exiting now...', err);
    process.exit();
});

// define a simple route
app.get('/', (req, res) => {
    res.json({ "message": "Welcome to my gamer lobby app..." });
});

// listen for requests
app.listen(3000, () => {
    console.log("Server is listening on port 3000 : " + process.env.NODE_ENV);
});

// routes
require('./app/routes/user.route.js')(app);
require('./app/routes/game.route.js')(app);
require('./app/routes/player.route.js')(app);


module.exports = app;