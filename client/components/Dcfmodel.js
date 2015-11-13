var React = require('react'),
    //$ = require('jQuery');
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

  numberFormatting: function(event){
      return (new Intl.NumberFormat({ style: 'currency',currency: 'USD' }).format(event));
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
    return this.setState(data)
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
      <div className ='col-md-12'>
      <h3 className ="cashflows, col-md-6">Discounted Cashflow</h3>
      <h3 className ="cashflows, col-md-6">Public Comps</h3>
      <form  className ="cashflows, col-md-6" onSubmit ={this.computeValue} > In the Boxes below - Input your projected cashflow for each of the next 5 years. A good approximation of cash flow is EBITDA minus average annual capital expenditures. EBITDA is earnings before interest, taxes, depreciation and amortization.
        <br/>
        <br/>
        <input  id = 'cashFlowYear1' type  = "text"  defaultValue = "" placeholder = "Year 1 cashflow" onChange = {this.changeCompanyInfo}/>
        <input id  ='cashFlowYear2' type  = "text"  defaultValue = "" placeholder = "Year 2 cashflow" onChange = {this.changeCompanyInfo}/>
        <input id  ='cashFlowYear3' type  = "text"  defaultValue = "" placeholder = "Year 3 cashflow" onChange = {this.changeCompanyInfo}/>
        <input id  ='cashFlowYear4' type  = "text" defaultValue = "" placeholder = "Year 4 cashflow" onChange = {this.changeCompanyInfo}/>
        <input id = 'cashFlowYear5' type  = "text"  defaultValue = "" placeholder = "Year 5 cashflow" onChange = {this.changeCompanyInfo}/>
        <br/>
        <br/>
        <p>Enter the Discount Rate   {this.state.discountRate}%</p>
        <input id  = 'discountRate' type  = "text"  defaultValue = "" placeholder = "Discount Rate" onChange = {this.changeCompanyInfo}/>
        <br/>
        <br/>
        <p>Enter the Long Term Growth Rate of Cash Flows after year five   {this.state.longTermGrowthRate}%</p>
        <input id = "longTermGrowthRate" type  = "text"  defaultValue = "" placeholder = "Growth Rate" onChange = {this.changeCompanyInfo}/>
        <br/>
        <br/>
        <button>Calculate Value</button>
        <br/>
        <br/>
        </form>

        <Publiccomps className ='col-md-6' companyValue = {this.state.companyValue} numberFormatting = {this.numberFormatting} stringNumber = {this.stringNumber} />
        <br/>
        <br/>


      </div>

    );
  }
});

module.exports  = Dcfmodel;
