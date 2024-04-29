'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class ProductsCategory extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  ProductsCategory.init({
    ProductsId: DataTypes.INTEGER,
    CategoriesId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'ProductsCategory',
  });
  return ProductsCategory;
};