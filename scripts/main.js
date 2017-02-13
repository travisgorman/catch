var React = require('react');
var ReactRouter = require('react-router');
var ReactDOM = require('react-dom');
var Router = ReactRouter.Router;
var Route = ReactRouter.Route;
var Navigation = ReactRouter.Navigation;
var History = ReactRouter.History;
var createBrowserHistory = require('history/lib/createBrowserHistory');
var h = require('./helpers');

const App = React.createClass({
	getInitialState() {
		return {
			fishes: {},
			order: {},
		}
	},
	addToOrder(key) {
		this.state.order[key] = this.state.order[key] + 1 || 1;
		this.setState({
			order: this.state.order
		});
	},
	addFish(fish) {
		let timestamp = (new Date()).getTime();
		this.state.fishes['fish-'+timestamp] = fish;
		this.setState({fishes: this.state.fishes});
	},
	loadSamples() {
		this.setState({
			fishes: require('./sample-fishes')
		});
	},
	renderFish(key) {
		return (  
		  <Fish 
		  	key={key}
		  	index={key} 
		  	details={this.state.fishes[key]}
		  	addToOrder={this.addToOrder} />
		)
	},
	render() {
		return (
			<div className="catch-of-the-day">
				<div className="menu">
					<Header tagline="Fresh Seafood Market"/>
					<ul className="list-of-fishes">
						{Object.keys(this.state.fishes)
							.map(this.renderFish)}
					</ul>
				</div>
				<Order fishes={this.state.fishes} order={this.state.order} />
				<Inventory addFish={this.addFish} loadSamples={this.loadSamples}/>
			</div>
		)
	}
});

const Fish = React.createClass({
	onButtonClick() {
		let key = this.props.index;
		this.props.addToOrder(key);
	},
	render() {
		let details = this.props.details;
		let isAvailable = (details.status === 'available' ? true : false);
		let buttonText = (isAvailable ? 'Add To Order' : 'Sold Out!');
		return (  
		  <li className="menu-fish">
		  	<img src={details.image} alt={details.name}/>
		  	<h3 className="fish-name">
		  		{details.name}
			  	<span className="price">
			  		{details.price}
		  		</span>
		  	</h3>
		  	<p>{details.desc}</p>
		  	<button 
		  		onClick={this.onButtonClick} 
		  		disabled={!isAvailable}>
		  		{buttonText}
	  		</button>
	  	</li>
		)
	}
});

/*
	Add Fish Form Component
	<AddFishForm/>
*/
const AddFishForm = React.createClass({
	createFish(e) {
		e.preventDefault();
		let fish = {
			name:  this.refs.name.value,
			price:  this.refs.price.value,
			status:  this.refs.status.value,
			desc:  this.refs.desc.value,
			image:  this.refs.image.value
		};                
		this.props.addFish(fish);
		this.refs.fishForm.reset();
	},
	render() {
		return (
		  <form className="fish-edit" ref="fishForm" onSubmit={this.createFish}>
		  	<input type="text" ref="name" placeholder="Fish Name"/>
		  	<input type="text" ref="price" placeholder="Fish Price"/>
		  	<select ref="status">
		  		<option value="available">Fresh!</option>
		  		<option value="unavailable">Sold Out!</option>
		  	</select>
		  	<textarea type="text" ref="desc" placeholder="Desc"></textarea>
		  	<input type="text" ref="image" placeholder="URL to Image" />
		  	<button type="submit" >Add Item</button>
		  </form>
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
	renderOrder(key) {
		let fish = this.props.fishes[key];
		let count = this.props.order[key];
		if (!fish) {
			return <li key={key}>Sorry, fish no longer available!</li>;
		}
		return (
		  <li>
		  	{count}lbs{fish.name}
		  	<span className="price">{h.formatPrice(count * fish.price)}</span>		  	
		  </li>
	  )
	},
	render() {
		let orderIds = Object.keys(this.props.order);
		let total = orderIds.reduce((prevTotal, key)=> {
			let fish = this.props.fishes[key];
			let count = this.props.order[key];
			let isAvailable = fish && fish.status === 'available';
			if (fish && isAvailable) {
				return prevTotal + (count * parseInt(fish.price) || 0);
			}
			return prevTotal;
		}, 0);
		return (
		  <div className="order-wrap">
		  	<h2 className="order-title">Your Order</h2>
		  	<ul className="order">
		  		{orderIds.map(this.renderOrder)}
			  	<li className="total">
			  		<strong>Total:</strong>
			  		{h.formatPrice(total)}
			  	</li>
		  	</ul>
		  </div>
		)
	}
});
/*
	Inventory Component
	<Inventory/>
*/
const Inventory = React.createClass({
	render() {
		return (
			<div>
			  <h2>Inventory</h2>
			  <AddFishForm {...this.props}/>
			  <button onClick={this.props.loadSamples}>Load Sample Fishes</button>
			</div>
		)
	}
});
/*
	StorePicker Component
	<StorePicker/>
*/
const StorePicker = React.createClass({
	mixins: [History],
	goToStore(e) {
		e.preventDefault();
		let storeId = this.refs.storeId.value;
		this.history.pushState(null, '/store/' + storeId);
	},
	render: function() {
		return (
		  <form className="store-selector" onSubmit={this.goToStore}>
		  	<h2>Please Enter A Store</h2>
		  	<input type="text" ref="storeId" defaultValue={h.getFunName()} />
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
	render: function() {
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