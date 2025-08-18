const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('branded_trended_articles', {
    articleId: {
      type: DataTypes.STRING(100),
      allowNull: false,
      primaryKey: true
    },
    title: {
      type: DataTypes.STRING(100),
      allowNull: true
    },
    commentCount: {
      type: DataTypes.STRING(100),
      allowNull: true
    },
    viewCount: {
      type: DataTypes.STRING(100),
      allowNull: true
    },
    timestamp: {
      type: DataTypes.DATE,
      allowNull: true
    },
    articleIndex: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    writer: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    menu: {
      type: DataTypes.STRING(50),
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'branded_trended_articles',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "articleId" },
        ]
      },
    ]
  });
};
