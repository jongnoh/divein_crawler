const { Builder, By, until } = require('selenium-webdriver');
const chrome = require('selenium-webdriver/chrome');
const axios = require('axios');
const Repository = require('./repository.js');
const getMonthlyKeywords = require('../utils/musinsa.search.keywords.js'); // Assuming you have a JSON file with keywords
const SeleniumOption = require('../utils/selenium.js'); // Assuming you have a file for selenium options

class SeleniumCrawler {
    constructor() {
        this.repository = new Repository();
        this.optionInstance = new SeleniumOption();
        this.options = this.optionInstance.options; // Chrome options 객체를 가져옴
    }
  crawl = async (url) => {
    try{

    
    } catch (err) {
        throw new Error('Crawling failed');
    }
  }

        createKSTData = () => {
        let date = new Date();
        const kstDate = new Date(date.getTime() + (9 * 60 * 60 * 1000)); // KST is UTC+9
        return kstDate
    }
// crawling methods
    //   getKeywordsFromMusinsa = async () => {
    //     let driver = await new Builder().forBrowser('chrome').setChromeOptions(this.options).build();
    //     try {
    //         await driver.get('https://www.musinsa.com/main/musinsa/');
    //         await driver.wait(until.elementLocated(By.css('[data-button-name="검색창"]')), 10000);
    //         await driver.findElement(By.css('[data-button-name="검색창"]')).click();
    //         await driver.wait(until.elementLocated(By.className('sc-8tmsfl-0 gQVxzD search-home-popular-wrap')), 10000);
    //         // 인기검색어
    //         const popularElements = await driver.findElements(By.className('sc-8tmsfl-0 gQVxzD search-home-popular-wrap'));
    //         function convertToISODate(mdHmStr) {
    //             // 예: "07.16 19:00, 기준" → "07.16 19:00"
    //             const mdHm = mdHmStr.split(', ')[0];
    //             const [md, hm] = mdHm.split(' '); // md: "07.16", hm: "19:00"
    //             const [month, day] = md.split('.').map(Number);
    //             const [hour, minute] = hm.split(':').map(Number);

    //             const now = this.createKSTData();
    //             const year = now.getFullYear();

    //             // padStart로 2자리 보장
    //             const mm = String(month).padStart(2, '0');
    //             const dd = String(day).padStart(2, '0');
    //             const hh = String(hour).padStart(2, '0');
    //             const min = String(minute).padStart(2, '0');

    //             return `${year}-${mm}-${dd} ${hh}:${min}`;
    //         }
    //         await driver.wait(until.elementLocated(By.xpath('//*[@class="text-body_13px_reg text-gray-600 font-pretendard"]')), 10000);
            
    //         let popularTimesString = await popularElements[0].findElement(By.xpath('//*[@class="text-body_13px_reg text-gray-600 font-pretendard"]')).getAttribute('textContent')
    //         let popularTimestamp = convertToISODate(popularTimesString);
    //         // 리스트 배열
    //         let liList = await popularElements[0].findElements(By.css('li'));
    //         const keywordList = []; // 통합 배열
    //         // const popularList = []
    //         for (let i=0; i<liList.length; i++) {
    //             keywordList.push({
    //                 "keyword": await liList[i].getText(),
    //                 "rank": i + 1,
    //                 "timestamp": popularTimestamp,
    //                 "type" : "인기"
    //             });
    //         }

    //         // 급상승검색어

    //         const risingElements = await driver.findElements(By.className('sc-e1rvdc-0 gZkExN search-home-rising'));
    //         await driver.wait(until.elementLocated(By.className('text-body_13px_reg text-gray-600 font-pretendard')), 10000);
    //         let risingTimesString = await risingElements[0].findElement(By.xpath('//*[@class="text-body_13px_reg text-gray-600 font-pretendard"]')).getAttribute('textContent')
    //         let risingTimestamp = convertToISODate(risingTimesString);

    //         liList = await risingElements[0].findElements(By.css('li'));
    //         // const risingList = [];
    //         for (let i=0; i<liList.length; i++) {
    //             keywordList.push({
    //                 "keyword": await liList[i].getText(),
    //                 "rank": i + 1,
    //                 "timestamp": risingTimestamp,
    //                 "type" : "급상승"
    //             });
    //         }
    //         return { keywordList };


