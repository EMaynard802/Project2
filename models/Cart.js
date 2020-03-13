// Creating our Cart model
module.exports = function(sequelize, DataTypes) {
    var Cart = sequelize.define("Cart", {
      // item name cannot be null
      item_name: 
      {
        type: DataTypes.STRING,
        allowNull: false,
        debug: true
      },
      // The quantity cannot be null or less than one
      item_quantity: 
      {
        type: DataTypes.INTEGER,
        allowNull: false,
        min: 1
      },
      item_price: 
      {
        type: DataTypes.FLOAT,
        allowNull: false,
        min: 1
      }
      
    });
    Cart.associate = function(models) {
      // We're saying that an Order should belong to a User
      // An Order can't be created without an User due to the foreign key constraint
      Cart.belongsTo(models.User, {
          foreignKey: {
          //name: "UserID",
          defaultValue: 1
          //allowNull: false
        }
      });
    };
    // Creating a custom method for our User model. This will check if an unhashed password entered by the user can be compared to the hashed password stored in our database
    // User.prototype.validPassword = function(password) {
    //   return bcrypt.compareSync(password, this.password);
    // };
    // // Hooks are automatic methods that run during various phases of the User Model lifecycle
    // // In this case, before a User is created, we will automatically hash their password
    // User.addHook("beforeCreate", function(user) {
    //   user.password = bcrypt.hashSync(user.password, bcrypt.genSaltSync(10), null);
    // });
    return Cart;
  };