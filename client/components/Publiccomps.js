var React = require('react'),
async = require('async');
var companylist = require('../companylistmaster');
var Searchticker = require('./Searchticker');


var Publiccomps = React.createClass({

  getInitialState: function(){
    return {
      companyRevenue:"",
      companyEbitda:"",
      companyValueRevenue1:'',
      companyValueEbitda1:'',
      companyValueRevenue2:'',
      companyValueEbitda2:'',
      companyValueRevenue3:'',
      companyValueEbitda3:'',
      ticker1:"",
      ticker2:"",
      ticker3:"",
      companyName1:"",
      companyName2:"",
      companyName3:"",
      marketCap1: "",
      enterpriseValue1: "",
      revenue1: "",
      ebitda1: "",
      evRevenue1: "",
      evEbitda1: "",
      marketCap2: "",
      enterpriseValue2: "",
      revenue2: "",
      ebitda2: "",
      evRevenue2: "",
      evEbitda2: "",
      marketCap3: "",
      enterpriseValue3: "",
      revenue3: "",
      ebitda3: "",
      evRevenue3: "",
      evEbitda3: "",
      comparablesArray:[],
      error:""
    };
  },



  changeCompanyInfo: function(event){
    var id = event.target.id;
    var data = {};
    event.target.value = this.props.stringNumber(event.target.value);
    if (isNaN(event.target.value)){
      return;
    }
    var companyInfo = this.props.numberFormatting(event.target.value);
    event.target.value = companyInfo;
    data[id] = companyInfo;
    return this.setState(data);
  },

  computeCompanyValue: function(key, cr, ce, evr, eve){

    if (key === '1'){
      this.state.comparablesArray[0]= Math.round(this.props.stringNumber(cr)*this.props.stringNumber(evr))*.8;
      this.state.comparablesArray[1]= Math.round(this.props.stringNumber(ce)*this.props.stringNumber(eve))*.8;
      this.setState({
        companyValueRevenue1:`$${this.props.numberFormatting(this.state.comparablesArray[0])}`,
        companyValueEbitda1: `$${this.props.numberFormatting(this.state.comparablesArray[1])}`,
      });
    }

    if (key === '2') {
      this.state.comparablesArray[2]= Math.round(this.props.stringNumber(cr)*this.props.stringNumber(evr))*.8;
      this.state.comparablesArray[3]= Math.round(this.props.stringNumber(ce)*this.props.stringNumber(eve))*.8;
      this.setState({
        companyValueRevenue2:`$${this.props.numberFormatting(this.state.comparablesArray[2])}`,
        companyValueEbitda2: `$${this.props.numberFormatting(this.state.comparablesArray[3])}`,
      });
    }

    if (key === '3') {
      this.state.comparablesArray[4]= Math.round(this.props.stringNumber(cr)*this.props.stringNumber(evr))*.8;
      this.state.comparablesArray[5]= Math.round(this.props.stringNumber(ce)*this.props.stringNumber(eve))*.8;
      this.setState({
        companyValueRevenue3:`$${this.props.numberFormatting(this.state.comparablesArray[4])}`,
        companyValueEbitda3: `$${this.props.numberFormatting(this.state.comparablesArray[5])}`,
      });

    }
    var divider = 0;
    var revSum = 0;
    var ebitdaSum  = 0;

    for (var x = 0; x<this.state.comparablesArray.length; x++){
      if (this.state.comparablesArray[x]<=0){
        this.setState({error: "One or more of the companies entered has a negative value for EBITDA. Negative values make the comparison meaningless. Look at table below and replace that company's ticker with a new one or remove it and resubmit."});
      }
      if (this.state.comparablesArray[x] && x%2 ===0){
        revSum += this.state.comparablesArray[x];
        divider += 1;
      }
      if (this.state.comparablesArray[x] && x%2 ===1){
        ebitdaSum += this.state.comparablesArray[x];
      }
    }

    this.setState({
      companyValueRevenue: `$${this.props.numberFormatting(Math.round(revSum/divider))}`,
      companyValueEbitda: `$${this.props.numberFormatting(Math.round(ebitdaSum/divider))}`
    });

  },

  changeComps: function(event){
    var ticker  = event.target.value;
    var id = event.target.id;
    var data = {};
    data[id] = ticker;
    this.setState(data);
  },

  getComps: function(event){
    event.preventDefault();
    this.setState({
      companyValueRevenue1:"",
      companyValueEbitda1:"",
      companyValueRevenue2:"",
      companyValueEbitda2:"",
      companyValueRevenue3:"",
      companyValueEbitda3:"",
      companyName1:"",
      companyName2:"",
      companyName3:"",
      marketCap1: "",
      enterpriseValue1: "",
      revenue1: "",
      ebitda1: "",
      evRevenue1: "",
      evEbitda1: "",
      marketCap2: "",
      enterpriseValue2: "",
      revenue2: "",
      ebitda2: "",
      evRevenue2: "",
      evEbitda2: "",
      marketCap3: "",
      enterpriseValue3: "",
      revenue3: "",
      ebitda3: "",
      evRevenue3: "",
      evEbitda3: "",
      comparablesArray:[],
      error:""
    });

    var tickers  = {1:this.state.ticker1, 2:this.state.ticker2, 3:this.state.ticker3};
    for (var i=0; i<companylist.length; i++){
      if ((this.state.ticker1).toUpperCase()===companylist[i].Symbol){
        this.setState({
          companyName1:companylist[i].Name
        });
      }
      if ((this.state.ticker2).toUpperCase()===companylist[i].Symbol){
        this.setState({
          companyName2:companylist[i].Name
        });
      }
      if ((this.state.ticker3).toUpperCase()===companylist[i].Symbol){
        this.setState({
          companyName3:companylist[i].Name
        });
      }
    }
    var that = this;
    async.forEachOf(tickers, function (value, key, callback) {

      $.ajax({
        type: "GET",
        url: "https://localhost:3000/yahoostockquery/"+[value],
        contentType: 'application/json',
        success: function(results){
          that.setState({
            ["marketCap"+key]:results[0].numbers,
            ['enterpriseValue'+key]:results[1].numbers,
            ['revenue'+key]:results[15].numbers,
            ['ebitda'+key]:results[19].numbers,
            ['evRevenue'+key]:results[7].numbers,
            ['evEbitda'+key]: results[8].numbers
          }),

          that.computeCompanyValue(key, that.state.companyRevenue, that.state.companyEbitda, that.state['evRevenue'+key], that.state['evEbitda'+key]);
        },
      });

      callback();
    });
    $("html, body").animate({ scrollTop: $(document).height() }, "slow");
  },

  render: function(){
    return (
      <div>
        <form  className = "cashflows" onSubmit ={this.getComps}>
          <div className = "col-md-6">
          <h3>Public Comps</h3>
          <p className="description">
          In the Boxes below - Input the stock ticker symbols of one to three comparable companies and your company's 12-month trailing Revenue and EBITDA. A 20% liquidity discount is applied because you are private company.
        </p>

            <br/>
            <br/>
            <label>Ticker 1:</label>
            <input  className = "form-control" id = 'ticker1' type  = "text"  defaultValue = "" placeholder = "Ticker Symbol" onChange = {this.changeComps}/>
            <br/>
            <label>Ticker 2:</label>
            <input  className = "form-control" id = 'ticker2' type  = "text"  defaultValue = "" placeholder = "Ticker Symbol" onChange = {this.changeComps}/>
            <br/>
            <label>Ticker 3:</label>
            <input  className = "form-control" id = 'ticker3' type  = "text"  defaultValue = "" placeholder = "Ticker Symbol" onChange = {this.changeComps}/>
            <br/>
            <label>Revenue:</label>
            <input  className = "form-control" id = 'companyRevenue' value  = {this.state.companyRevenue}  type  = "text"  defaultValue = "" placeholder = "Your Revenue" onChange = {this.changeCompanyInfo}/>
            <br/>
            <label>EBITDA:</label>
            <input  className = "form-control" id = 'companyEbitda' value  = {this.state.companyEbitda} type  = "text"  defaultValue = "" placeholder = "Your EBITDA" onChange = {this.changeCompanyInfo}/>
            <br/>
            <br/>
            <button className = "btn btn-primary">Retrieve Comps</button>
            <br/>
            <br/>
            <label>Search for a Public Company Ticker</label>
            <br/>
            <Searchticker/>
          </div>
          <br/>
          <br/>
        </form>
        <br/>
        <br/>
        {this.renderResults()}
        <p className = "danger">{this.state.error}</p>
        <br/>
      </div>

    );
  },
  renderResults: function(){
    if (this.state.companyValueRevenue1 != '' || this.state.companyValueRevenue2 != '' || this.state.companyValueRevenue2 != ''){
      return (
        <div>
          <table className = "cashflows, table">
          <thead>
            <tr>
              <th className ="row-1, row-info" >Comparable Company Numbers</th>
              <th className ="row-2, row-comp1"></th>
              <th className ="row-3, row-comp2"></th>
              <th className= "row-4, row-comp3"></th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Company Name</td>
              <td>{this.state.companyName1}</td>
              <td>{this.state.companyName2}</td>
              <td>{this.state.companyName3}</td>
              </tr>
            <tr>
              <td>Company Ticker Symbol</td>
              <td>{this.state.ticker1}</td>
              <td>{this.state.ticker2}</td>
              <td>{this.state.ticker3}</td>
            </tr>
            <tr>
              <td>Market Capitalization</td>
              <td>{this.state.marketCap1}</td>
              <td>{this.state.marketCap2}</td>
              <td>{this.state.marketCap3}</td>
            </tr>
            <tr>
              <td>Enterprise Value</td>
              <td>{this.state.enterpriseValue1}</td>
              <td>{this.state.enterpriseValue2}</td>
              <td>{this.state.enterpriseValue3}</td>
            </tr>
            <tr>
              <td>Revenue</td>
              <td>{this.state.revenue1}</td>
              <td>{this.state.revenue2}</td>
              <td>{this.state.revenue3}</td>
            </tr>
            <tr>
              <td>EBITDA</td>
              <td>{this.state.ebitda1}</td>
              <td>{this.state.ebitda2}</td>
              <td>{this.state.ebitda3}</td>
            </tr>
            <tr>
              <td>Enterprise Value / Revenue</td>
              <td>{this.state.evRevenue1}</td>
              <td>{this.state.evRevenue2}</td>
              <td>{this.state.evRevenue3}</td>
            </tr>
            <tr>
              <td>Enterprise Value / EBITDA</td>
              <td>{this.state.evEbitda1}</td>
              <td>{this.state.evEbitda2}</td>
              <td>{this.state.evEbitda3}</td>
            </tr>
            <tr className = "value">
              <td>Your Value - multiple of Revenue</td>
              <td>{this.state.companyValueRevenue1}</td>
              <td>{this.state.companyValueRevenue2}</td>
              <td>{this.state.companyValueRevenue3}</td>
            </tr>
            <tr className = "value">
              <td>Your Value - multiple of EBITDA</td>
              <td>{this.state.companyValueEbitda1}</td>
              <td>{this.state.companyValueEbitda2}</td>
              <td>{this.state.companyValueEbitda3}</td>
            </tr>
            <tr className = "value">
              <td>Average Value - multiple of Revenue</td>
              <td>{this.state.companyValueRevenue}</td>
              <td></td>
              <td></td>
            </tr>
            <tr className = "value">
              <td>Average Value - multiple of EBITDA</td>
              <td>{this.state.companyValueEbitda}</td>
              <td></td>
              <td></td>
            </tr>
            </tbody>
          </table>
          <br/>
          <br/>
        </div>
      );
    }
  }

});



module.exports = Publiccomps;
