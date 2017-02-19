import React from 'react'
import h from '../helpers'
import {History} from 'react-router'

export default StorePicker = React.createClass({
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