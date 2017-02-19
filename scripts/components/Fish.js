import React from 'react'

const Fish = React.createClass({
	propTypes: {
		addToOrder: React.PropTypes.func,
	},
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

export default Fish