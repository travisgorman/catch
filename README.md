#Catch

Menu / Inventory App with React

___

##Build
* Gulp
	- Browserify for module bundling
	- BrowserSync for dev server (live reload!)
	- Babel for transpiling ES6
	- Autoprefixeer for vendor stuff
	- stylus for CSS
	- watchify for watching for changes
* [Firebase for ?? server stuff ??](https://firebase.google.com/)
*  React for view / DOM stuff
	-  react-catalyst
	-  reactDOM
	-  react-mixin
	-  react-router

	-react-catalyst

___

### `componentDidMount`
* Syncs state with the firebase backend
* Gets the order (by url) from localstorage

### `componentWillUpdate( nextProps, nextState)`
* Sets (stringified) `nextState.order` to localStorage

### `addToOrder(key)`
* Sets the order of an item in state to either 1 or +1
* updates state with `setState`

### `removeFromOrder(key)`
* deletes the particular item from the order
* updates the state with `setState`

### addFish(fish)

* takes a fish and assigns it a timestamp
* sets it to `fishes` in state

### removeFish(key)
* takes a fish and assigns it a value of `null`
* updates state with `setState`


### loadSamples
* sets `fishes` in state to `sampleFish` - an object of fish objects

### renderFish(key)
* returns a Fish component - giving it a key, index, all the details of the fish object, and the `addToOrder` method

