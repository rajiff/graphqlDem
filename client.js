const { request } = require('graphql-request')

function query() {
  // let query = `{ products { name, vendor, price } }`;
  let query = `{ product(code: "nokia") { name, vendor, quantity, price } } `;

  request('http://localhost:3000', query).then(data => console.log(data));
}

function addNewProduct() {
  let varsToBind = {
    "newProduct": {
      "name": "Oppo",
      "code": "Oppo",
      "vendor": "Oppo",
      "sku": "oppo_rose",
      "price": 150,
      "status": "On-Stand",
      "quantity": "35",
      "addedBy": "basav",
      "spec": {
        "color": "black",
        "size": "6",
        "weight": 200
      },
      "tags": ["smart phone"]
    }
  }

  const mutation = `mutation add($newProduct: ProductInput!) {
		addNewProduct(product: $newProduct) {
			name
	    code
	    vendor
	    sku
	    price
	    status
	    quantity
	    addedBy
	    spec {
	      color
	      size
	      weight
	    }
	    tags
		}
	}`;

  request('http://localhost:3000', mutation, varsToBind).then(data => console.log(data));
}

function submitReview() {
  let varsToBind = {
    "code": "iphone",
    "newReview": {
      "rank": 2,
      "reviewer": "Sidda",
      "comments": "Bad product"
    }
  };

  let mutation = `mutation review($code:String!, $newReview: ProductReviewInput!) {
	  submitReview(code:$code, review: $newReview) {
	    rank,
	    reviewer,
	    comments
	  }
	}`;

  request('http://localhost:3000', mutation, varsToBind).then(data => console.log(data));
}
query()
// addNewProduct();
// submitReview();