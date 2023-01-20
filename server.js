/*********************************************************************************
* BTI425 – Assignment 1
* I declare that this assignment is my own work in accordance with Seneca Academic Policy.
* No part of this assignment has been copied manually or electronically from any other source
* (including web sites) or distributed to other students. *
* Name: Meetsimar Kaur Student ID: 106510217 Date: 19/01/23
* Cyclic Link: https://periwinkle-drill-gown.cyclic.app/
* ********************************************************************************/


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

require("dotenv").config();

app.get('/', (req, res) => {
    res.json({ message: "API Listening" });
})


app.post('/api/movies', (req, res)=>{
    db.addNewMovie(req.body)
    .then(()=>{ res.status(201).json("new movie added");})
    .catch((err)=>{ res.status(400).json(err);})
})

app.get('/api/movies', (req, res)=>{
    db.getAllMovies(req.query.page, req.query.perPage, req.query.title)
    .then((data)=>{ console.log("Hello"); res.status(200).json(data);})
    .catch((err)=>{ res.status(400).json({message:err.message});})
})

app.get('/api/movies/:id', (req, res)=>{
    db.getMovieById(req.params.id)
    .then((data)=>{ res.status(200).json(data);})
    .catch((err)=>{ res.status(400).json(err);})
})

app.put('/api/movies/:id', (req, res)=>{
    db.updateMovieById(req.body, req.params.id)
    .then(()=>{ res.status(200).json("movie updated");})
    .catch((err)=>{ res.status(400).json(err);})
})

app.delete('/api/movies/:id', (req, res)=>{
    db.deleteMovieById(req.params.id)
    .then(()=>{ res.status(200).json("movie deleted");})
    .catch((err)=>{ res.status(400).json(err);})
})

app.use((req, res) => {
    res.status(404).send('Resource not found');
});


// Tell the app to start listening for requests
db.initialize(process.env.MONGODB_CONN_STRING).then(() => {
    app.listen(HTTP_PORT, () => {
        console.log(`server listening on: ${HTTP_PORT}`);
    });
}).catch((err) => {
    console.log(err);
});