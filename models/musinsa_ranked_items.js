const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('musinsa_ranked_items', {
    itemId: {
      type: DataTypes.STRING(100),
      allowNull: true
    },
    brand: {
      type: DataTypes.STRING(100),
      allowNull: true
    },
    name: {
      type: DataTypes.STRING(100),
      allowNull: true
    },
    goodsCreateDate: {
      type: DataTypes.DATE,
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'musinsa_ranked_items',
    timestamps: false
  });
};
