// Requiring our models and passport as we've configured it
var db = require("../models");
var passport = require("../config/passport");
var Shop = require('nodejs-cart-lna');

module.exports = function(app) {
  // Using the passport.authenticate middleware with our local strategy.
  // If the user has valid login credentials, send them to the members page.
  // Otherwise the user will be sent an error
  app.post("/api/login", passport.authenticate("local"), function(req, res) {
    res.json(req.user);

  });

  // Route for signing up a user. The user's password is automatically hashed and stored securely thanks to
  // how we configured our Sequelize User Model. If the user is created successfully, proceed to log the user in,
  // otherwise send back an error
  app.post("/api/signup", function(req, res) {
    db.User.create({
      email: req.body.email,
      password: req.body.password
    })
      .then(function() {
        res.redirect(307, "/api/login");
      })
      .catch(function(err) {
        res.status(401).json(err);
      });
  });

  // Route for logging user out
  app.get("/logout", function(req, res) {
    req.logout();
    res.redirect("/");
  });
//Setting up category route, runs on page load
  app.get("/api/category", function(req, res)
  {   
      db.Category.findAll({}).then(function(dbCategory)
      {
        res.json(dbCategory);
      });
  });

  app.post("/api/cart", function(req, res) {
    console.log("Entering cart creation: ")// + req.body.item_name);
    db.Cart.create({
      item_name: req.body.item_name,
      item_quantity: req.body.item_quantity
      //user_id: db.User.user_id 
    }).then(function(dbCart)
     {
      db.Cart.findOne(
         {
           where:
           {
              item_quantity: req.body.item_quantity
           }
         })
        res.json(req.body.item_quantity);
     });
  });
// route add product to carts ssession
// app.get('/api/category/:id',function(req,res)
// {
//   var cartList = new Shop(req);
//   console.log("this is a cart list at declaration: " + cartList)
//   db.Category.findOne({where:{id:req.params.id}},function(err,data)
//   {
//     cartList.add(data);
//     console.log("Data from query: " + data);
//     return res.json(data) //redirect('/show-cart'); // chuyển hướng về trang bạn muốn
//   });
//   //return res.json(cartList)
// });
  // Route for getting some data about our user to be used client side
  app.get("/api/user_data", function(req, res) {
    console.log("inside app.get")
    if (!req.user) {
      // The user is not logged in, send back an empty object
      res.json({});
    } else {
      // Otherwise send back the user's email and id
      // Sending back a password, even a hashed password, isn't a good idea
      res.json({
        email: req.user.email,
        id: req.user.id
      });
    }
  });

    // GET route for getting all of the items created.
  app.get("/api/items", function (req, res){
      var query = {};
    if (req.query.user_id) {
      query.UserId = req.query.user_id;
    }
    db.Cart.findAll({
      where: query,
      include: [db.User]
    }).then(function(dbCartItem) {
      res.json(dbCartItem);
    });
  });
 // 
};
