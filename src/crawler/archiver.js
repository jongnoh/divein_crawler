const sequelize = require('../utils/sequelize');
const initModels = require('../models/init-models.js');
const crawler = require('./crawler.js');
const dotenv = require('dotenv');

dotenv.config();



// 매 시각 55분에 실행
// 예: 01:55, 02:55, 03:55 등

// crawling archiver
class Archiver {
    constructor() {
        this.crawler = new crawler();
        this.sequelize = sequelize;
        this.models = initModels(sequelize);
        this.getMonthlyKeywords = require('../utils/musinsa.search.keywords');
        this.musinsaKeywords = JSON.parse(process.env.MUSINSA_KEYWORDS_AUGUST);
    }

    try3times = async (parameter, callback) => {
    try {
        let proceed = false;
        let result;
        for (let i = 0; i < 3 && !proceed; i++) {
            result = await callback(parameter);
            if (result) {
                proceed = true;
                break;
            }
        }
        if (!proceed || !result) {
            console.error('Failed to fetch keywords after multiple attempts');
        }
        return result;
    } catch (error) {
        console.error('Error occurred while fetching keywords:', error);
    }
}

    archiveNewRankingFromMusinsa = async() => {
        try {
            const rankingData = await this.crawler.getNewRankingFromMusinsa();
            console.log('크롤링 완료:', rankingData);
            if (rankingData) {
                await this.models.musinsa_ranking.bulkCreate(rankingData);
                console.log('DB 저장 완료');
            } else {
                console.error('랭킹 데이터 없음');
            }
        } catch (err) {
            console.error('cron 작업 에러:', err);
        }
}
    archiveTotalRankingFromMusinsa = async() => {
        try {
            const rankingData = await this.crawler.getTotalRankingFromMusinsa()
            console.log('크롤링 완료:', rankingData);
            if (rankingData) {
                await this.models.musinsa_ranking.bulkCreate(rankingData);
                console.log('DB 저장 완료');
            } else {
                console.error('랭킹 데이터 없음');
            }
        } catch (err) {
            console.error('cron 작업 에러:', err);
        }
}

    archiveSearchResultFromMusinsa = async() => {
        try {
            for (const keyword of this.musinsaKeywords) {
                const searchData = await this.crawler.getSearchResultFromMusinsa(keyword)
                if (searchData) {
                    await this.models.musinsa_category_search_results.bulkCreate(searchData);
                    console.log('DB 저장 완료');
                }
            }
        } catch (err) {
            console.error('cron 작업 에러:', err);
        }
    }
    archiveBrandedTrendedArticles = async() => {
        try {
            const articles = await this.crawler.getBrandedTrendedArticles();
            if (articles) {
                await this.models.branded_trended_articles.bulkCreate(articles); 
                console.log('브랜디드 인기글 DB 저장 완료');
            } else {
                console.error('브랜드 트렌드 아티클 데이터 없음');
            }
            return null
        } catch (err) {
            console.error('cron 작업 에러:', err);
        }
}
        archiveBrandedDiveinArticles = async(req, res) => {
        try {
            const articles = await this.crawler.getBrandedDiveinArticles();
            for (let article of articles) {
            await this.models.branded_divein_articles.upsert(article);
            }
            return articles
        } catch (err) {
            console.error('cron 작업 에러:', err);
        }
}
    archiveMusinsaCategories = async(req, res) => {
    try {
        const categories = await this.crawler.getMusinsaCategories();
        if (categories) {
            await this.models.musinsa_categories.bulkCreate(categories);
            console.log('카테고리 DB 저장 완료');
            return null
        } else {
            console.error('카테고리 데이터 없음');
        }
    } catch (err) {
        console.error('카테고리 작업 에러:', err);
    }
}

archiveTrendedKeywordsFromMusinsa = async(req,res) => {
    try {
        const keywordsData = await this.crawler.getTrendedKeywordsFromMusinsa();
        if (keywordsData) {
            let result1 = await this.models.musinsa_trended_keywords.bulkCreate(keywordsData.popular);
            let result2 = await this.models.musinsa_trended_keywords.bulkCreate(keywordsData.rising);
            console.log('DB 저장 완료');
            return null
        } else {
            console.error('키워드 데이터 없음');
        }
    } catch (err) {
        console.error('cron 작업 에러:', err);
    }



}

}
module.exports = Archiver;