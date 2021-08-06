var Product = require('../models/product');
var Category = require('../models/category');
var Company = require('../models/company');

var async = require('async');

exports.index = function(req, res) {
  async.parallel({
    product_count: function(callback) {
      Product.countDocuments({}, callback);
    },
    category_count: function(callback) {
      Category.countDocuments({}, callback);
    },
    seller_count: function(callback) {
      Company.countDocuments({}, callback)
    }
  }, function(err, results) {
    res.render('index', {title: 'Products Available', error: err, data: results});
  })
}

exports.product_list = function(req, res, next) {
  Product.find()
    .sort([['name', 'descending']])
    .exec(function(err, list_products) {
      if(err) { return async.nextTick(err); }
      res.render('product_list', { title: 'Products Available', product_list: list_products });
    });
};

exports.product_details = function(req, res, next) {
  async.parallel({
    product: function(callback){
      Product.findById(req.params.id)
        .populate('author')
        .populate('genre')
        .exec(callback);
    }
  }, function(err, results) {
    if(err) { return next(err);}
    if(results.product == null){
      var err = new Error('Product Not Found');
      err.status = 404;
      return next(err);
    }
    res.render('product_detail', { title: results.product.title, product: results.product });
  });
};