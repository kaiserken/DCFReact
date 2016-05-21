var React = require('react');
var Publiccomps = require('./Publiccomps');

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
    return this.setState(data);
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
    this.setState({companyValue : `Your Company's Discounted Cashflow Value $${companysValue}`});
  },

  render: function(){
    return (
      <div>
        <div>
          <h3 className ="cashflows">Discounted Cashflow</h3>
          <form  className ="cashflows" onSubmit ={this.computeValue} >
            <div>In the Boxes below - Input your projected cashflow for each of the next 5 years./N A good approximation of cash flow is EBITDA minus average annual capital expenditures. EBITDA is earnings before interest, taxes, depreciation and amortization. Enter a Discount Rate for cashflows - For established companies the Discount Rate is often between 15% & 25%. Enter a Long Term Growth Rate for Cashflows - A safe rate to use would be between 1% and 3%</div>
            <div className = "col-md-6">
            <br/>
            <br/>
            <input  id = 'cashFlowYear1' type  = "text"  defaultValue = "" placeholder = "Year 1 cashflow" onChange = {this.changeCompanyInfo}/>
            <br/>
            <input id  ='cashFlowYear2' type  = "text"  defaultValue = "" placeholder = "Year 2 cashflow" onChange = {this.changeCompanyInfo}/>
            <br/>
            <input id  ='cashFlowYear3' type  = "text"  defaultValue = "" placeholder = "Year 3 cashflow" onChange = {this.changeCompanyInfo}/>
            <br/>
            <input id  ='cashFlowYear4' type  = "text" defaultValue = "" placeholder = "Year 4 cashflow" onChange = {this.changeCompanyInfo}/>
            <br/>
            <input id = 'cashFlowYear5' type  = "text"  defaultValue = "" placeholder = "Year 5 cashflow" onChange = {this.changeCompanyInfo}/>
            </div>
            <div className = "col-md-6">
            <br/>
            <br/>  
            <p>Your Discount Rate: {this.state.discountRate}%</p>
            <input id  = 'discountRate' type  = "text"  defaultValue = "" placeholder = "Discount Rate" onChange = {this.changeCompanyInfo}/>
            <br/>
            <br/>
            <p>  </p>
            <p>Your Growth Rate: {this.state.longTermGrowthRate}%</p>
            <input id = "longTermGrowthRate" type  = "text"  defaultValue = "" placeholder = "Growth Rate" onChange = {this.changeCompanyInfo}/>
            <br/>
            <br/>
            </div>
            <button>Calculate Value</button>
            <br/>
            <br/>
            <p className = "value">{this.state.companyValue}</p>
            </form>


            <h3 className ="cashflows" >Public Comps</h3>
            <Publiccomps  companyValue = {this.state.companyValue} numberFormatting = {this.numberFormatting} stringNumber = {this.stringNumber} />
          </div>
        <br/>
        <br/>


      </div>

    );
  }
});

module.exports  = Dcfmodel;
