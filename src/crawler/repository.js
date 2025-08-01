const sequelize = require('../utils/sequelize.js');
const initModels = require('../models/init-models.js');
const dotenv = require('dotenv');
const { Op } = require('sequelize'); // Sequelize 연산자 가져오기

dotenv.config();

class Repository {
    constructor() {
        this.sequelize = sequelize;
        this.models = initModels(sequelize);
    }

    findAllMusinsaSearchResult = async () => {
        try {
            const searchResults = await this.models.musinsa_category_search_results.findAll(
                { raw: true }
            )
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