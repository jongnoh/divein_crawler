const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('musinsa_trended_keywords', {
    keyword: {
      type: DataTypes.STRING(100),
      allowNull: true
    },
    rank: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    timestamp: {
      type: DataTypes.DATE,
      allowNull: true
    },
    type: {
      type: DataTypes.STRING(100),
      allowNull: true
    },
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    }
  }, {
    sequelize,
    tableName: 'musinsa_trended_keywords',
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