    //     } catch (err) {
    //         console.error('Error during crawling:', err);
    //         throw err;
    //     }
    // }

    // getNewRankingFromMusinsa = async () => {
    //     let driver = await new Builder().forBrowser('chrome').setChromeOptions(this.options).build();  
    //     try {
    //         // new ranking page
    //         await driver.get('https://www.musinsa.com/main/musinsa/ranking?storeCode=musinsa&sectionId=200&contentsId=&categoryCode=000');
    //         await driver.wait(until.elementLocated(By.css('article')), 10000);
            
    //         // scroll down until rank 200
    //         const container = await driver.findElement(By.css('article'));
    //         let found = false;
    //         let targetText = null;
    //         let maxScrolls = 10; // 무한루프 방지
    //         let kstDate = this.createKSTData();
    //         let timestamp = kstDate.toISOString().slice(0, 19).replace('T', ' ');


    //         for (let i = 0; i < maxScrolls; i++) {
    //             const elements = await container.findElements(By.xpath('//*[@class="text-etc_11px_semibold text-black font-pretendard"]'));

    //                 const text = await elements[elements.length - 1].getText();
    //                 if (Number(text) >= 200) {
    //                     found = true;
    //                     targetText = text;
    //                     break
    //                 } else {
    //                     console.log('scroll down');
    //                 }
    //             // PageDown 키 입력
    //             for (let j = 0; j < 5; j++) {
    //             await driver.actions().sendKeys('\uE00F').perform(); // '\uE00F'는 Keys.PAGE_DOWN
    //             }
    //             await driver.sleep(300); // 페이지가 로드될 시간을 주기 위해 잠시 대기
    //         }
    //         if(!found) {
    //             console.log('조건에 맞는 요소를 찾지 못했습니다.');
    //             throw new Error('failed to find rank 200');
    //         }

    //         //rank 1-200까지 data 수집
    //         const itemElements = await driver.findElements(By.css('div[class*="sc-1t5ihy5-0"]'));
    //         let items = [];
    //         for (let i = 0; i < 200; i++) {
    //             items.push({
    //                 "rank": await itemElements[i].findElement(By.className('text-etc_11px_semibold text-black font-pretendard')).getText(),
    //                 "brand": await itemElements[i].findElement(By.xpath('./div[2]/div[1]/a[1]/p')).getText(),
    //                 "name": await itemElements[i].findElement(By.xpath('./div[2]/div[1]/a[2]/p')).getText(),
    //                 "itemId": await itemElements[i].getAttribute('data-item-id'),
    //                 "type": "newRanking",
    //                 "timestamp": timestamp
    //             });
    //         }
    //         return {items}
    //     } catch (err) {
    //         console.error('Error during crawling:', err);
    //         throw err;
    //     } finally {
    //         await driver.quit();
    //     }
    // }

    // getTotalRankingFromMusinsa = async () => {
    //     let driver = await new Builder().forBrowser('chrome').setChromeOptions(this.options).build();  
    //     try {
    //         // new ranking page
    //         await driver.get('https://www.musinsa.com/main/musinsa/ranking?storeCode=musinsa&sectionId=199');
            
    //         await driver.wait(until.elementLocated(By.css('article')), 10000);
            
    //         // scroll down until rank 200
    //         const container = await driver.findElement(By.css('article'));
    //         let found = false;
    //         let targetText = null;
    //         let maxScrolls = 10; // 무한루프 방지

    //         let kstDate = this.createKSTData();
    //         let timestamp = kstDate.toISOString().slice(0, 19).replace('T', ' ');

    //         for (let i = 0; i < maxScrolls; i++) {
    //             const elements = await container.findElements(By.xpath('//*[@class="text-etc_11px_semibold text-black font-pretendard"]'));

    //                 const text = await elements[elements.length - 1].getText();
    //                 if (Number(text) >= 200) {
    //                     found = true;
    //                     targetText = text;
    //                     break
    //                 } else {
    //                     console.log('scroll down');
    //                 }
    //             // PageDown 키 입력
    //             for (let j = 0; j < 5; j++) {
    //             await driver.actions().sendKeys('\uE00F').perform(); // '\uE00F'는 Keys.PAGE_DOWN
    //             }
    //             await driver.sleep(300); // 페이지가 로드될 시간을 주기 위해 잠시 대기
    //         }
    //         if(!found) {
    //             console.log('조건에 맞는 요소를 찾지 못했습니다.');
    //             throw new Error('failed to find rank 200');
    //         }

