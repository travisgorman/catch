var React = require('react');
var ReactDOM = require('react-dom');

console.log('react:', React );
console.log('react-dom:', ReactDOM  );

var StorePicker = React.createClass({
	render: function(){
		return (  
		  <h1>Hello</h1>
		)
	}
});

ReactDOM.render(  
  <StorePicker/>,
  document.querySelector('#main')
);