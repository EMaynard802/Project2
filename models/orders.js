module.exports = function(sequelize, DataTypes) 
{
    var Order = sequelize.define("Order", 
    {
      order_quatity:
      {
        type: DataTypes.INTEGER,
        isInt: true,
        min: 1,
        notEmpty: true,
        allowNull: false,
        unique: false
      },
      //A.hasMany(B)
      //User.hasMany(Order)
    });
    return Order;
};