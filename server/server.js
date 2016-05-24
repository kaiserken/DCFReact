var express  = require('express');
var csvjson = require('csvjson');
var app = express();
var http = require('http');
var scraperController = require("./scraper");
var bodyParser = require('body-parser');



app.use(express.static('client'));

app.use(bodyParser());


app.get("/yahoostockquery/:symbol", scraperController.getData);

// uncomment below and make request to /data if the CSV file changes and need to update companylistmaster.json
// app.get('/data', function(){
//   csvjson.toObject('./client/companylistmaster.csv').save('./client/companylistmaster.json');
// });
// app.get('/data', function(){
//   csvjson.toColumnArray('./client/companylistmaster.csv').save('./client/companylistmaster2.json');
// });

var  port  = process.env.PORT || 3000;
var  server  = http.createServer(app);
server.listen(port);
console.log('server listening on ', port);

module.exports = app;
