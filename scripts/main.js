var React = require('react');
var ReactDOM = require('react-dom');

console.log('react:', React );
console.log('react-dom:', ReactDOM  );

const App = React.createClass({
	render(){

		return (  
			<div className="catch-of-the-day">
				<div className="menu">
					<Header />					
				</div>
				<Order />
				<Inventory />
			</div>	  
		)		
	}	
});

const Header = React.createClass({
	render(){

		return (  
		  <p>Header</p>
		)
	}
});

const Order = React.createClass({
	render(){

		return (  
		  <p>Order</p>
		)
	}
});

const Inventory = React.createClass({
	render(){

		return (  
		  <p>Inventory</p>
		)
	}
});

const StorePicker = React.createClass({
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
  <App/>,
  document.querySelector('#main')
);