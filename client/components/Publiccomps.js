var React = require('react'),
    $ = require('jQuery');


var Publiccomps = React.createClass({

  getInitialState: function(){
    return {
      ticker:"",
      marketCap: "",
      enterpriseValue: "",
      revenue: "",
      ebitda: "",
      evRevenue: "",
      evEbitda: "",
      url: "http://finance.yahoo.com/q/ks?s=INVN"
    };
  },

  changeComps: function(event){
    this.setState({
      ticker: event.target.value
    })


  },

  getComps: function(event){
    console.log('Ticker', this.state.ticker)
    event.preventDefault();
    var newUrl = "http://finance.yahoo.com/q/ks?s="+this.state.ticker;
    this.setState({
      url: newUrl
    });
    var postdata = {'url':newUrl};
    console.log("data right before post", postdata);
    //
    // $.ajax({
    //   type: 'POST',
    //   url: "http://localhost:3000",
    //   data: JSON.stringify(postdata),
    //   contentType: 'application/json',
    //   success: function(postdata){
    //     console.log(postdata);
    //   }
    // });

    $.get("/data").done(function(results) {
      console.log("results on ticker grab", results)
    });




  },

  render: function(){

    return (
      <div>
        <h3 className = "cashflows"> Public Comps</h3>
        <form  className = "cashflows" onSubmit ={this.getComps} > In the Boxes below - Input the ticker symbol of a comparable company.
        <br/>
        <br/>
        <input  id = 'ticker' type  = "text"  defaultValue = "" placeholder = "Ticker Symbol" onChange = {this.changeComps}/>
        <br/>
        <br/>
        <button>Retrieve Comps</button>

        </form>

        <br/>
        <br/>
      </div>

    );
  }



})



module.exports = Publiccomps;
