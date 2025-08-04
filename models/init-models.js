var DataTypes = require("sequelize").DataTypes;
var _branded_divein_articles = require("./branded_divein_articles");
var _branded_trended_articles = require("./branded_trended_articles");
var _musinsa_category_search_results = require("./musinsa_category_search_results");
var _musinsa_ranking = require("./musinsa_ranking");
var _musinsa_trended_keywords = require("./musinsa_trended_keywords");
var _users = require("./users");

function initModels(sequelize) {
  var branded_divein_articles = _branded_divein_articles(sequelize, DataTypes);
  var branded_trended_articles = _branded_trended_articles(sequelize, DataTypes);
  var musinsa_category_search_results = _musinsa_category_search_results(sequelize, DataTypes);
  var musinsa_ranking = _musinsa_ranking(sequelize, DataTypes);
  var musinsa_trended_keywords = _musinsa_trended_keywords(sequelize, DataTypes);
  var users = _users(sequelize, DataTypes);


  return {
    branded_divein_articles,
    branded_trended_articles,
    musinsa_category_search_results,
    musinsa_ranking,
    musinsa_trended_keywords,
    users,
  };
}
module.exports = initModels;
module.exports.initModels = initModels;
module.exports.default = initModels;
