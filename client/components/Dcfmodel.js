var React = require('react'),
    $ = require('jQuery');

var Dcfmodel  = React.createClass({

  getInitialState: function(){

    return {
      cashFlowYear1: "",
      cashFlowYear2: "",
      cashFlowYear3: "",
      cashFlowYear4: "",
      cashFlowYear5: "",
      companyValue: ""
    };

  },

  changeCashFlow: function(event){
    var cashflow = event.target.value;
    var id = event.target.id;
    var data = {};
    data[id] = cashflow;

    this.setState(
      data
    )


  },

  computeValue: function(event){
    event.preventDefault();
    var interestRate  = 1.2;
    console.log('running company value');
    var companysValue  = Math.round((this.state.cashFlowYear1/interestRate+
    this.state.cashFlowYear2/(Math.pow(interestRate,2))+
    this.state.cashFlowYear3/(Math.pow(interestRate,3))+
    this.state.cashFlowYear4/(Math.pow(interestRate,4))+
    this.state.cashFlowYear5/(Math.pow(interestRate,5))));
    console.log(companysValue);
    this.setState({
      companyValue : companysValue
    })
},




  render: function(){
  console.log(this.state)
    return (
      <div>
      <h3 className = "cashflows"> Input Cash Flows</h3>
      <form onSubmit ={this.computeValue} >
        <input id = 'cashFlowYear1' type  = "text"  defaultValue = "" placeholder = "Year 1 cashflow" onChange = {this.changeCashFlow}/>
        <input id  ='cashFlowYear2' type  = "text"  defaultValue = "" placeholder = "Year 2 cashflow" onChange = {this.changeCashFlow}/>
        <input id  ='cashFlowYear3' type  = "text"  defaultValue = "" placeholder = "Year 3 cashflow" onChange = {this.changeCashFlow}/>
        <input id  ='cashFlowYear4' type  = "text" defaultValue = "" placeholder = "Year 4 cashflow" onChange = {this.changeCashFlow}/>
        <input id = 'cashFlowYear5' type  = "text"  defaultValue = "" placeholder = "Year 5 cashflow" onChange = {this.changeCashFlow}/>
        <button>Calculate Value</button>
      </form>
      <p>Company Value {this.state.companyValue}</p>
      </div>

    );



  }




});

module.exports  = Dcfmodel;
