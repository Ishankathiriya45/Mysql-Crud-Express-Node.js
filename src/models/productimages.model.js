'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class ProductImages extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.belongsTo(models.Product, {foreignKey:'product_id'})
    }
  }
  ProductImages.init({
    product_id: DataTypes.INTEGER,
    productsUrl: DataTypes.STRING
  }, {
    timestamps: true,
    sequelize,
    modelName: 'ProductImages',
    tableName: 'productimages',
  });
  return ProductImages;
};