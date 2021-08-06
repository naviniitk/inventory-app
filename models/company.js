var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var CompanySchema = new Schema(
  {
    name: {type: String, required: true},
  }
);

CompanySchema
.virtual('url')
.get(function() {
  return '/catalog/supplier/' + this._id;
});

module.exports = mongoose.model('Supplier', CompanySchema);