import React, { Component } from 'react';
import { withApollo } from 'react-apollo';
import gql from 'graphql-tag';
import './GQLApp.css';

const SEARCH_PRODUCT_BY_CODE = gql`query
  search($productCode: String!) {
    product (code: $productCode) {
      name
      code
      vendor
      price
    }
  }`;


class ProductSearch extends Component {
	constructor(props) {
		super(props);

    this.state = {
      product: undefined,
      productCode: ""
    }
	}

  searchProduct = () => {
    this.props.client.query({
      query: SEARCH_PRODUCT_BY_CODE,
      variables: { productCode: this.state.productCode },
    }).then(result => {
      if(result.data.product !== null)
        this.setState({ product: result.data.product, error: "" });
      else
        this.setState({ error: "No matching result..!" });
    })
    .catch(err => {
      this.setState({ product: undefined, error: err });
    })
  }

  render() {
    return (
    <div style={{width: "300px", background: "#dcf3e4", padding: "20px"}}>
      <h4>{"Search product by its code"}</h4>
      <div style={{margin: "15px", padding: "20px"}}>
        <input type='text' onChange={(e) => this.setState({ productCode: e.target.value })} />
        <button onClick={() => this.searchProduct()}>{"Search"}</button>
      </div>
      <div>
      {
        (this.state.error) ? <h4 style={{color: 'red'}}>{this.state.error}</h4>:''
      }
      </div>
      <div>
        {
          (this.state.product) ?
            <div className="productBlock">
              <h2>{this.state.product.name}</h2>
              <p>
                Code: {this.state.product.code} <br />
                Vendor: {this.state.product.vendor} <br />
                Price: {this.state.product.price} <br />
              </p>
            </div>
          : ''
        }
      </div>
    </div>
    )
  }
}

export default withApollo(ProductSearch);
