const sequelize = require('../utils/sequelize.js');
const initModels = require('../models/init-models.js');
const dotenv = require('dotenv');
const { Op, fn } = require('sequelize'); // Sequelize 연산자 가져오기
const { raw } = require('express');

dotenv.config();

class Repository {
    constructor() {
        this.sequelize = sequelize;
        this.models = initModels(sequelize);
    }
    findAllMusinsaTrendedKeywords = async (startDateTime, endDateTime) => {
    try {
        const trendedKeywords = await this.models.musinsa_trended_keywords.findAll({
            attributes: [
                'type',
                'keyword',
                'rank',
                [this.sequelize.fn('DATE_FORMAT', this.sequelize.col('timestamp'), '%Y-%m-%d %H:%i:%s'), 'timestamp']
            ],
            where: {
                timestamp: {
                    [Op.between]: [startDateTime, endDateTime]
                }
            },
            raw: true
        });
        return trendedKeywords
    } catch (error) {
        console.error('Error fetching trended keywords:', error);
        throw error;
    }
}
    findAllMusinsaRankingForSheet = async (startDateTime, endDateTime) => {
    try {
        const musinsaRanking = await this.models.musinsa_ranking.findAll({
                attributes: [
                'itemId',
                'type',
                'rank',
                'brand',
                'name',
                'reviewCount',
                'reviewScore',
                'likeCount',
                'watchingCount',
                'purchasingCount',
                [this.sequelize.fn('DATE_FORMAT', this.sequelize.col('timestamp'), '%Y-%m-%d %H:%i:%s'), 'timestamp']
            ],
            where: {
                timestamp: {
                    [Op.between]: [startDateTime, endDateTime]
                }
            },
            raw: true
        });
        return musinsaRanking
    } catch (error) {
        console.error('Error fetching musinsa ranking:', error);
        throw error;
    }
}
    findAllMusinsaSearchListForSheet = async (startDate, endDate) => {
        try {
    const results = await this.sequelize.query(`
      SELECT
          ranked.itemId,
          ranked.keyword,
          recent.reviewCount,
          recent.reviewScore,
          recent.likeCount,
          ranked.rankedCount,
          ranked.topRank,
          ranked.bottomRank,
          ranked.dt
      FROM
          (
              SELECT
                  itemId,
                  keyword,
                  DATE(timestamp) AS dt,
                  COUNT(*) AS rankedCount,
                  MIN(\`index\`) AS topRank,
                  MAX(\`index\`) AS bottomRank
              FROM musinsa_category_search_results
              GROUP BY itemId, keyword, dt
          ) AS ranked
      JOIN
          (
              SELECT
                  t1.itemId,
                  t1.keyword,
                  DATE(t1.timestamp) AS dt,
                  t1.reviewCount,
                  t1.reviewScore,
                  t1.likeCount,
                  t1.timestamp
              FROM musinsa_category_search_results t1
              INNER JOIN
                  (
                      SELECT itemId, keyword, DATE(timestamp) AS dt, MAX(timestamp) AS maxTimestamp
                      FROM musinsa_category_search_results
                      GROUP BY itemId, keyword, dt
                  ) t2
              ON t1.itemId = t2.itemId
                 AND t1.keyword = t2.keyword
                 AND DATE(t1.timestamp) = t2.dt
                 AND t1.timestamp = t2.maxTimestamp
          ) AS recent
      ON ranked.itemId = recent.itemId
         AND ranked.keyword = recent.keyword
         AND ranked.dt = recent.dt
      WHERE ranked.dt = DATE(:startDate)
      ORDER BY ranked.dt, ranked.keyword
    `, {
      replacements: {
        startDate: startDate,
        endDate: endDate
      },
      type: this.sequelize.QueryTypes.SELECT
    });

    return results;
  } catch (error) {
    console.error('Query execution error:', error);
    throw error;
  }
}

findOneProductToAddCategory = async () => {
    try {
        const product = await this.models.musinsa_ranked_items.findOne({
            attributes: ['itemId'],
            where: { categoryCode: null },
            raw: true
        }
    );
        console.log('Product to add category:', product);
        return product;
    } catch (error) {
        console.error('Error fetching product:', error);
        throw error;
    }
}
// updateMenuToBrandedTrendedArticles = async (articleId, menu) => {
//     try {
//         const result = await this.models.branded_trended_articles.update(
//             { menu: menu },
//             { where: { articleId: articleId } }
//         )}catch (error) {
//         throw error;
//     }
// }

upsertBrandedDiveinArticleComment = async (commentObject) => {
    try {
        const result = await this.models.branded_divein_article_comments.upsert(
            commentObject
        );
        return result;
    } catch (error) {
        console.error('Error creating branded divein article comment:', error);
        throw error;
    }
}

findAllBrandedTrendedArticles = async (startDateTime, endDateTime) => {
    try {
        const articles = await this.models.branded_trended_articles.findAll({
            attributes: [
                'articleId',
                'articleIndex',
                'title',
                'commentCount',
                'viewCount',
                [this.sequelize.fn('DATE_FORMAT', this.sequelize.col('timestamp'), '%Y-%m-%d %H:%i:%s'), 'timestamp'],
                'writer',
                'menu'
            ],
            where: {
                timestamp: {
                    [Op.between]: [startDateTime, endDateTime]
                }
            },
            raw: true
        });
        return articles;
    } catch (error) {
        console.error('Error fetching branded trended articles:', error);
        throw error;
    }
}
findAllBrandedDiveinArticles = async (startDateTime, endDateTime) => {
    startDateTime = startDateTime ? startDateTime : "2025-01-01 00:00:00";
    endDateTime = endDateTime ? endDateTime : "2999-12-31 23:59:59";
    try {
        const articles = await this.models.branded_divein_articles.findAll({
            attributes: [
                'articleId',
                'title',
                'commentCount',
                'viewCount',
                [this.sequelize.fn('DATE_FORMAT', this.sequelize.col('timestamp'), '%Y-%m-%d %H:%i:%s'), 'timestamp'],
                'menu'
            ],
            where: {
                timestamp: {
                    [Op.between]: [startDateTime, endDateTime]
                }
            },
            raw: true
        });
        return articles;
    } catch (error) {
        console.error('Error fetching branded divein articles:', error);
        throw error;
    }
}
findAllMusinsaWeeklyKeywords = async (dateOfMonday) => {
    try {
        const keywords = await this.models.musinsa_weekly_keywords.findAll({
            where: {
                date: dateOfMonday
            },
            raw: true
        });
        return keywords;
    } catch (error) {
        console.error('Error fetching musinsa weekly keywords:', error);
        throw error;
    }
}
}

module.exports = Repository;