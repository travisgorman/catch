import React from 'react'
import AddFishForm from './AddFishForm'

const Inventory = React.createClass({
	propTypes: {
		addFish: React.PropTypes.func,
		removeFish: React.PropTypes.func,
		loadSamples: React.PropTypes.func,
		fishes: React.PropTypes.object,
		linkState: React.PropTypes.func,
	},
	renderInventory(key) {
		var linkState = this.props.linkState;
		return (  
			<div className="fish-edit" key={key}>
				<input type="text" valueLink={linkState('fishes.'+key+'.name')}/>
				<input type="text" valueLink={linkState('fishes.'+key+'.price')}/>
				<select valueLink={linkState('fishes.'+key+'.status')}>
					<option defaultValue="available">Fresh!</option>
					<option defaultValue="unavailable">Sold Out!</option>
				</select>
				<textarea type="text" valueLink={linkState('fishes.'+key+'.desc')}></textarea>
				<input type="text" valueLink={linkState('fishes.'+key+'.image')}/>
				<button onClick={this.props.removeFish.bind(null, key)}>Remove Fish</button>
			</div>
		)
	},
	render() {
		return (
			<div>
			  <h2>Inventory</h2>
			  {Object.keys(this.props.fishes).map(this.renderInventory)}
			  <AddFishForm {...this.props}/>
			  <button onClick={this.props.loadSamples}>Load Sample Fishes</button>
			</div>
		)
	}
});

export default Inventory