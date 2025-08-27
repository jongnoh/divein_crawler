const Repository = require('./repository.js');
const DateUtils = require('../utils/date.js');

class Service {
    constructor() {
        this.repository = new Repository();
        this.dateUtils = new DateUtils();
    }


    getMusinsaTrendedKeywords = async (startDateTime,endDateTime) => {
    const result = await this.repository.findAllMusinsaTrendedKeywords(startDateTime,endDateTime);
    return result;
}
    getMusinsaRankingForSheet = async (startDateTime,endDateTime) => {
    const result = await this.repository.findAllMusinsaRankingForSheet(startDateTime,endDateTime);
    return result;
}
    getMusinsaSearchResultForSheet = async (startDate, endDate) => {
    const data = await this.repository.findAllMusinsaSearchListForSheet(startDate, endDate);
    return data;
}
    getBrandedTrendedArticles = async (startDateTime, endDateTime) => {
        try {
            const result = await this.repository.findAllBrandedTrendedArticles(startDateTime, endDateTime);
            return result;
        } catch (error) {
            console.error('Error fetching branded trended articles:', error);
            throw error;
        }
    }
    getBrandedDiveinArticles = async (startDateTime, endDateTime) => {
        try {
            const result = await this.repository.findAllBrandedDiveinArticles(startDateTime, endDateTime);
            return result;
        } catch (error) {
            console.error('Error fetching branded divein articles:', error);
            throw error;
        }
    }
    getMusinsaSignificantKeywords = async (startDateTime, endDateTime) => {
        try {
            const keywordsInPeriod = await this.repository.findAllMusinsaTrendedKeywords(startDateTime, endDateTime);
            const keywordList = await this.repository.findAllMusinsaTrendedKeywordList(startDateTime, endDateTime);
            const risingKeywords = keywordsInPeriod.filter(kw => kw.type === '급상승');
            const popularKeywords = keywordsInPeriod.filter(kw => kw.type === '인기');
            const keywordListWithCount = keywordList.map(keyword => {
                keyword.risingCount = risingKeywords.filter(rk => rk.keyword === keyword.keyword).length
                keyword.popularCount = popularKeywords.filter(pk => pk.keyword === keyword.keyword).length
                return keyword;
            });
            const sortedKeywordList = keywordListWithCount.sort((a, b) => b.risingCount - a.risingCount);
            return sortedKeywordList;

        } catch (error) {
            console.error('Error fetching significant keywords:', error);
            throw error;
        }
    }
}

module.exports = Service;