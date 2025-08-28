const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('musinsa_ranked_items', {
    itemId: {
      type: DataTypes.STRING(100),
      allowNull: false,
      primaryKey: true,
      comment: '상품 ID'
    },
    brand: {
      type: DataTypes.STRING(100),
      allowNull: true,
      comment: '브랜드명'
    },
    name: {
      type: DataTypes.STRING(100),
      allowNull: true,
      comment: '상품명'
    },
    categoryCode: {
      type: DataTypes.STRING(50),
      allowNull: true,
      comment: '카테고리 코드'
    },
  }, {
    sequelize,
    tableName: 'musinsa_ranked_items',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "itemId" },
        ]
      },
      {
        name: "idx_brand",
        using: "BTREE",
        fields: [
          { name: "brand" },
        ]
      },
      {
        name: "idx_categoryCode",
        using: "BTREE",
        fields: [
          { name: "categoryCode" },
        ]
      },
    ]
  });
};
