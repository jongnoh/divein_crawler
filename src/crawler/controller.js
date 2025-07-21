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

  
    archiveTrendedKeywords = async() => {
        try {
            const keywordsData = await this.try3times(null, this.seleniumCrawler.getKeywordsFromMusinsa);
            console.log('크롤링 완료:', keywordsData);
            if (keywordsData) {
            await this.models.musinsa_trended_keywords.bulkCreate(keywordsData.keywordList);
            console.log('DB 저장 완료');
        } else {
            console.error('키워드 데이터 없음');
        }
    } catch (err) {
        console.error('cron 작업 에러:', err);
    }
}
}

module.exports = CrawlerController;
