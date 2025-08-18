const Repository = require('./repository.js');



class Service {
    constructor() {
        this.repository = new Repository();
    }


    getMusinsaTrendedKeywords = async (startDateTime,endDateTime) => {
    const result = await this.repository.findAllMusinsaTrendedKeywords(startDateTime,endDateTime);
    return result;
}
    getMusinsaSearchResultForSheet = async (startDateTime, endDateTime) => {
    const data = await this.repository.findAllMusinsaSearchResult(startDateTime, endDateTime);
    return data;
}
}

module.exports = Service;