const sequelize = require('../utils/sequelize');
const initModels = require('../models/init-models.js');
const crawler = require('./crawler.js');
const dotenv = require('dotenv');
const Repository = require('./repository.js');
const dateUtils = require('../utils/date.js');

dotenv.config();



// 매 시각 55분에 실행
// 예: 01:55, 02:55, 03:55 등

// crawling archiver
class Archiver {
    constructor() {
        this.repository = new Repository();
        this.crawler = new crawler();
        this.sequelize = sequelize;
        this.models = initModels(sequelize);
        this.dateUtils = new dateUtils();
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
            console.log('a) 검색 결과 아카이브 시작');
            const keywords = await this.repository.findAllMusinsaWeeklyKeywords(this.dateUtils.getLatestMonday())
            for (const keyword of keywords) {
                const searchData = await this.crawler.getSearchResultFromMusinsa(keyword.keyword)
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
            const tracks = await this.crawler.getBrandedDiveinArticlesTracks();
            await this.models.branded_divein_articles_tracks.bulkCreate(tracks);
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
archiveMusinsaCategoryToMusinsaRankedItems = async () => {
 try{
    const itemId = await this.repository.findOneProductToAddCategory();
    if (itemId) {
        const category = await this.crawler.getMusinsaCategoryOfProducts(itemId.itemId);
        if (category)  {
            console.log(category)
            await this.models.musinsa_ranked_items.update(
                { categoryCode: category.categoryCode },
                { where: { itemId: category.productId } }
            );
            console.log(`카테고리 ${category.categoryCode}가 아이템 ${itemId.itemId}에 추가되었습니다.`);
        } else {
            console.error('카테고리 데이터 없음');
        }
    } else {
        console.error('추가할 아이템이 없습니다.');
    }

 }catch (error) {
        console.error('카테고리 추가 작업 중 에러 발생:', error);
        throw error;
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
updateMusinsaRankedItems = async(req,res) => {
    try {
        
        
    } catch (err) {
        console.error('cron 작업 에러:', err);
    }
}
}
module.exports = Archiver;