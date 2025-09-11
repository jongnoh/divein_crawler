// Entry point for the Express server
const express = require('express');
const app = express();
const dotenv = require('dotenv');

const cron = require('node-cron');


const Archiver = require('./src/crawler/archiver.js');
const Controller = require('./src/crawler/controller.js');
const Crawler = require('./src/crawler/crawler.js');

const archiver = new Archiver();
const controller = new Controller();
const crawler = new Crawler();
const sequelize = require('./src/utils/sequelize');
// Load environment variables     
dotenv.config();

app.use(express.json());



// app.get('/musinsa/category', controller.getMusinsaCategoryOfProducts);
app.get('/musinsa/categories', archiver.archiveMusinsaCategories);


// app.get('/test', controller.getMusinsaCategorySearchResults);
//sheet 관련
// 내외부현황 
app.get('/sheet/musinsa_trended_keywords', controller.getMusinsaTrendedKeywordsFromDB);
app.get('/sheet/musinsa_search_result', controller.getMusinsaCategorySearchResultsFromDB);
app.get('/sheet/musinsa_ranking', controller.getMusinsaRankingFromDB);
app.get('/sheet/branded_trended_articles', controller.getBrandedTrendedArticles);
app.get('/sheet/branded_divein_articles', controller.getBrandedDiveinArticles);
app.get('/sheet/musinsa_significant_keywords', controller.getMusinsaSignificantKeywords);

app.post('/update/musinsa_ranked_items/category', archiver.archiveMusinsaCategoryToMusinsaRankedItems);
//브랜드현황
//재고관리
app.get('/sheet/musinsa/stockManage', controller.getMusinsaStockManage);
//재고현황
app.get('/sheet/musinsa/stockHistory', controller.getMusinsaStockHistory);
//상품목록
app.get('/sheet/musinsa/GoodsList', controller.getMusinsaGoodsList);
//리뷰목록
app.get('/sheet/musinsa/ReviewList', controller.getMusinsaReviewList);
// 글로벌 주문내역
app.get('/sheet/musinsaGlobal/orderHistory', controller.getMusinsaGlobalOrderHistory);


app.get('/test', archiver.archiveSearchResultFromMusinsa)

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

// if(!controller.crawler.musinsaDriver) {
// controller.crawler.logInToMusinsaPartner()
// }
// cron.schedule('01 12 * * *', () => {
//   controller.crawler.logInToMusinsaPartner();
// });

// //category update 매 초마다
// cron.schedule('*/5 * * * * *', () => {
//   archiver.archiveMusinsaCategoryToMusinsaRankedItems();
// });

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
cron.schedule('01 12 * * *', () => {
  archiver.archiveBrandedDiveinArticles();
});


app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