    //         //rank 1-200까지 data 수집
    //         const itemElements = await driver.findElements(By.css('div[class*="sc-1t5ihy5-0"]'));
    //         let items = [];
    //         for (let i = 0; i < 200; i++) {
    //             items.push({
    //                 "rank": await itemElements[i].findElement(By.className('text-etc_11px_semibold text-black font-pretendard')).getText(),
    //                 "brand": await itemElements[i].findElement(By.xpath('./div[2]/div[1]/a[1]/p')).getText(),
    //                 "name": await itemElements[i].findElement(By.xpath('./div[2]/div[1]/a[2]/p')).getText(),
    //                 "itemId": await itemElements[i].getAttribute('data-item-id'),
    //                 "type": "totalRanking",
    //                 "timestamp": timestamp
    //             });
    //         }
    //         return {items}
    //     } catch (err) {
    //         console.error('Error during crawling:', err);
    //         throw err;
    //     }finally {
    //         await driver.quit();
    //     }
    // }

    // getSearchResultFromMusinsa = async (keyword) => {
    //     let driver = await new Builder().forBrowser('chrome').setChromeOptions(this.options).build();
    //     try {
    //         // 무신사 추천순
    //         await driver.get(`https://www.musinsa.com/search/goods?keyword=${keyword}&keywordStatus=correction&sortCode=POPULAR`);
    //         //첫 번째 상품 대기
    //         await driver.wait(until.elementLocated(By.className('sc-igtioI eSJwIO')), 10000);

    //         let upperElement, itemColumns, topColumnIndex, bottomColumnIndex, itemColumn
    //         let maxScrolls = 40 // 무한루프 방지
    //         let itemData = [];
    //         let kstDate = this.createKSTData();
    //         const timestamp = kstDate.toISOString().slice(0, 19).replace('T', ' ')
    //         for (let i = 0; i < maxScrolls; i++) {
    //             upperElement = await driver.findElement(By.css('[data-testid="virtuoso-item-list"]'));
    //             itemColumns = await upperElement.findElements(By.css('[style="overflow-anchor: none;"]'));
    //             topColumnIndex = await itemColumns[0].getAttribute('data-item-index');
    //             bottomColumnIndex = await itemColumns[itemColumns.length - 1].getAttribute('data-item-index');

            
    //         let itemIndex, itemBrand, itemName, itemId
            
           

    //         for (let j = 0; j < Number(bottomColumnIndex)-Number(topColumnIndex)+1; j++) {
    //             let itemElements = await itemColumns[j].findElements(By.className('sc-igtioI eSJwIO'));
    //             let previousItemCount = itemData.length; // 이전 아이템 개수 저장
    //             for (let k = 0; k < itemElements.length; k++) {
    //                 itemIndex = previousItemCount + k
    //                 itemBrand = await itemElements[k].findElement(By.xpath('.//div[2]/div/div[1]/a[1]/p')).getText();
    //                 itemName = await itemElements[k].findElement(By.xpath('.//div[2]/div/div[1]/a[2]/p')).getText();
    //                 itemId = await itemElements[k].findElement(By.xpath('.//div[2]/div/div[1]/a[2]')).getAttribute('data-item-id');
    //                 if(!itemData.some(item => item.itemId === itemId) && itemData.length < 200) {
    //                     itemData.push({ index : itemIndex, brand : itemBrand, name : itemName, itemId, keyword, timestamp });
    //                 }
    //             }
    //             if(itemData.length == 200) {
    //                 console.log('200개 아이템 수집 완료 :' +  keyword) ;
    //                 break;
    //         }
    //         }

