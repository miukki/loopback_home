var async = require('async');
module.exports = function(app) {

var mongoDs = app.dataSources.mongoDs;

 //create all models
  async.parallel({
    categories: async.apply(createCategories),
    accounts: async.apply(createAccounts)
  }, function(err, results) {
    if (err) throw err;
    console.log('categories', results.categories);
    console.log('accounts', results.accounts);

    createSuppliers(results.categories, function(err, suppliers) {
      if (err) throw err;
      console.log('suppliers', suppliers);

      createItems(suppliers, function(err, items) {
        if (err) throw err;
        console.log('items', items);

      })
    })

  });

  function createAccounts(cb) {
    mongoDs.automigrate('Account', function(err) {
      if (err) return cb(err);
      var Account = app.models.Account;
      Account.create([
        {name:'anja', email: 'miukki@miukki.com', password: 'qwerty'}
      ], cb);
    });
  }

   //create reviewers
  function createCategories(cb) {
    mongoDs.automigrate('Category', function(err) {
      if (err) return cb(err);
      var Category = app.models.Category;
      Category.create([
        {
          "name": "One"
        },
        {
          "name": "Two"
        },
        {
          "name": "Three"
        },
                {
          "name": "Three!!!"
        }


      ], cb);
    });
  }
  //create coffee shops
  function createSuppliers(categories, cb) {
    mongoDs.automigrate('Supplier', function(err) {
      if (err) return cb(err);
      var Supplier = app.models.Supplier;
      Supplier.create([
        {
          "title": "Supplier1",
          "categoryId": categories[0].id
        },

        {
          "title": "Supplier2_",
          "categoryId": categories[0].id
        },
        {
          "title": "Supplier3_",
          "categoryId": categories[1].id
        },
        {
          "title": "Supplier4_",
          "categoryId": categories[1].id
        },
        {
          "title": "Supplier5_",
          "categoryId": categories[2].id
        },
        {
          "title": "Supplier5_",
          "categoryId": categories[2].id
        }
      ], cb);
    });
  }

function createItems(suppliers, cb) {
    mongoDs.automigrate('Item', function(err) {
      if (err) return cb(err);
      var Item = app.models.Item;
      Item.create([
        {
          "name": "BC02",
          "supplierId": suppliers[0].id
        },
        {
          "name": "BC05",
          "supplierId": suppliers[1].id
        },
        {
          "name": "BC01",
          "supplierId": suppliers[0].id
        },
        {
          "name": "BC04",
          "supplierId": suppliers[2].id
        },
        {
          "name": "BC08",
          "supplierId": suppliers[1].id
        }        
      ], cb);
    });
  }


/*

  Product specification: \
  description: string, item code: uniq(text+num) REQUIREMENT, item-name:not requirement; dimensions: string, remark: string


  app.dataSources.mysqlDs.automigrate('CoffeeShop', function(err) {
    if (err) throw err;
 
    app.models.CoffeeShop.create([
      {name: 'Bel Cafe', city: 'Vancouver'},
      {name: 'Three Bees Coffee House', city: 'San Mateo'},
      {name: 'Caffe Artigiano', city: 'Vancouver'},
    ], function(err, coffeeShops) {
      if (err) throw err;
 
      console.log('Models created: \n', coffeeShops);
    });
  });

*/
};
