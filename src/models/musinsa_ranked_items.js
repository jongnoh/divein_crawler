const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('musinsa_ranked_items', {
    itemId: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true
    },
    brand: {
      type: DataTypes.STRING(100),
      allowNull: true
    },
    name: {
      type: DataTypes.STRING(100),
      allowNull: true
    },
    categoryCode: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    image: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    goodsCreateDate: {
      type: DataTypes.DATE,
      allowNull: true
    },
  }, {
    sequelize,
    tableName: 'musinsa_ranked_items',
    timestamps: false,
  });
};
