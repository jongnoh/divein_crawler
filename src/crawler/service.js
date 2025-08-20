const Repository = require('./repository.js');



class Service {
    constructor() {
        this.repository = new Repository();
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
}

module.exports = Service;