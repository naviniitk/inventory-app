var express = require('express');
var router = express.Router();

var product_controller = require('../controllers/productController');
var category_controller = require('../controllers/categoryController');
var company_controller = require('../controllers/companyController');

router.get('/', product_controller.index);

router.get('/products', product_controller.product_list);

router.get('/products/:id', product_controller.product_details);

router.get('/categories', category_controller.category_list);

router.get('/suppliers', company_controller.company_list);

module.exports = router;