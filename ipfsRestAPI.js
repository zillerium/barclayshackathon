// Dependencies
const fs = require('fs');
const http = require('http');
const express = require('express');

const app = express();
//const { Pool, Client } = require('pg')
const pg = require('pg');

require('dotenv').config();

request = require('request');
const bodyParser = require('body-parser');
var wget=require('node-wget');
var url = require('url');
var path = require('path');
const ipfsAPI = require('ipfs-api');

const ipfs = ipfsAPI('127.0.0.1', '5001', {protocol: 'http'})

app.get("/api/ping", function(req, res){
  res.json({ messaage: "pong" });
});

app.use(express.static(path.join(__dirname, 'html')));

//app.use((req, res) => {
//	res.send('Hello there !');
//});
app.use(function(req, res, next){
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST');
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With, content-type, Authorization, x-access-token');
  next();
});


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
// add token acceptance here.
// get token from blockchain and check against sending token from rest api call
app.post("/api/saveipfsimage", function(req, res){
     var imagename = req.body.imagename;
   // var testBuffer = req.body.image;
      console.log(imagename);
    //Reading file from computer
    let testFile = fs.readFileSync(imagename);
    //Creating buffer for ipfs function to add file to the system
    let testBuffer = new Buffer(testFile);
    ipfs.files.add(testBuffer, function (err, file) {
        if (err) {
           res.json({ message: "error",  ipfshash: ''});
        }
        res.json({ message: "Correct",  ipfshash: file});
    })
});

app.post("/api/readipfsimage", function(req, res){
    var imagehash = req.body.imagehash;
    ipfs.files.cat(imagehash, function (err, file) {
        if (err) {
           res.json({ message: "error",  ipfsimage: ''});
        }
        res.json({ message: "Correct",  ipfsimage: file});
    })	


});



// Starting both http & https servers
const httpServer = http.createServer(app);

httpServer.listen(3000, () => {
	console.log('HTTP Server running on port 3000');
});

