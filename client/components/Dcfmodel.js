var React = require('react'),
    $ = require('jQuery');
    Publiccomps = require('./Publiccomps');

var Dcfmodel  = React.createClass({

  getInitialState: function(){
    return {
      cashFlowYear1: "",
      cashFlowYear2: "",
      cashFlowYear3: "",
      cashFlowYear4: "",
      cashFlowYear5: "",
      companyValue: "",
      discountRate:"",
      longTermGrowthRate:""
    };
  },
  // adds commas to the input number
  numberFormatting: function(event){
      return (new Intl.NumberFormat({ style: 'currency', currency: 'USD' }).format(event));
  },
  // changes string back to a number
  stringNumber: function(event){
      return ((event).replace(/[, ]+/g, "").trim());
  },

  changeCashFlow: function(event){
    event.target.value = this.stringNumber(event.target.value);
    //console.log(event.target.value);
    var cashflow = this.numberFormatting(event.target.value);
    event.target.value = cashflow;
    var id = event.target.id;
    var data = {};
    data[id] = cashflow;
    this.setState(data)
  },


  discountedValue: function(array,rate, grwthrate){
    grwthrate = 1 + grwthrate/100;
    rate = 1 + rate/100 ;
    var cf = array.map(this.stringNumber);
    return Math.round((cf[0]/rate+ cf[1]/(Math.pow(rate,2))+ cf[2]/(Math.pow(rate,3))+cf[3]/(Math.pow(rate,4))+cf[4]/(Math.pow(rate,5))+
    (cf[4]*grwthrate/(rate-grwthrate))/(Math.pow(rate,5))));
  },

  computeValue: function(event){
    event.preventDefault();
    var companysValue  = this.discountedValue([this.state.cashFlowYear1, this.state.cashFlowYear2, this.state.cashFlowYear3, this.state.cashFlowYear4, this.state.cashFlowYear5], this.state.discountRate, this.state.longTermGrowthRate);
    companysValue = this.numberFormatting(companysValue);
    this.setState({companyValue : companysValue})
  },

  render: function(){
  console.log(this.state)
    return (
      <div>
      <h3 className = "cashflows"> Input Cash Flows</h3>
      <form  className = "cashflows" onSubmit ={this.computeValue} > In the Boxes below - Input your projected cashflow for each of the next 5 years. A good approximation of cash flow is EBITDA minus average annual capital expenditures. EBITDA is earnings before interest, taxes, depreciation and amortization.
        <br/>
        <br/>
        <input  id = 'cashFlowYear1' type  = "text"  defaultValue = "" placeholder = "Year 1 cashflow" onChange = {this.changeCashFlow}/>
        <input id  ='cashFlowYear2' type  = "text"  defaultValue = "" placeholder = "Year 2 cashflow" onChange = {this.changeCashFlow}/>
        <input id  ='cashFlowYear3' type  = "text"  defaultValue = "" placeholder = "Year 3 cashflow" onChange = {this.changeCashFlow}/>
        <input id  ='cashFlowYear4' type  = "text" defaultValue = "" placeholder = "Year 4 cashflow" onChange = {this.changeCashFlow}/>
        <input id = 'cashFlowYear5' type  = "text"  defaultValue = "" placeholder = "Year 5 cashflow" onChange = {this.changeCashFlow}/>
        <br/>
        <br/>
        <p>Enter the Discount Rate   {this.state.discountRate}%</p>
        <input id  = 'discountRate' type  = "text"  defaultValue = "" placeholder = "Discount Rate" onChange = {this.changeCashFlow}/>
        <br/>
        <br/>
        <p>Enter the Long Term Growth Rate of Cash Flows after year five   {this.state.longTermGrowthRate}%</p>
        <input id = "longTermGrowthRate" type  = "text"  defaultValue = "" placeholder = "Growth Rate" onChange = {this.changeCashFlow}/>
        <br/>
        <br/>
        <button>Calculate Value</button>

        </form>
        <h4 className = "cashflows">Company Value ${this.state.companyValue}</h4>
        <br/>
        <br/>
        <Publiccomps/>
      </div>

    );
  }
});

module.exports  = Dcfmodel;
