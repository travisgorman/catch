var React = require('react');
var ReactDOM = require('react-dom');
var ReactRouter = require('react-router');
var Router = ReactRouter.Router;
var Route = ReactRouter.Route;
var Navigation = ReactRouter.Navigation;
var History = ReactRouter.History;
var createBrowserHistory = require('history/lib/createBrowserHistory');
import h from './helpers';
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
	render() {
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
	mixins: [ History ],
	goToStore(e) {
		e.preventDefault();
		let storeId = this.refs.storeId.value;
		this.history.pushState(null, '/store/' + storeId);
	},
	render: function(){
		return (
		  <form className="store-selector" onSubmit={this.goToStore}>
		  	<h2>Please Enter A Store</h2>
		  	<input type="text" ref="storeId" defaultValue={ h.getFunName() } />
		  	<input type="submit" required />
		  </form>
		)
	}
});
/*
	NotFound - 404
	<NotFound />
*/
const NotFound = React.createClass({
	render: function(){
		return (  
			<h1>Not Found!</h1>
		)
	}
});
/*
	Routes
*/
var routes = (  
  <Router 
  	history={createBrowserHistory()} >
  	<Route path="/" component={StorePicker} />
  	<Route path="/store/:storeId" component={App} />
  	<Route path="*" component={NotFound} />
  </Router>
)
/*
	Render to DOM
*/
ReactDOM.render(  
  routes,
  document.querySelector('#main')
);