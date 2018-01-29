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