const sequelize = require('../utils/sequelize.js');
const initModels = require('../models/init-models.js');
const dotenv = require('dotenv');
const { Op, fn } = require('sequelize'); // Sequelize 연산자 가져오기

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

    findAllMusinsaSearchResult = async (startDateTime, endDateTime) => {
        try {
            const searchResults = await this.models.musinsa_category_search_results.findAll({
                attributes: [
                    'index',
                    'brand',
                    'name',
                    'itemId',
                    'keyword',
                    'reviewCount',
                    'reviewScore',
                    'likeCount',
                    [this.sequelize.fn('DATE_FORMAT', this.sequelize.col('timestamp'), '%Y-%m-%d %H:%i:%s'), 'timestamp']
                ],
                where: {
                    timestamp: {
                        [Op.between]: [startDateTime, endDateTime]
                    }
                },
                raw: true
            });
            return searchResults
        } catch (error) {
            console.error('Error fetching search results:', error);
            throw error;
        }
    }
    findAllRisingProductsFromMusinsaCategorySearchResults = async (startDate, endDate, reviewCountAVG, reviewScoreAVG, likeCountAVG) => {
        try {
            const risingProducts = await this.models.musinsa_category_search_results.findAll({
                where: {
                    createdAt: {
                        [Op.between]: [startDate, endDate]
                    },
                    reviewCount: {
                        [Op.lte]: reviewCountAVG
                    },
                    reviewScore: {
                        [Op.lte]: reviewScoreAVG
                    },
                    likeCount: {
                        [Op.lte]: reviewCountAVGlikeCountAVG
                    }
                },
                raw: true
            });
            return risingProducts;
        } catch (error) {
            console.error('Error fetching rising products:', error);
            throw error;
        }
    }
    findAllCategorySearchResultsByDate = async (startDate, endDate) => {
        try {
            const results = await this.models.musinsa_category_search_results.findAll({
                where: {
                    timestamp: {
                        [Op.between]: [startDate, endDate]
                    }
                },
                raw: true
            });
            return results;
        } catch (error) {
            console.error('Error fetching category search results by date:', error);
            throw error;
        }
    }
    

}

module.exports = Repository;