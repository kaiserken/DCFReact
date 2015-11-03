var express  = require('express');

var app = express();
var scraperController = require("./scraper")
var bodyParser = require('body-parser')

app.use(express.static('client'));
app.use(bodyParser());


app.get("/yahoostockquery/:symbol", scraperController.getData);

app.listen(process.env.PORT || 3000, function(){
  console.log('server is running');
});

module.exports = app;
