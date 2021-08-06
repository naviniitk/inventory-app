var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var ProductSchema = new Schema(
  {
    name: {type: String, required: true},
    description: {type: String, required: true},
    category: {type: Schema.ObjectId, required: true},
    price: {type: Number, required: true},
    stock: {type: Number},
    supplier: {type: Schema.ObjectId, required: true}
  }
);

ProductSchema
.virtual('url')
.get(function() {
  return 'catalog/product/' + this._id;
});

module.exports = mongoose.model('Product', ProductSchema);