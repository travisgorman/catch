const App = React.createClass({
	getInitialState(){
		return {
			fishes: {},
			order: {},
		}
	},
	addToOrder(key){
		this.state.order[key] = this.state.order[key] + 1 || 1;
		this.setState({
			order: this.state.order
		});
	},
	addFish(fish){
		let timestamp = (new Date()).getTime();
		this.state.fishes['fish-'+timestamp] = fish;
		this.setState({fishes: this.state.fishes});
	},
	loadSamples(){
		this.setState({
			fishes: require('./sample-fishes')
		});
	},
	renderFish(key){
		return (  
		  <Fish 
		  key={key} 
		  index={key} 
		  details={this.state.fishes[key]}
		  addToOrder={this.addToOrder}/>
		)
	},
	render(){ 
		return (  
		  
		)
	}
});

const Fish = React.createClass({
	onButtonClick(){
		console.log( "Going to add the fish: ", this.props.index);
		let key = this.props.index;
		this.props.addToOrder(key);
	},
	render(){
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