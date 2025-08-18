const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('musinsa_categories', {
    categoryCode: {
      type: DataTypes.STRING(50),
      allowNull: false,
      primaryKey: true
    },
    categoryTitle: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    hasSubCategory: {
      type: DataTypes.BOOLEAN,
      allowNull: true
    },
    parentCategoryCode: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
  }, {
    sequelize,
    tableName: 'musinsa_categories',
    timestamps: false
  });
};
