import React, { Component } from 'react';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';

class AddProduct extends Component {
	constructor(props) {
		super(props);
	}

  render() {
    return (
      <div style={{width: "500px", padding: "20px", border: "2px solid green"}}>
        <h2>{"Add new product "}</h2>
        <div>
        </div>
      </div>
    );
  }
}

const ADD_NEW_PRODUCT = gql``;

export default graphql(ADD_NEW_PRODUCT, { name: 'addNewProduct'})((props) => {
  <AddProduct data={}/>
});
