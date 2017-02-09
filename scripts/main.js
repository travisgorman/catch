var React = require('react');
var ReactDOM = require('react-dom');


/*
	the layout - root component rendered to DOM
*/
const App = React.createClass({
	render(){

		return (  
			<div className="catch-of-the-day">
				<div className="menu">
					<Header tagline="Fresh Seafood Market"/>					
				</div>
				<Order />
				<Inventory />
			</div>	  
		)		
	}	
});
/*
	Header Component
	<Header/>
*/
const Header = React.createClass({
	render(){
		console.log( this.props )
		return (  
		  <header className="top">
		  	<h1>Catch 
		  	<span className="ofThe">
		  		<span className="of">of</span>
		  		<span className="the">the</span>
		  	</span>
		  	
		  	Day</h1>
		  	<h3 className="tagline">
		  		<span>{this.props.tagline}</span>
		  	</h3>
		  </header>
		)
	}
});
/*
	Order Component
	<Order/>
*/
const Order = React.createClass({
	render(){

		return (  
		  <p>Order</p>
		)
	}
});
/*
	Inventory Component
	<Inventory/>
*/
const Inventory = React.createClass({
	render(){

		return (  
		  <p>Inventory</p>
		)
	}
});
/*
	StorePicker Component
	<StorePicker/>
*/
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
/*

*/
ReactDOM.render(  
  <App/>,
  document.querySelector('#main')
);