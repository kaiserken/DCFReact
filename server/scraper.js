var cheerio = require('cheerio');
var request = require('request');

var url  = "http://finance.yahoo.com/q/ks?s=";

var scrapeController = {
  getData: function(req, res, next) {
    var newUrl  = url+req.params.symbol;
    res.header("Access-Control-Allow-Origin","*");
    request(newUrl, function(error, response, html) {
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
