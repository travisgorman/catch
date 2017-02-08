var React = require('react');
var ReactDOM = require('react-dom');

console.log('react:', React );
console.log('react-dom:', ReactDOM  );

var StorePicker = React.createClass({
	render: function(){
		var name = "travis"
		return (  
		  <form className="store-selector">
		  	{ /* comment inside JSX needs to be inside brackets */ }
		  	<h2>Please Enter A Store {name}</h2>
		  	<input type="text" ref="storeId"/>
		  	<input type="submit" required />
		  </form>
		)
	}

});

ReactDOM.render(  
  <StorePicker/>,
  document.querySelector('#main')
);