    //         await driver.actions().sendKeys('\uE00F').perform();;
    //     }
    //          return { itemData };
    //     } catch (err) {
    //         console.error('Error during crawling:', err);
    //         throw err;
    //     } finally {
    //         // await driver.quit();
    //     }
    // }
    getBrandedTrendedArticles = async () => {
        let driver = await new Builder().forBrowser('chrome').setChromeOptions(this.options).build();
        try {
            await driver.get('https://cafe.naver.com/ca-fe/cafes/27877258/popular');
            await driver.wait(until.elementLocated(By.className('article')), 10000);
            console.log('네이버 카페 페이지 로드 완료');
            const articleBoardElement = await driver.findElement(By.className('article-board'));
            const trs = await articleBoardElement.findElements(By.xpath('//div[@class="article-board"]//table//tbody/tr'));
            let link, articleId, articleIndex, title, commentCount, viewCountRaw, viewCount, writer;

            let kstDate = this.createKSTData();
            const timestamp = kstDate.toISOString().slice(0, 19).replace('T', ' ')
            let articleList = [];
            for (let i = 0; i < trs.length; i++) {
                articleIndex = i + 1;
                link = await trs[i].findElement(By.className('article'))?.getAttribute('href')
                const match = link.match(/articles\/(\d+)/);
                articleId = match ? match[1] : null;
                title = await trs[i].findElement(By.className('article'))?.getText()
                commentCount = await trs[i].findElement(By.xpath('.//div/div/a[2]/em')).getText();
                viewCountRaw = await trs[i].findElement(By.className('td_view')).getText();
                viewCount = Number(viewCountRaw.replace(/\D/g, ''));
                writer = await trs[i].findElement(By.className('nickname')).getText();
                articleList.push({ articleId, articleIndex, title, commentCount, viewCount, writer, timestamp });
            }
            return { articleList };
        } catch (err) {
            console.error('Error during Naver login:', err);
            throw err;
        } finally {
            await driver.quit();
        }
    
    }

    getBrandedDiveinArticles  = async () => {
        try {
            const fetchResult = await axios({
                method: 'get',
                url: 'https://apis.naver.com/cafe-web/cafe-search-api/v1.0/cafes/27877258/search/articles?query=DIVEIN&perPage=50&page=1&menuId=0&searchBy=3&views=MEMBER_LEVEL%2CCOUNT%2CSALE_INFO%2CCAFE_MENU',
                headers: {
                    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/138.0.0.0 Safari/537.36'
                }
            });
            const articles = fetchResult.data.result.articleList
            let articleToSave = []
            for (let article of articles) {
                if(article.item.writerInfo.nickname !== 'DIVEIN') continue; // DIVEIN 이외 작성글 제외
                articleToSave.push({
                    articleId: article.item.articleId,
                    title: article.item.subject,
                    commentCount: article.item.commentCount,
                    viewCount: article.item.readCount,
                    likeCount: article.item.likeCount,
                    timestamp: article.item.addDate,
                    writer: article.item.writerInfo.nickname,
                })
            }
            return articleToSave

        } catch (err) {
            console.error('Error fetching branded DIVEIN articles:', err);
            throw err;
        }
    }

