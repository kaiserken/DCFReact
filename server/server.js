var express  = require('express');

var app = express();
var scraperController = require("./scraper")


app.use(express.static('client'));


app.get("/data", scraperController.getData);

app.post("/", scraperController.postData);

app.listen(process.env.PORT || 3000, function(){
  console.log('server is running');
});

module.exports = app;
