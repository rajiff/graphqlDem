const ProductModel = require('./products.entity');

const addNewProduct = function(newProduct, done) {
  let product = new ProductModel();
  product.name = newProduct.name;
  product.code = newProduct.code;
  product.vendor = newProduct.vendor;
  product.sku = newProduct.sku;
  product.price = newProduct.price;
  product.status = newProduct.status;
  product.quantity = newProduct.quantity;
  product.addedBy = newProduct.addedBy;
  product.spec = newProduct.spec;

  product.save(function(err, savedDoc) {
    if (err) {
      console.error("Error in adding new product, ERROR::", err);
      done(err);
    } else {
      done(null, savedDoc);
      return
    }
  });
}

const getProducts = function(done) {
  let query = {};
  let fieldOptions = null;
  let page = 1;
  let limit = 10;

  ProductModel
    .find(query)
    .sort({ "addedOn": -1 })
    .select(fieldOptions)
    .skip((page > 0) ? limit * (page - 1) : 0)
    .limit(limit)
    .exec((err, colln) => {
      if (err) {
        console.error('Error in finding products, ERROR::', err, ' queries for ', query);
        done(err);
        return;
      }
      done(null, colln);
    });
}

const findProductByCode = function(productCode, done) {
  let query = {code: productCode};
  let fieldOptions = null;

  ProductModel
    .findOne(query)
    .exec((err, product) => {
      if (err) {
        console.error('Error in finding products of specified code, ERROR::', err, ' queries for ', query);
        done(err);
        return;
      }
      done(null, product);
    });
}

const submitNewReview = function(productCode, reviewObj, done) {
  let query = { code: productCode };
  let modification = {
    $push: {
      reviews: {
        rank: reviewObj.rank,
        reviewer: reviewObj.reviewer,
        comments: reviewObj.comments
      }
    }
  };
  let options = {
    new: true, //return the updated document
    upsert: false, //don't insert if not found
  };

  ProductModel.findOneAndUpdate(query, modification, options,
    function(err, updatedDoc) {
      if (err) {
        console.error("Error in submitting review, ERROR::", err);
        done(err)
        return;
      }
      return done(null, updatedDoc);
    });
}

module.exports = {
  addNewProduct,
  getProducts,
  submitNewReview,
  findProductByCode
}