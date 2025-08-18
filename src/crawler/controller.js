const Crawler = require('./crawler');
const Service = require('./service');

class CrawlerController {
    constructor() {
        this.crawler = new Crawler();
        this.service = new Service();
    }

  // 시트 관련 메서드
  // 내외부현황 DB관련
  getMusinsaTrendedKeywordsFromDB = async (req, res) => {
    try {
      const { startDateTime, endDateTime } = req.query;
      const result = await this.service.getMusinsaTrendedKeywords(startDateTime, endDateTime);
      res.status(200).json(result);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }
  getMusinsaSerchResultsFromDB = async (req, res) => {
    try {
      const { startDateTime, endDateTime } = req.query;
      const result = await this.service.getMusinsaSearchResultForSheet(startDateTime, endDateTime);
      res.status(200).json(result);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }
  test = async (req, res) => {
    try {
      const result = await this.crawler.getBrandedTrendedArticles()
      res.status(200).json(result);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }


  //브랜드 현황 DB관련
  getMusinsaStockManage = async (req, res) => {
    try {
      const result = await this.crawler.getMusinsaStockManage();
      res.status(200).json({ result });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }
  getMusinsaStockHistory = async (req, res) => {
    try {
      const { startDate, endDate } = req.body;
      const result = await this.crawler.getMusinsaStockHistory(startDate, endDate);
      res.status(200).json({ result });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }
  getMusinsaGoodsList = async (req, res) => {
    try {
      const data = await this.crawler.getMusinsaGoodsList();
      res.json(data);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }
  getMusinsaReviewList = async (req, res) => {
    try {
      const { startDate, endDate } = req.body;
      const data = await this.crawler.getMusinsaReviewList(startDate, endDate);
      res.json(data);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }
  getMusinsaGlobalOrderHistory = async (req, res) => {
    try {
      const { startDate, endDate } = req.body;
      const data = await this.crawler.getMusinsaGlobalOrderHistory(startDate, endDate);
      res.json(data);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }
}

module.exports = CrawlerController;
