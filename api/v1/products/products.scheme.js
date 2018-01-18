const {
  GraphQLObjectType,
  GraphQLInputObjectType,
  GraphQLString,
  GraphQLInt,
  GraphQLList,
  GraphQLNonNull
} = require('graphql');

const ProductSpecType = new GraphQLObjectType({
  name: 'ProductSpec',
  fields: () => ({
    color: { type: GraphQLString },
    size: { type: GraphQLString },
    weight: { type: GraphQLInt }
  })
});

const ProductSpecInputType = new GraphQLInputObjectType({
  name: 'ProductSpecInput',
  fields: () => ({
    color: { type: new GraphQLNonNull(GraphQLString) },
    size: { type: new GraphQLNonNull(GraphQLString) },
    weight: { type: new GraphQLNonNull(GraphQLInt) }
  })
});


const ProductReviewType = new GraphQLObjectType({
  name: 'ProductReview',
  fields: () => ({
    rank: { type: GraphQLInt },
    reviewer: { type: GraphQLString },
    comments: { type: GraphQLString },
    reviewedOn: { type: GraphQLString }
  })
});

const ProductReviewInputType = new GraphQLInputObjectType({
  name: 'ProductReviewInput',
  fields: () => ({
    rank: { type: new GraphQLNonNull(GraphQLInt) },
    reviewer: { type: new GraphQLNonNull(GraphQLString) },
    comments: { type: GraphQLString },
  })
});


const ProductType = new GraphQLObjectType({
  name: 'Product',
  fields: () => ({
    name: { type: GraphQLString },
    code: { type: GraphQLString },
    vendor: { type: GraphQLString },
    sku: { type: GraphQLString },
    price: { type: GraphQLInt },
    status: { type: GraphQLString },
    quantity: { type: GraphQLString },
    addedOn: { type: GraphQLString },
    addedBy: { type: GraphQLString },
    spec: { type: ProductSpecType },
    reviews: { type: new GraphQLList(ProductReviewType) },
    tags: { type: new GraphQLList(GraphQLString) }
  })
});

const ProductInputType = new GraphQLInputObjectType({
  name: 'ProductInput',
  fields: () => ({
    name: { type: new GraphQLNonNull(GraphQLString) },
    code: { type: new GraphQLNonNull(GraphQLString) },
    vendor: { type: new GraphQLNonNull(GraphQLString) },
    sku: { type: new GraphQLNonNull(GraphQLString) },
    price: { type: new GraphQLNonNull(GraphQLInt) },
    status: { type: new GraphQLNonNull(GraphQLString) },
    quantity: { type: new GraphQLNonNull(GraphQLString) },
    addedBy: { type: new GraphQLNonNull(GraphQLString) },
    spec: { type: new GraphQLNonNull(ProductSpecInputType) },
    tags: { type: new GraphQLList(GraphQLString) }
  })
});

module.exports = {
  ProductType,
  ProductInputType,

  ProductReviewType,
  ProductReviewInputType,

  ProductSpecType,
  ProductSpecInputType
}