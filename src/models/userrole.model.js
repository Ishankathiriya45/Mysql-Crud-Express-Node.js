'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class UserRole extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.belongsTo(models.User, { foreignKey: 'userId' })
      this.belongsTo(models.Role, { foreignKey: 'roleId' })
    }
  }
  UserRole.init({
    roleId: DataTypes.INTEGER,
    userId: DataTypes.INTEGER
  }, {
    timestamps: true,
    sequelize,
    modelName: 'UserRole',
    tableName: 'userrole',
  });
  return UserRole;
};