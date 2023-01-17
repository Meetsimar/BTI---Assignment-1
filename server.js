const express = require('express');
const path = require('path');
var cors = require('cors')
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const app = express();
const HTTP_PORT = process.env.PORT || 8080;
const MoviesDB = require("./modules/moviesDB.js");


const db = new MoviesDB();


app.use(bodyParser.json());

app.use(cors())
app.use(express.json())

require("dotenv").config({path:"./config/config.env"});

app.get('/', (req, res)=>{
    res.json({ message: "API Listening" });
})

app.use((req, res) => {
    res.status(404).send('Resource not found');
});

// Tell the app to start listening for requests
app.listen(HTTP_PORT, () => {
    console.log('Ready to handle requests on port ' + HTTP_PORT);
});