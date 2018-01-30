import React, { Component } from 'react';
import './GQLApp.css';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';

import ProductList from "./ProductList";
import ProductSearch from "./ProductSearch";

class GQLApp extends Component {
	constructor(props) {
		super(props);
	}

  render() {
    if (this.props.productsQuery && this.props.productsQuery.loading) {
      return <div>{"Loading..!"}</div>
    }

    if (this.props.productsQuery && this.props.productsQuery.error) {
      return <div>{`Error: ${this.props.productsQuery.error}`}</div>
    }

    let products = this.props.productsQuery.products;

    return (
      <div className="outerDiv">
        <h2>{"React + GraphQL example using Apollo client"}</h2>
        <div>
        	{
            (products.length > 0) ?
             products.map((p) => {
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
        {
          /*<ProductSearch />
          <ProductList />*/
        }
      </div>
    );
  }
}

const FETCH_ALL_PRODUCTS = gql`query productsQuery {
  products { name
    code
    vendor
    sku
    price
    status
    quantity
    addedOn
    addedBy }
}`;

export default graphql(FETCH_ALL_PRODUCTS, { name: 'productsQuery'})(GQLApp);
