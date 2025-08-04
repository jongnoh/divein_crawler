// Entry point for the Express server
const express = require('express');
const app = express();
const dotenv = require('dotenv');

const cron = require('node-cron');


const Archiver = require('./src/crawler/archiver.js');
const Controller = require('./src/crawler/controller.js');

const archiver = new Archiver();
const controller = new Controller();
const sequelize = require('./src/utils/sequelize');
const User = require('./src/models/users');
// Load environment variables     
dotenv.config();

app.use(express.json());
app.get('/keywords', controller.getKeywordsFromMusinsa);
app.get('/new-ranking', controller.getNewRankingFromMusinsa);
app.get('/total-ranking', controller.getTotalRankingFromMusinsa);
app.get('/search/keywords', controller.getSearchResultFromMusinsa);
app.get('/naver/login', controller.getBrandedTrendedArticles);

app.get('/test', archiver.archiveSearchResultFromMusinsa);

const PORT = process.env.PORT;

(async () => {
  try {
    await sequelize.authenticate(); 
    console.log('DB 연결 성공');
    await sequelize.sync(); // 모델 테이블 생성(없으면)
  } catch (err) {
    console.error('DB 연결 실패:', err);
  }
})();



cron.schedule('16 * * * *', () => {
  archiver.archiveTrendedKeywordsFromMusinsa();
});
cron.schedule('01 * * * *', () => {
  archiver.archiveSearchResultFromMusinsa();
});
cron.schedule('10 * * * *', () => {
  archiver.archiveNewRankingFromMusinsa();
  archiver.archiveTotalRankingFromMusinsa();
});
cron.schedule('01 12 * * *', () => {
  archiver.archiveBrandedTrendedArticles();
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
