const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('musinsa_ranking', {
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    rank: {
      type: DataTypes.INTEGER,
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
    itemId: {
      type: DataTypes.STRING(100),
      allowNull: true
    },
    type: {
      type: DataTypes.STRING(100),
      allowNull: true
    },
    timestamp: {
      type: DataTypes.DATE,
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'musinsa_ranking',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "id" },
        ]
      },
    ]
  });
};
