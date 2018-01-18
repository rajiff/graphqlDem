const mongoose = require('mongoose');

const SALE_STATUS = ['On-Stand', 'Not-Available', 'Pre-Order', 'Discontinued'];

let schema = new mongoose.Schema({
  name: { type: String, required: true },
  code: { type: String, unique: true, required: true },
  // REFERENCE
  vendor: { type: String, require: true },
  sku: { type: String, required: true },
  price: { type: Number, default: 0, min: 1, max: 99999 },
  status: { type: String, enum: SALE_STATUS, default: 'Not-Available', required: true },
  quantity: { type: String, required: true, default: true },
  addedOn: { type: Date, default: Date.now },
  // REFERENCE
  addedBy: { type: String, required: true },
  // EMBEDDED
  spec: {
    color: { type: String },
    size: { type: String },
    weight: { type: Number, default: 0, min: 0, max: 999 },
  },
  // EMBEDDED
  reviews: [{
    rank: { type: Number, required: true },
    reviewer: { type: String, required: true },
    comments: { type: String },
    reviewedOn: { type: Date, default: Date.now }
  }],
  // EMBEDDED
  tags: []
}, { collection: 'products' });

// Virtual column, will not be persisted in dB
schema.virtual('canAddToCart')
  .get(function() {
    return (this.status === 'On-Stand');
  });

schema.statics = {
  // methods which operate at collection
  // Caution: cannot use arrow functions
  // Eg: findByVendor
}

schema.methods = {
  // method which operate on the instance or at document
  // Caution: cannot use arrow functions
  // Eg: getDiscountedPrice
}

schema.path('quantity').validate = function(quantity) {
  // Return true or false
  // Quantity cannot be in negative
  return !(quantity < 0)
}

// Validation hooks
schema.pre('save', function() {
  if(this.spec.weight <= 0) {
    next(new Error('weight is invalid'));
    return;
  }
});

// Composite Unique key
schema.index({
  code: 1,
  sku: 1,
  vendor: 1,
}, {
  unique: true
});

//Creating the model, model is the runtime object instance of the schema
module.exports = mongoose.model("products", schema);




