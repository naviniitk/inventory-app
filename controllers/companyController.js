var Company = require('../models/company');

exports.company_list = function(req, res, next) {
  Company.find()
    .sort([['name', 'ascending']])
    .exec(function(err, list_companies){
      if(err) {return nex(err);}
      res.render('company_list', { title: 'Company List', company_list: list_companies});
    });
};