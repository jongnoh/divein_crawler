const SeleniumCrawler = require('./service');
const crawler = new SeleniumCrawler();

class CrawlerController {
    constructor() {
        this.seleniumCrawler = new SeleniumCrawler();
    }
  getKeywordsFromMusinsa = async (req, res) => {
    try {
      const data = await this.seleniumCrawler.getKeywordsFromMusinsa();
      res.json({ data });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }
  getNewRankingFromMusinsa = async (req, res) => {
    try {
      const data = await this.seleniumCrawler.getNewRankingFromMusinsa();
      res.json({ data });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }
  getTotalRankingFromMusinsa = async (req, res) => {
    try {
      const data = await this.seleniumCrawler.getTotalRankingFromMusinsa();
      res.json({ data });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }
  getSearchResultFromMusinsa = async (req, res) => {
    try {
      const keyword = '반소매 티셔츠'
      const data = await this.seleniumCrawler.getSearchResultFromMusinsa(keyword);
      res.json({ data });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }
  getBrandedTrendedArticles = async (req, res) => {
    try {
      const result = await this.seleniumCrawler.getBrandedTrendedArticles();
      res.json({ result });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
}
}

module.exports = CrawlerController;
