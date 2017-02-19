import React from 'react'
import Catalyst from 'react-catalyst'
import Rebase from 're-base'
import sampleFish from '../sample-fishes'
import Fish from './Fish'
import Header from './Header'
import Order from './Order'
import Inventory from './Inventory'
let base =  Rebase.createClass('https://catch-bfec7.firebaseio.com')

const App = React.createClass({
	mixins: [Catalyst.LinkedStateMixin],	
	getInitialState() {
		return {
			fishes: {},
			order: {},
		}
	},
	componentDidMount() {
		base.syncState(`${this.props.params.storeId}/fishes`, 
			{context: this, state: 'fishes'});
		var localStorageRef = localStorage.getItem(`order-${this.props.params.storeId}`);
		if (localStorageRef) {
			this.setState({ order: JSON.parse(localStorageRef) });
		}
	},
	componentWillUpdate(nextProps, nextState) {
		localStorage.setItem(`order-${this.props.params.storeId}`, 
			JSON.stringify(nextState.order))
	},
	addToOrder(key) {
		this.state.order[key] = this.state.order[key] + 1 || 1;
		this.setState({ order: this.state.order });
	},
	removeFromOrder(key) {
		delete this.state.order[key];
		this.setState({ order: this.state.order });
	},
	addFish(fish) {
		let timestamp = (new Date()).getTime();
		this.state.fishes[`fish-${timestamp}`] = fish;
		this.setState({ fishes: this.state.fishes });
	},
	removeFish(key) {
		this.state.fishes[key] = null;
		this.setState({ fishes: this.state.fishes })
	},
	loadSamples() {
		this.setState({ fishes: sampleFish });
	},
	renderFish(key) {
		return (
		  <Fish
		  	key={key}
		  	index={key}
		  	details={this.state.fishes[key]}
		  	addToOrder={this.addToOrder}/>
		)
	},
	render() {
		return (
			<div className="catch-of-the-day">
				<div className="menu">
					<Header 
						tagline="Fresh Seafood Market"/>
					<ul className="list-of-fishes">
						{Object.keys(this.state.fishes)
							.map(this.renderFish)}
					</ul>
				</div>
				<Order 
					fishes={this.state.fishes} 
					order={this.state.order} 
					removeFromOrder={this.removeFromOrder}/>
				<Inventory 
					addFish={this.addFish} 
					removeFish={this.removeFish}
					loadSamples={this.loadSamples} 
					fishes={this.state.fishes} 
					linkState={this.linkState} />
			</div>
		)
	}
});

export default App