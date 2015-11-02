var cheerio = require('cheerio');
var request = require('request');
var React = require('react');
var Publiccomps = require('./../client/components/Publiccomps');

var url  = "http://finance.yahoo.com/q/ks?s=invn";


var scrapeController = {
  postData: function(req, res, next){


    console.log("postrequestbody", req.body);
  },

  getData: function(req, res, next) {

    res.header("Access-Control-Allow-Origin","*");

    request(url, function(error, response, html) {
      if(error){
          return console.error(error);
      }
      var $ = cheerio.load(html);
      var data  = $(".yfnc_tabledata1");
      var financialdata = [];

      $(data).each(function(i, element){
        var numbers;
        var json = {};
        var financedata = $(this);
        json.numbers = financedata.text();
        financialdata.push(json);
      });

      res.json(financialdata);

    });
  }
}

module.exports = scrapeController;
