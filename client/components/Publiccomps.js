var React = require('react'),
    $ = require('jQuery'),
    async = require('async');



var Publiccomps = React.createClass({

  getInitialState: function(){
    return {
      companyRevenue:"",
      companyEbitda:"",
      companyValueRevenue1:"",
      companyValueEbitda1:"",
      companyValueRevenue2:"",
      companyValueEbitda2:"",
      companyValueRevenue3:"",
      companyValueEbitda3:"",
      ticker1:"",
      ticker2:"",
      ticker3:"",
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
      comparablesArray:[]
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

  computeCompanyValue: function(key, cr, ce, evr, eve){

    if (key === '1'){this.state.comparablesArray[0]=Math.round((this.props.stringNumber(cr)*this.props.stringNumber(evr))-(.20*(this.props.stringNumber(cr)*this.props.stringNumber(evr))));
    this.state.comparablesArray[1]=Math.round((this.props.stringNumber(ce)*this.props.stringNumber(eve))-(.20*(this.props.stringNumber(ce)*this.props.stringNumber(eve))));}

    if (key === '2'){this.state.comparablesArray[2]=Math.round((this.props.stringNumber(cr)*this.props.stringNumber(evr))-(.20*(this.props.stringNumber(cr)*this.props.stringNumber(evr))));
    this.state.comparablesArray[3]=Math.round((this.props.stringNumber(ce)*this.props.stringNumber(eve))-(.20*(this.props.stringNumber(ce)*this.props.stringNumber(eve))));}

    if (key === '3'){this.state.comparablesArray[4]=Math.round((this.props.stringNumber(cr)*this.props.stringNumber(evr))-(.20*(this.props.stringNumber(cr)*this.props.stringNumber(evr))));
    this.state.comparablesArray[5]=Math.round((this.props.stringNumber(ce)*this.props.stringNumber(eve))-(.20*(this.props.stringNumber(ce)*this.props.stringNumber(eve))));}

    this.setState({
      companyValueRevenue1:this.props.numberFormatting(this.state.comparablesArray[0]),
      companyValueEbitda1: this.props.numberFormatting(this.state.comparablesArray[1]),
      companyValueRevenue2:this.props.numberFormatting(this.state.comparablesArray[2]),
      companyValueEbitda2: this.props.numberFormatting(this.state.comparablesArray[3]),
      companyValueRevenue3:this.props.numberFormatting(this.state.comparablesArray[4]),
      companyValueEbitda3: this.props.numberFormatting(this.state.comparablesArray[5])
    })
    this.setState({
      companyValueRevenue: this.props.numberFormatting(Math.round((this.state.comparablesArray[0]+this.state.comparablesArray[2]+this.state.comparablesArray[4])/3)),
      companyValueEbitda: this.props.numberFormatting(Math.round((this.state.comparablesArray[1]+this.state.comparablesArray[3]+this.state.comparablesArray[5])/3))
    })

  },

  changeComps: function(event){
    var ticker  = event.target.value
    var id = event.target.id;
    var data = {};
    data[id] = ticker;
    this.setState(data);
  },

  getComps: function(event){
    event.preventDefault();
    this.setState({
      comparablesArray:[],
    })

    var tickers  = {1:this.state.ticker1, 2:this.state.ticker2, 3:this.state.ticker3};
    var that = this;
    async.forEachOf(tickers, function (value, key, callback) {

      $.ajax({
        type: "GET",
        url: "http://localhost:3000/yahoostockquery/"+[value],
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

          that.computeCompanyValue(key,that.state.companyRevenue, that.state.companyEbitda, that.state['evRevenue'+key], that.state['evEbitda'+key]);
        },
      });

      callback();
      // console.log("tse",this.state.enterpriseValue1)

    //// callback goes here
    });
  },

  render: function(){
    console.log(this.state);
    return (
      <div>
        <h3 className = "cashflows"> Public Comps</h3>
        <form  className = "cashflows" onSubmit ={this.getComps} > In the Boxes below - Input the ticker symbols of three comparable companies and your company's 12-month trailing Revenue and EBITDA. A 20% liquidity discount is applied because you are private company.
          <br/>
          <br/>
          <input  id = 'ticker1' type  = "text"  defaultValue = "" placeholder = "Ticker Symbol" onChange = {this.changeComps}/>
          <input  id = 'ticker2' type  = "text"  defaultValue = "" placeholder = "Ticker Symbol" onChange = {this.changeComps}/>
          <input  id = 'ticker3' type  = "text"  defaultValue = "" placeholder = "Ticker Symbol" onChange = {this.changeComps}/>
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
        <h5 className = "cashflows">Your Company's value based on average multiple of Revenue is ${this.state.companyValueRevenue}</h5>
        <h5 className= "cashflows">Your Company's value based on average multiple of EBITDA is ${this.state.companyValueEbitda}</h5>
        <br/>
        <br/>
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
          <tr>
            <td>Your Company's Value based on multiple of Revenue</td>
            <td>${this.state.companyValueRevenue1}</td>
            <td>${this.state.companyValueRevenue2}</td>
            <td>${this.state.companyValueRevenue3}</td>
          </tr>
          <tr>
            <td>Your Company's Value based on multiple of EBITDA</td>
            <td>${this.state.companyValueEbitda1}</td>
            <td>${this.state.companyValueEbitda2}</td>
            <td>${this.state.companyValueEbitda3}</td>
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
