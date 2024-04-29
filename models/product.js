'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Product extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Product.hasMany(models.OrdersProduct);
      Product.hasMany(models.ProductsCategory);
    }
  }
  Product.init({
    name: DataTypes.STRING,
    description: DataTypes.STRING,
    size: DataTypes.STRING,
    price: DataTypes.FLOAT,
    stock: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Product',
  });
  return Product;
};