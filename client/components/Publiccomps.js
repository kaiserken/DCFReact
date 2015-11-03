var React = require('react'),
    $ = require('jQuery');


var Publiccomps = React.createClass({

  getInitialState: function(){
    return {
      companyRevenue:"",
      companyEbitda:"",
      companyValueRevenue:"",
      companyValueEbitda:"",
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

  numberFormatting: function(event){
      return (new Intl.NumberFormat({ style: 'currency', currency: 'USD' }).format(event));
  },

  stringNumber: function(event){
      return ((event).replace(/[, ]+/g, "").trim());
  },

  changeCompanyInfo: function(event){
    event.target.value = this.stringNumber(event.target.value);
    var companyInfo = this.numberFormatting(event.target.value);
    event.target.value = companyInfo;
    var id = event.target.id;
    var data = {};
    data[id] = companyInfo;
    this.setState(data)
  },
  computeCompanyValue: function(cr, ce, evr, eve){
    var companyValueRevenue = this.stringNumber(cr)*this.stringNumber(evr);
    var companyValueEbitda = this.stringNumber(ce)*this.stringNumber(eve);
    this.setState({
      companyValueRevenue :this.numberFormatting(companyValueRevenue),
      companyValueEbitda: this.numberFormatting(companyValueEbitda)
    })
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

    $.ajax({
      type: "GET",
      url: "http://localhost:3000/yahoostockquery/"+this.state.ticker,
      contentType: 'application/json',
      success: function(results){
        this.setState({
          marketCap:results[0].numbers,
          enterpriseValue: results[1].numbers,
          revenue:results[15].numbers,
          ebitda:results[19].numbers,
          evRevenue: results[7].numbers,
          evEbitda: results[8].numbers
        }),
        this.computeCompanyValue(this.state.companyRevenue, this.state.companyEbitda, this.state.evRevenue, this.state.evEbitda);
      }.bind(this),
    });

  },

  render: function(){
    console.log(this.state)
    return (
      <div>
        <h3 className = "cashflows"> Public Comps</h3>
        <form  className = "cashflows" onSubmit ={this.getComps} > In the Boxes below - Input the ticker symbol of a comparable company and your company's 12-month trailing Revenue and EBITDA
        <br/>
        <br/>
        <input  id = 'ticker' type  = "text"  defaultValue = "" placeholder = "Ticker Symbol" onChange = {this.changeComps}/>
        <br/>
        <br/>
        <input  id = 'companyRevenue' type  = "text"  defaultValue = "" placeholder = "Your Revenue" onChange = {this.changeCompanyInfo}/>
        <br/>
        <br/>
        <input  id = 'companyEbitda' type  = "text"  defaultValue = "" placeholder = "Your EBITDA" onChange = {this.changeCompanyInfo}/>
        <br/>
        <br/>
        <button>Retrieve Comps</button>
        <br/>
        <br/>

        <p>Company Ticker Symbol ------------- {this.state.ticker}</p>
        <p>Market Capitalization ------------- {this.state.marketCap}</p>
        <p>Enterprise Value ------------------ {this.state.enterpriseValue}</p>
        <p>Revenue --------------------------- {this.state.revenue}</p>
        <p>EBITDA ---------------------------- {this.state.ebitda}</p>
        <p>Enterprise Value / Revenue -------- {this.state.evRevenue}</p>
        <p>Enterprise Value / EBITDA --------- {this.state.evEbitda}</p>

        <h5>Your company's value based on multiple of Revenue ${this.state.companyValueRevenue}</h5>
        <h5>Your company's value based on multiple of EBITDA ${this.state.companyValueEbitda}</h5>

        </form>

        <br/>
        <br/>
      </div>

    );
  }



})



module.exports = Publiccomps;