    getTrendedKeywordsFromMusinsa = async () => {
    const response = await axios({
        method: 'get',
        url: 'https://api.musinsa.com/api2/dp/v1/keyword/search-home?popularCount=10&gf=A',
        headers: {
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/138.0.0.0 Safari/537.36'
        }
    })


    function convertToISODate(mdHmStr) {
                // 예: "07.16 19:00, 기준" → "07.16 19:00"
                const mdHm = mdHmStr.split(', ')[0];
                const [md, hm] = mdHm.split(' '); // md: "07.16", hm: "19:00"
                const [month, day] = md.split('.').map(Number);
                const [hour, minute] = hm.split(':').map(Number);
                
                const date = new Date();
                const now = new Date(date.getTime() + (9 * 60 * 60 * 1000))
                const year = now.getFullYear();

                // padStart로 2자리 보장
                const mm = String(month).padStart(2, '0');
                const dd = String(day).padStart(2, '0');
                const hh = String(hour).padStart(2, '0');
                const min = String(minute).padStart(2, '0');

                return `${year}-${mm}-${dd} ${hh}:${min}`;
            }

    const popularData = response.data.data.componentList[0].items
    const popularTimestamp = response.data.data.componentList[0].meta.updateDate
    const popularISOString = convertToISODate(popularTimestamp);


    const popular = popularData.map((item, index) => ({
        keyword: item.text,
        rank: index + 1,
        timestamp: popularISOString,
        type: '인기'
    }))
    const risingData = response.data.data.componentList[1].items
    const risingTimestamp = response.data.data.componentList[1].meta.updateDate
    const risingISOString = convertToISODate(risingTimestamp);
    const rising = risingData.map((item, index) => ({
        keyword: item.text,
        rank: index + 1,
        timestamp: risingISOString,
        type: '급상승'
    }))
    return { popular, rising }
}
    getSearchResultFromMusinsa = async (keyword) => {
        try {
        let collectCount = process.env.SEARCH_COLLECT_COUNT
        let list = []
        const timestamp = this.createKSTData().toISOString().slice(0, 19).replace('T', ' ')

            let idsOfKeyword = []
        for (let i =0; i < Math.ceil(collectCount/50); i++) {
        const response = await axios({
            method: 'get',
            url: `https://api.musinsa.com/api2/dp/v1/plp/goods?gf=A&keyword=${keyword}&sortCode=POPULAR&page=${i+1}&size=50&caller=SEARCH`,
            headers: {
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/138.0.0.0 Safari/537.36'
            }
        })
        
            response.data.data.list.map(async (item, index) => {
            list.push({
                index: index + (i * 50) + 1,
                itemId: item.goodsNo,
                brand: item.brandName,
                name: item.goodsName,
                reviewCount: item.reviewCount,
                reviewScore: item.reviewScore,
                likeCount: null,
                keyword,
                timestamp: timestamp
            })
            idsOfKeyword.push(item.goodsNo)
            })
        }
        //키워드마다
        const likesResponse = await axios({
        method: 'post',
        url: `https://like.musinsa.com/like/api/v2/liketypes/goods/counts`,
        headers: {
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/138.0.0.0 Safari/537.36'
            },
            data: {
                    "relationIds": idsOfKeyword
                }
        })
        let likesObjectsArray = likesResponse.data.data.contents.items
        for (let i = 0; i < likesObjectsArray.length; i++) {
            let itemOfList = list.find(item => item.itemId == likesObjectsArray[i].relationId)
            if (itemOfList) {
                itemOfList.likeCount = likesObjectsArray[i].count
            } else {
                console.warn('해당 relationId를 가진 객체를 찾지 못했습니다:', likesObjectsArray[i].relationId);
            }
        }
        return list


} catch (err) {
        console.error('Error during crawling:', err);
        throw err;
    }
}
    getNewRankingFromMusinsa = async () => {
        try { 

            const response = await axios({
                method: 'get',
                url: 'https://api.musinsa.com/api2/hm/web/v5/pans/ranking?storeCode=musinsa&sectionId=200&contentsId=&categoryCode=000&gf=A',
                headers: {
                    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/138.0.0.0 Safari/537.36'
                }
            });
            const dataArray = response.data.data.modules;
            let items = []
            for(let i =0; i < dataArray.length; i++) {
                if (dataArray[i].type === 'MULTICOLUMN') {
                    for (let j = 0; j < dataArray[i].items.length; j++) {
                        if (dataArray[i].items[j].type !== "PRODUCT_COLUMN") continue;
                        let watchingCount, purchasingCount;
                        if (dataArray[i].items[j].info.additionalInformation){
                            watchingCount = null;
                            purchasingCount = null;
                            for (let k = 0; k < dataArray[i].items[j].info.additionalInformation.length; k++) {
                                if (dataArray[i].items[j].info.additionalInformation[k].text.includes('보는 중')) {
                                    watchingCount = dataArray[i].items[j].info.additionalInformation[k].text.split('명이')[0]
                                    if (watchingCount.includes('만')) {
                                        watchingCount = String(Number(watchingCount.split('만')[0]) * 10000)
                                    }
                                    if (watchingCount.includes('천')) {
                                        watchingCount = String(Number(watchingCount.split('천')[0]) * 1000)
                                    }
                                }
                                if (dataArray[i].items[j].info.additionalInformation[k].text.includes('구매 중')) {
                                    purchasingCount = dataArray[i].items[j].info.additionalInformation[k].text.split('명이')[0]
                                    if (purchasingCount.includes('만')) {
                                        purchasingCount = String(Number(purchasingCount.split('만')[0]) * 10000)
                                    }
                                    if (purchasingCount.includes('천')) {
                                        purchasingCount = String(Number(purchasingCount.split('천')[0]) * 1000)
                                    }
                                }
                            }
                        }
                        if(items.length < process.env.RANKING_COLLECT_COUNT){
                        items.push({
                            "itemId": dataArray[i].items[j].id,
                            "brand": dataArray[i].items[j].info.brandName,
                            "name": dataArray[i].items[j].info.productName,
                            "rank": dataArray[i].items[j].image.rank,
                            "type": "new",
                            "timestamp": this.createKSTData().toISOString().slice(0, 19).replace('T', ' '),
                            "watchingCount": watchingCount || null,
                            "purchasingCount": purchasingCount || null,
                            "reviewCount" : null,
                            "reviewScore" : null
                        })



                    
                    }
                    }}
            }
            let idsOfItems = [...items.map(item => item.itemId)]

            const likesResponse = await axios({
            method: 'post',
            url: `https://like.musinsa.com/like/api/v2/liketypes/goods/counts`,
            headers: {
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/138.0.0.0 Safari/537.36'
            },
            data: {
                    "relationIds": idsOfItems
                }
        })

        let likesObjectsArray = likesResponse.data.data.contents.items
        for (let i = 0; i < likesObjectsArray.length; i++) {
            let itemOfList = items.find(item => item.itemId == likesObjectsArray[i].relationId)
            if (itemOfList) {
                itemOfList.likeCount = likesObjectsArray[i].count
            } else {
                console.warn('해당 relationId를 가진 객체를 찾지 못했습니다:', likesObjectsArray[i].relationId);
            }
        }

        
        const reviewResponse = await axios({
            method: 'get',
            url: `https://api.musinsa.com/api2/dp/v1/goods?goodsNoList=${String(idsOfItems)}`,
            headers: {
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/138.0.0.0 Safari/537.36'
            }
        })
        const reviewObjectsArray = reviewResponse.data.data.list

        for (let i = 0; i < reviewObjectsArray.length; i++) {
            let itemOfList = items.find(item => item.itemId == reviewObjectsArray[i].goodsNo)
            if (itemOfList) {
                itemOfList.reviewCount = reviewObjectsArray[i].reviewCount
                itemOfList.reviewScore = reviewObjectsArray[i].reviewScore
            } else {
                console.warn('해당 goodsNo를 가진 객체를 찾지 못했습니다:', reviewObjectsArray[i].goodsNo);
            }
        }

            return items
            } catch (error) {
            console.error('Error fetching total ranking:', error);
            throw error;
        }
    }
    getTotalRankingFromMusinsa = async () => {
        try {
            const response = await axios({
                method: 'get',
                url: 'https://api.musinsa.com/api2/hm/web/v5/pans/ranking?storeCode=musinsa&sectionId=199&contentsId=&categoryCode=000&gf=A',
                headers: {
                    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/138.0.0.0 Safari/537.36'
                }
            });
            const dataArray = response.data.data.modules;
            let items = []
            for(let i =0; i < dataArray.length; i++) {
                if (dataArray[i].type === 'MULTICOLUMN') {
                    for (let j = 0; j < dataArray[i].items.length; j++) {
                        if (dataArray[i].items[j].type !== "PRODUCT_COLUMN") continue;
                        let watchingCount, purchasingCount;
                        if (dataArray[i].items[j].info.additionalInformation){
                            watchingCount = null;
                            purchasingCount = null;
                            for (let k = 0; k < dataArray[i].items[j].info.additionalInformation.length; k++) {
                                if (dataArray[i].items[j].info.additionalInformation[k].text.includes('보는 중')) {
                                    watchingCount = dataArray[i].items[j].info.additionalInformation[k].text.split('명이')[0]
                                    if (watchingCount.includes('만')) {
                                        watchingCount = String(Number(watchingCount.split('만')[0]) * 10000)
                                    }
                                    if (watchingCount.includes('천')) {
                                        watchingCount = String(Number(watchingCount.split('천')[0]) * 1000)
                                    }
                                }
                                if (dataArray[i].items[j].info.additionalInformation[k].text.includes('구매 중')) {
                                    purchasingCount = dataArray[i].items[j].info.additionalInformation[k].text.split('명이')[0]
                                    if (purchasingCount.includes('만')) {
                                        purchasingCount = String(Number(purchasingCount.split('만')[0]) * 10000)
                                    }
                                    if (purchasingCount.includes('천')) {
                                        purchasingCount = String(Number(purchasingCount.split('천')[0]) * 1000)
                                    }
                                }
                            }
                        }
                        if(items.length < process.env.RANKING_COLLECT_COUNT){
                        items.push({
                            "itemId": dataArray[i].items[j].id,
                            "brand": dataArray[i].items[j].info.brandName,
                            "name": dataArray[i].items[j].info.productName,
                            "rank": dataArray[i].items[j].image.rank,
                            "type": "total",
                            "timestamp": this.createKSTData().toISOString().slice(0, 19).replace('T', ' '),
                            "watchingCount": watchingCount || null,
                            "purchasingCount": purchasingCount || null
                        })



                    
                    }
                    }}
            }
            let idsOfItems = [...items.map(item => item.itemId)]

            const likesResponse = await axios({
            method: 'post',
            url: `https://like.musinsa.com/like/api/v2/liketypes/goods/counts`,
            headers: {
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/138.0.0.0 Safari/537.36'
            },
            data: {
                    "relationIds": idsOfItems
                }
        })

        let likesObjectsArray = likesResponse.data.data.contents.items
        for (let i = 0; i < likesObjectsArray.length; i++) {
            let itemOfList = items.find(item => item.itemId == likesObjectsArray[i].relationId)
            if (itemOfList) {
                itemOfList.likeCount = likesObjectsArray[i].count
            } else {
                console.warn('해당 relationId를 가진 객체를 찾지 못했습니다:', likesObjectsArray[i].relationId);
            }
        }


        const reviewResponse = await axios({
            method: 'get',
            url: `https://api.musinsa.com/api2/dp/v1/goods?goodsNoList=${String(idsOfItems)}`,
            headers: {
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/138.0.0.0 Safari/537.36'
            }
        })
        const reviewObjectsArray = reviewResponse.data.data.list

        for (let i = 0; i < reviewObjectsArray.length; i++) {
            let itemOfList = items.find(item => item.itemId == reviewObjectsArray[i].goodsNo)
            if (itemOfList) {
                itemOfList.reviewCount = reviewObjectsArray[i].reviewCount
                itemOfList.reviewScore = reviewObjectsArray[i].reviewScore
            } else {
                console.warn('해당 goodsNo를 가진 객체를 찾지 못했습니다:', reviewObjectsArray[i].goodsNo);
            }
        }

        
            return items
            } catch (error) {
            console.error('Error fetching total ranking:', error);
            throw error;
        }
    }

