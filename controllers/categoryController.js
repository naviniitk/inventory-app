var Category = require('../models/category');

exports.category_list = function(req, res, next) {
  Category.find()
    .sort([['name', 'descending']])
    .exec(function(err, list_categories) {
      if(err) { return async.nextTick(err); }
      res.render('category_list', { title: 'Categories', category_list: list_categories });
    });  
};