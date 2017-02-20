import React from 'react'
import { History } from 'react-router'
import h from '../helpers'
import reactMixin from 'react-mixin'
import autobind from 'autobind-decorator'


@autobind
class StorePicker extends React.Component {

	goToStore(e) {
		e.preventDefault();
		console.log( this )
		let storeId = this.refs.storeId.value;
		this.history.pushState(null, `/store/${storeId}`);
	}

  render () {
  	console.log( this )
    return (  
		  <form className="store-selector" onSubmit={this.goToStore}>
		  	<h2>Please Enter A Store</h2>
		  	<input type="text" ref="storeId" defaultValue={h.getFunName()} />
		  	<input type="submit" required />
		  </form>
    );
  }
}

reactMixin.onClass(StorePicker, History);

export default StorePicker


// const StorePicker = React.createClass({
// 	mixins: [History],
// 	goToStore(e) {
// 		e.preventDefault();
// 		let storeId = this.refs.storeId.value;
// 		this.history.pushState(null, `/store/${storeId}`);
// 	},
// 	render() {
// 		return (
// 		  <form className="store-selector" onSubmit={this.goToStore}>
// 		  	<h2>Please Enter A Store</h2>
// 		  	<input type="text" ref="storeId" defaultValue={h.getFunName()} />
// 		  	<input type="submit" required />
// 		  </form>
// 		)
// 	}
// });

// export default StorePicker