    getRisingProductsFromMusinsaCategorySearchList = async (data) => {
        try {
            let { startDate, endDate } = data;
            endDate = endDate.concat(' 23:59:59');
            const results = await this.repository.findAllCategorySearchResultsByDate(startDate, endDate);
            const keywords = getMonthlyKeywords(startDate, endDate);
            let averageData = []
            for (let keyword of keywords){
                
            let likeCounts = []
            let reviewCounts = []
            let reviewScores = []

                results.filter(item => item.keyword === keyword).forEach(item => {
                    reviewCounts.push(item.reviewCount);
                    reviewScores.push(item.reviewScore);
                    likeCounts.push(item.likeCount);
                    });

                

                averageData.push({
                    keyword: keyword,
                    reviewCount: reviewCounts.reduce((a, b) => a + b, 0) / reviewCounts.length || 0,
                    reviewScore: reviewScores.reduce((a, b) => a + b, 0) / reviewScores.length || 0,
                    likeCount: likeCounts.reduce((a, b) => a + b, 0) / likeCounts.length || 0
                }) 
                }

            let  risingProducts = []

                for (let i=0; i < averageData.length; i++) {
                    let keyword = averageData[i].keyword;
                    risingProducts.push({
                        keyword: keyword,
                        avgReviewCount: averageData[i].reviewCount,
                        avgReviewScore: averageData[i].reviewScore,
                        avgLikeCount: averageData[i].likeCount,
                        products: []
                        
                    })
                    results.filter(result => result.keyword === averageData[i].keyword).filter(
                        item => item.reviewCount < averageData[i].reviewCount
                    ).filter(
                        item => item.reviewScore < averageData[i].reviewScore
                    ).filter(
                        item => item.likeCount < averageData[i].likeCount
                    ).forEach(
                        item => {
                            risingProducts.find(r => r.keyword === keyword).products.push({
                                itemId: item.itemId,
                                brand: item.brand,
                                name: item.name,
                                keyword: item.keyword,
                                reviewCount: item.reviewCount,
                                reviewScore: item.reviewScore,
                            likeCount: item.likeCount,
                            timestamp: item.timestamp
                        });
                    });

                }
                return risingProducts;

            } catch (error) {
            console.error('Error fetching rising products:', error);
            throw error;
        }
    }
}
module.exports = SeleniumCrawler;
