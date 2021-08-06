#! /usr/bin/env node


// Get arguments passed on command line
var userArgs = process.argv.slice(2);
/*
if (!userArgs[0].startsWith('mongodb')) {
    console.log('ERROR: You need to specify a valid mongodb URL as the first argument');
    return
}
*/
var async = require('async')
var Product = require('./models/product')
var Company = require('./models/company')
var Category = require('./models/category')


var mongoose = require('mongoose');
var mongoDB = userArgs[0];
mongoose.connect(mongoDB, {useNewUrlParser: true, useUnifiedTopology: true});
mongoose.Promise = global.Promise;
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

var products = []
var companies = []
var categories = []

function productCreate(name, description, category, price, stock, supplier, cb) {
  productdetail = {name:name , descriptiom: description, category: category, price: price, stock: stock, supplier: supplier }
  
  var product = new Product(productdetail);
       
  product.save(function (err) {
    if (err) {
      cb(err, null)
      return
    }
    console.log('New Product: ' + product);
    products.push(product)
    cb(null, product)
  }  );
}

function categoryCreate(name, cb) {
  var category = new Category({ name: name });
       
  category.save(function (err) {
    if (err) {
      cb(err, null);
      return;
    }
    console.log('New Category: ' + category);
    categories.push(category)
    cb(null, category);
  }   );
}

function companyCreate(name, cb) {
  var company = new Company({ name: name});

  company.save(function (err) {
    if(err) {
      cb(err, null);
      return;
    }
    console.log('New Company:', company);
    companies.push(company)
    cb(null, company);
  });
}


function createCompanies(cb) {
  async.series([
      function(callback) {
        companyCreate("Celestron", callback);
      },
      function(callback) {
        companyCreate("Orion", callback);
      },
      function(callback) {
        companyCreate("Sky-Watcher", callback);
      },
      function(callback) {
        categoryCreate("Schmit-Cassgrain", callback);
      },
      function(callback) {
        categoryCreate("Newtonian", callback);
      },
      function(callback) {
        categoryCreate("Refractor", callback);
      }
      ],
      // optional callback
      cb);
}


function createProducts(cb) {
    async.parallel([
        function(callback) {
         productCreate('CGX-L 1100 ROWE-ACKERMANN SCHMIDT ASTROGRAPH (RASA) EQUATORIAL TELESCOPE', '11” f/2.2 Rowe-Ackermann Schmidt Astrograph (RASA) V2 uses rare-earth glass for images free of false color, coma, and field curvature Heavy duty CGX-L computerized equatorial mount with 75-lb payload capacity', categories[0], 1000, 10, companies[0], callback);
        },
        function(callback) {
         productCreate('POWERSEEKER 114EQ TELESCOPE', 'Manual German equatorial mount with setting circles to locate and track sky objects', categories[0], 200, 10, companies[0], callback);
        },
        function(callback) {
         productCreate('LIMITED EDITION NEXSTAR EVOLUTION 8 HD TELESCOPE WITH STARSENSE 60TH ANNIVERSARY EDITION', '60th ANNIVERSARY LIMITED EDITION - Only 600 units will be produced, each with a unique serial number and certificate of authenticity signed by Celestron pioneer Alan Hale and CEO Corey Lee', categories[0], 2000, 10, companies[0], callback);
        }
        ],
        // optional callback
        cb);
}


async.series([
    createProducts,
    createCompanies
],
// Optional callback
function(err, results) {
    if (err) {
        console.log('FINAL ERR: '+err);
    }
    else {
        console.log('done');
        
    }
    // All done, disconnect from database
    mongoose.connection.close();
});



