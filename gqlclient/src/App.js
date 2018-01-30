import React, { Component } from 'react';
import './App.css';

// A simplest GraphQL client library, cannot cache, batch, paginate
import { request } from 'graphql-request';

class App extends Component {
	constructor(props) {
		super(props);

		this.state = {
			productColln: [],
			error: ""
		}

	}

	componentDidMount () {
		let query = `{ products { name, code, vendor, price } }`;
  	request('/', query)
  	.then(data => this.setState({productColln: data.products}))
  	.catch(err => this.setState({error: err}))
	}

  render() {
    return (
      <div className="outerDiv">
        <h2>{"React + GraphQL example"}</h2>
        <div>
        	{
        		(this.state.error) ? <h2 className="errorMessage">{this.state.error}</h2>:""
        	}
        	{
        		(this.state.productColln.length > 0) ?
        		 this.state.productColln.map((p) => {
        			return (
        				<div key={p.code} className="productBlock">
	        				<h2>{p.name}</h2>
	        				<p>
	        					Code: {p.code} <br />
	        					Vendor: {p.vendor} <br />
	        					Price: {p.price} <br />
	        				</p>
        				</div>
        			)
        		}) : "Loading..!"
        	}
        </div>
      </div>
    );
  }
}

export default App;
