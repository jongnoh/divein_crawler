const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('branded_divein_articles_tracks', {
    id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    articleId: {
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
    }
  }, {
    sequelize,
    tableName: 'branded_divein_articles_tracks',
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
