const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('branded_divein_article_comments', {
    commentId: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
    },
    refId: {
      type: DataTypes.INTEGER(11),
      allowNull: true
    },
    writer: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    content: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    timestamp: {
      type: DataTypes.DATE,
      allowNull: true
    },
    articleId:{
      type: DataTypes.STRING(100),
      allowNull: true,
    }
  }, {
    sequelize,
    tableName: 'branded_divein_article_comments',
    timestamps: false,
  });
};
