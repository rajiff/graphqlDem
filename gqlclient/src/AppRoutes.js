import React from 'react';
import { HashRouter, Route, Switch, Link } from 'react-router-dom';
import ProductList from './components/ProductList';
import ProductSearch from './components/ProductSearch';
import GQLApp from './components/GQLApp';

export default class AppRoutes extends React.Component {
	render() {
		return (
			<HashRouter>
				<div>
					<div>
	          <span style={{margin: "10px"}}><Link to="/">Home</Link></span>
	          <span style={{margin: "10px"}}><Link to="/list">Featured Products</Link></span>
	          <span style={{margin: "10px"}}><Link to="/search">Search</Link></span>
	        </div>

					<Switch>
		        <Route exact path="/" component={GQLApp} />
		        <Route path="/list" component={ProductList} />
		        <Route path="/search" component={ProductSearch} />
		      </Switch>

		     </div>
      </HashRouter>
		)
	}
}