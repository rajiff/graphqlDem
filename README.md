## Query in Graphiql
{
    products
}

## Mutation in Graphiql
mutation ($in: ProductInput!) {
  addNewProduct(product: $in) {
    name
    code
    vendor
    sku
    price
    status
    quantity
    addedOn
    addedBy
  }
}

curl http://localhost:3000 -H 'content-type: application/json' -d '{"query":"{ products { name vendor } }"}'
curl http://localhost:3000 -H 'content-type: application/json' -d '{"query":"{ product (code: \"iphone8\") { name vendor price quantity } }"}'
