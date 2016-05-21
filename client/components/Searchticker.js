var React = require('react');
var companylist = require('../companylist');
var symbol = require('../symbol');

var companylistsymbol  = [];

function companylistmaker(){
  for (var i = 0; i< companylist.length; i++){
    companylistsymbol.push(companylist[i]+" "+"Ticker ="+"  "+symbol[i]);
  }
  return companylistsymbol;
}

companylistmaker();


var companylistsymbol = new Bloodhound({
    datumTokenizer: Bloodhound.tokenizers.whitespace,
    queryTokenizer: Bloodhound.tokenizers.whitespace,
    local:companylistsymbol
});

$('#Bloodhound .typeahead').typeahead({
    hint: true,
    highlight:true,
    minLength:1
  },
  {
    name: "companylistsymbol",
    source: companylistsymbol

});

var Searchticker = React.createClass({

    getInitialState: function(){
      return {
        companyName: ""
      };
    },

    handleChange: function(event) {

      this.setState({
        companyName:event.target.value
      });
    },

    componentDidMount: function() {
      // this was causing page to load at this DOMNode
      //React.findDOMNode(this.refs.myTextInput).focus();
      $(React.findDOMNode(this.refs.myTextInput)).typeahead({
        hint: true,
        highlight: true,
        minLength: 1
      },
      {
        name: 'companylist',
        source: companylistsymbol
      });
    },

    render: function() {
      return (
        <div>
          <div id="bloodhound">
          <div className ="form-group">
            <input className="typeahead form-control" type="text" placeholder="Search for Public Company Ticker" ref="myTextInput"  onChange={this.handleChange} onBlur={this.handleChange} /></div>
          </div>
        </div>
      );
    }
  });


module.exports = Searchticker;
