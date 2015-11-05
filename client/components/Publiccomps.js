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
      url: ""
    };
  },

  changeCompanyInfo: function(event){
    console.log(this.props)
    event.target.value = this.props.stringNumber(event.target.value);
    var companyInfo = this.props.numberFormatting(event.target.value);
    event.target.value = companyInfo;
    var id = event.target.id;
    var data = {};
    data[id] = companyInfo;
    this.setState(data)
  },

  computeCompanyValue: function(cr, ce, evr, eve){
    var companyValueRevenue = (this.props.stringNumber(cr)*this.props.stringNumber(evr))-(.20*(this.props.stringNumber(cr)*this.props.stringNumber(evr)));
    var companyValueEbitda = (this.props.stringNumber(ce)*this.props.stringNumber(eve))-(.20*(this.props.stringNumber(ce)*this.props.stringNumber(eve)));
    this.setState({
      companyValueRevenue :this.props.numberFormatting(companyValueRevenue),
      companyValueEbitda: this.props.numberFormatting(companyValueEbitda)
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
        console.log(results)
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
    console.log('this.props',this.props);
    return (
      <div>
        <h3 className = "cashflows"> Public Comps</h3>
        <form  className = "cashflows" onSubmit ={this.getComps} > In the Boxes below - Input the ticker symbol of a comparable company and your company's 12-month trailing Revenue and EBITDA. A 20% liquidity discount is applied because you are private company.
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
        </form>
        <h5 className = "cashflows">Your Company's value based on multiple of Revenue is ${this.state.companyValueRevenue}</h5>
        <h5 className= "cashflows">Your Company's value based on multiple of EBITDA is ${this.state.companyValueEbitda}</h5>
        <br/>
        <br/>
        <table className = "cashflows">
        <thead>
          <tr>
            <th>Comparable Company Numbers</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Company Ticker Symbol</td>
            <td>{this.state.ticker}</td>
          </tr>
          <tr>
            <td>Market Capitalization</td>
            <td>{this.state.marketCap}</td>
          </tr>
          <tr>
            <td>Enterprise Value</td>
            <td>{this.state.enterpriseValue}</td>
          </tr>
          <tr>
            <td>Revenue</td>
            <td>{this.state.revenue}</td>
          </tr>
          <tr>
            <td>EBITDA</td>
            <td>{this.state.ebitda}</td>
          </tr>
          <tr>
            <td>Enterprise Value / Revenue</td>
            <td>{this.state.evRevenue}</td>
          </tr>
          <tr>
            <td>Enterprise Value / EBITDA</td>
            <td>{this.state.evEbitda}</td>
          </tr>
          </tbody>
        </table>
        <br/>
        <br/>
      </div>

    );
  }

})



module.exports = Publiccomps;
