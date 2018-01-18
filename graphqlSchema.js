const {
  ProductType,
  ProductInputType,
  ProductReviewType,
  ProductReviewInputType,
  ProductSpecType,
  ProductSpecInputType } = require('./api/v1/products/products.scheme');
const productCtrl = require('./api/v1/products/products.controller');

const {
  graphql,
  GraphQLSchema,
  GraphQLObjectType,
  GraphQLString,
  GraphQLInt,
  GraphQLList,
  GraphQLNonNull
} = require('graphql');

const schema = new GraphQLSchema({
  query: new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
      products: {
        type: new GraphQLList(ProductType),
        args: {},
        resolve() {
          return new Promise((resolve, reject) => {
            productCtrl.getProducts((err, result) => {
              if (err) {
                reject(err);
              }
              resolve(result);
            })
          })
        }
      },
      product: {
        type: ProductType,
        args: {
          code: { type: GraphQLString }
        },
        resolve(parentValue, args) {
          return new Promise((resolve, reject) => {
            productCtrl.findProductByCode(args.code, (err, result) => {
              if (err) {
                reject(err);
              }
              resolve(result);
            })
          })
        }
      }
    }
  }),
  mutation: new GraphQLObjectType({
    name: 'Mutation',
    fields: {
      addNewProduct: {
        type: ProductType,
        args: {
          product: { type: new GraphQLNonNull(ProductInputType) }
        },
        resolve(parentValue, args) {
          return new Promise((resolve, reject) => {
            productCtrl.addNewProduct(args.product, (err, result) => {
              if (err) {
                reject(err);
              }
              resolve(result);
            })
          })
        }
      },
      submitReview: {
        type: ProductReviewType,
        args: {
          code: { type: new GraphQLNonNull(GraphQLString) },
          review: { type: new GraphQLNonNull(ProductReviewInputType) }
        },
        resolve(parentValue, args) {
          return new Promise((resolve, reject) => {
            productCtrl.submitReview(args.code, args.review, (err, result) => {
              if (err) {
                reject(err);
              }
              resolve(result);
            })
          })
        }
      }
    }
  })
})

module.exports = schema;