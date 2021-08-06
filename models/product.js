var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var ProductSchema = new Schema(
  {
    name: {type: String, required: true},
    description: {type: String},
    category: {type: Schema.ObjectId},
    price: {type: Number, required: true},
    stock: {type: Number},
    supplier: {type: Schema.ObjectId}
  }
);

ProductSchema
.virtual('url')
.get(function() {
  return 'catalog/product/' + this._id;
});

module.exports = mongoose.model('Product', ProductSchema);