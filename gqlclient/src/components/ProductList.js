import React, { Component } from 'react';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';

class ProductList extends Component {
	constructor(props) {
		super(props);
	}

  render() {
    if (this.props.productListQuery && this.props.productListQuery.loading) {
      return <div>{"Loading..!"}</div>
    }

    if (this.props.productListQuery && this.props.productListQuery.error) {
      return <div>{`Error: ${this.props.productListQuery.error}`}</div>
    }

    let products = this.props.productListQuery.products;

    return (
      <div style={{width: "500px", padding: "20px", border: "2px solid red"}}>
        <h2>{"Featured "}</h2>
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
      </div>
    );
  }
}

const FETCH_ALL_PRODUCTS = gql`query productListQuery {
  products { name
    code
    vendor
    price
  }
}`;

export default graphql(FETCH_ALL_PRODUCTS, { name: 'productListQuery'})(ProductList);
