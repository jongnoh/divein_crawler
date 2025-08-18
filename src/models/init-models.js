var DataTypes = require("sequelize").DataTypes;
var _branded_trended_articles = require("./branded_trended_articles");
var _musinsa_category_search_results = require("./musinsa_category_search_results");
var _musinsa_ranking = require("./musinsa_ranking");
var _musinsa_trended_keywords = require("./musinsa_trended_keywords");
var _branded_divein_articles = require("./branded_divein_articles");``
var _musinsa_categories = require("./musinsa_categories");

function initModels(sequelize) {
  var branded_trended_articles = _branded_trended_articles(sequelize, DataTypes);
  var musinsa_category_search_results = _musinsa_category_search_results(sequelize, DataTypes);
  var musinsa_ranking = _musinsa_ranking(sequelize, DataTypes);
  var musinsa_trended_keywords = _musinsa_trended_keywords(sequelize, DataTypes);
  var musinsa_categories = _musinsa_categories(sequelize, DataTypes);
  var branded_divein_articles = _branded_divein_articles(sequelize, DataTypes);

  return {
    branded_trended_articles,
    musinsa_category_search_results,
    musinsa_ranking,
    musinsa_trended_keywords,
    musinsa_categories,
    branded_divein_articles,
  };
}
module.exports = initModels;
module.exports.initModels = initModels;
module.exports.default = initModels;
