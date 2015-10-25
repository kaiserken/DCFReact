var React  = require("react");
var $ = require("jQuery");
var Dcfmodel  = require('./Dcfmodel')

var Page = React.createClass({

render: function(){
  return(

    <div>
      <Dcfmodel/>
    </div>

  );
}
});

module.exports = Page;
