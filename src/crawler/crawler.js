const { Builder, By, until } = require('selenium-webdriver');
const chrome = require('selenium-webdriver/chrome');
const axios = require('axios');
const Repository = require('./repository.js');
const SeleniumOption = require('../utils/selenium.js');
const speakeasy = require('speakeasy');
const requestForms = require('../utils/request.forms.js');
const DateUtils = require('../utils/date.js');
class Crawler {
    constructor() {
        this.repository = new Repository();
        this.optionInstance = new SeleniumOption();
        this.options = this.optionInstance.options; // Chrome options 객체를 가져옴
        this.musinsaDriver = null;
        this.naverDriver = null;
        this.requestForms = new requestForms();
        this.dateUtils = new DateUtils();
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
    // getBrandedTrendedArticles = async () => {
    //     let driver = await new Builder().forBrowser('chrome').setChromeOptions(this.options).build();
    //     try {
    //         await driver.get('https://cafe.naver.com/ca-fe/cafes/27877258/popular');
    //         await driver.wait(until.elementLocated(By.className('article')), 10000);
    //         console.log('네이버 카페 페이지 로드 완료');
    //         const articleBoardElement = await driver.findElement(By.className('article-board'));
    //         const trs = await articleBoardElement.findElements(By.xpath('//div[@class="article-board"]//table//tbody/tr'));
    //         let link, articleId, articleIndex, title, commentCount, viewCountRaw, viewCount, writer;

    //         let kstDate = this.createKSTData();
    //         const timestamp = kstDate.toISOString().slice(0, 19).replace('T', ' ')
    //         let articleList = [];
    //         for (let i = 0; i < trs.length; i++) {
    //             articleIndex = i + 1;
    //             link = await trs[i].findElement(By.className('article'))?.getAttribute('href')
    //             const match = link.match(/articles\/(\d+)/);
    //             articleId = match ? match[1] : null;
    //             title = await trs[i].findElement(By.className('article'))?.getText()
    //             commentCount = await trs[i].findElement(By.xpath('.//div/div/a[2]/em')).getText();
    //             viewCountRaw = await trs[i].findElement(By.className('td_view')).getText();
    //             viewCount = Number(viewCountRaw.replace(/\D/g, ''));
    //             writer = await trs[i].findElement(By.className('nickname')).getText();
    //             articleList.push({ articleId, articleIndex, title, commentCount, viewCount, writer, timestamp });
    //         }
    //         return { articleList };
    //     } catch (err) {
    //         console.error('Error during Naver login:', err);
    //         throw err;
    //     } finally {
    //         await driver.quit();
    //     }
    
    // }


    loginToNaver = async () =>{
        this.naverDriver? this.naverDriver.quit() : null;
        this.naverDriver = await this.createDriver();
        const loginId = process.env.NAVER_LOGIN_ID;
        const loginPassword = process.env.NAVER_LOGIN_PASSWORD;
        try {
            await this.naverDriver.get('https://nid.naver.com/nidlogin.login');
            await this.naverDriver.wait(until.elementLocated(By.id('id')), 10000);
            await this.naverDriver.executeScript(`document.getElementsByName('id')[0].value='${loginId}'`)
            await this.naverDriver.executeScript(`document.getElementsByName('pw')[0].value='${loginPassword}'`)
            await this.naverDriver.findElement(By.className('btn_login')).click();
            console.log('네이버 로그인 성공');
        } catch (err) {
            console.error('네이버 로그인 중 에러 발생:', err);
            throw err;
        }
    }

    getBrandedTrendedArticles = async () => {
        try {
            const menuResponse = await axios({
                method: 'get',
                url: 'https://apis.naver.com/cafe-web/cafe-cafemain-api/v1.0/cafes/27877258/menus',
                headers: {
                    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/138.0.0.0 Safari/537.36',
                    'x-cafe-product': 'pc'
                
                }
            })
            const menus = menuResponse.data.result.menus
            const articleResponse = await axios({
                method: 'get',
                url: 'https://apis.naver.com/cafe-web/cafe2/WeeklyPopularArticleListV3.json?cafeId=27877258&mobileWeb=true&adUnit=PC_CAFE_BOARD&ad=false',
                                headers: {
                    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/138.0.0.0 Safari/537.36'
                }
            });
            const articles = articleResponse.data.message.result.articleList.slice(0,20);
            const articlesToSave = []
            const timestamp = new Date().toLocaleString('ja-JP',{timeZone: 'Asia/Seoul', hour12: false})
            articles.forEach((article, index) => {
                let menuName = menus.find(menu => menu.menuId === article.menuId).name
                articlesToSave.push(
                    {
                    articleId: article.articleId,
                    title: article.subject,
                    commentCount: article.commentCount,
                    viewCount: article.readCount,
                    timestamp: timestamp,
                    writer: article.nickname,
                    menu: menuName,
                    articleIndex: index + 1,
                })
            })
            return articlesToSave
        } catch (err) {
            console.error('Error during crawling:', err);
            throw err;
        }
    }
//     addMenuToBrandedTrendedArticles = async () => {
//         const articles = await this.repository.findAllBrandedTrendedArticles('2025-08-12 00:00:00', '2025-08-22 00:00:00');
//         const cookieString = 'ncvid=#vid#_101.235.54.94C11h; NAC=3zjdBsw43u82; NNB=KZ2RV54ELOOWQ; NACT=1; nci4=ab9b7355460961de8d6324333ec5b3d76033cc257727eb38e2000d1ff6887fa02a8f0507b86afbdaca3561c30035b8d54f59686385c3d51a2401bd78c78b57f18379e0b1ebfeebba709782ef92768ce689a51f030a2d08390c111f1f11111b173539002714242c2306211f53242b0e5664425d5e795c6d2757466144753d4d40674e7f3243486f7647657d70587c4d0605061d19191a1f6e61486f5c12177a14ece082efe0e1e38ce5e4e6e79b; nid_inf=1767791047; NID_AUT=78yefGOwxpCOSjrQVU5bkSiRrtV7BOr9RwouhCQ5gVa6gNSvTO6cuuAcOCFhyNi5; ncu=85bd457f602d15a6f51b5c4b46bacdab7d; ncmc4=81b1597f6c234bf4a7490e1914e89ff94a14ed580c20cf34ee1a17cf787db841a9508465878b550870cabf51eb73fc22dbcdc1c92d327b621ed4; page_uid=j6iJPlqo1fsssQ5TX3GssssssAV-393275; NID_SES=AAABpEs48JSoB23J2+16fnFik/JKbn8dErl6lJn6FJVo0jzvqDPqY8wfE+vkWi/BlY22LKLELSImFrH8VCNqaIyvugDy7BixmyC0u861oFWEhdw1XIMLsCsQaXA+VEQcLnmPWWp3/XHDQ4hGfRuI8Hq/hopGtfJtRZUECC8+I8HWX8zgFbbbo+c/VLUt+u/OzOA1m1oh2dh50mgf9FbympW+EzJO7W3WsUcbBek+9sXrafE0uHs+4Qtd3Nv68uojbIaSLb9MR8N9h91e/MDjrg4HsZqocSKCjU1mpdkqkQ7LSlgBhe7BZoJZDkv94S+Ot4XCNerUuD5bWoyY+5YuDCodULlNYeaMqCKZbTeeCkftAi41q+sBeyly0vOXrt4D7B3pfZ8pDsB3VmMlgQEA4l4fDrxYaFVJDi/n2tCFR0CGhgwob5jpuk8sTD3KiTYqXIeYAAmMhZapMhs2TBofsdTfpr/CeSWN5NHPhXRWn5qaG4D/j5C0ufHW+WxsOQg32T2wQVSmZx9NVsvk9ql3yL8soRifjUFRcd6y+Eftg8kOFvNABksj6EArK6+JJ0e6xjtpSw==; SRT30=1755747727; SRT5=1755747727; BUC=XLhC74uaM8V_fsn6jSgzSLinUizR18dqTpakmsH6neE=; ncvc2=9da55d6778350dbe817f1b2517f18ef05d1bf8074c13f920d81a24f43d'
//         articles.forEach(async (article) => {
//             try{
//             const menu = await axios({
//                 method: 'get',
//                 url: `https://article.cafe.naver.com/gw/v3/cafes/27877258/articles/${article.articleId}`,
//                 headers: {
//                     'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome',
//                     'Cookie': cookieString
//             }}
//         )
//     article.menu = menu.data.result.article.menu.name
//             await this.repository.updateMenuToBrandedTrendedArticles(article.articleId, article.menu)
//     }catch (err) {
//                 console.log(`Error fetching menu for article ${article.articleId}:`, err);
//                 return; // 메뉴를 찾을 수 없는 경우, 해당 아티클은 건너
//             }
            
// });
//     }


    
    getBrandedDiveinArticlesTracks = async () => {
    try {
        const articles = await this.getBrandedDiveinArticles();
        const filteredArticles = articles.filter(article => new Date(article.timestamp) > this.dateUtils.getAWeekAgoDateObject());
        const timestamp = new Date().toLocaleString('ja-JP',{timeZone: 'Asia/Seoul', hour12: false})
        const articlesToSave = filteredArticles.map((article, index) => ({
            ...article,
            articleIndex: index + 1,
            addDate: article.timestamp,
            timestamp
        }));
        return articlesToSave;
    } catch (error) {
        console.error('Error fetching branded divein articles:', error);
        throw error;
    }
    }
    getBrandedDiveinArticlesComments = async () => {
        try{
            const articles = await this.getBrandedDiveinArticlesToUpdateComment()
            await this.loginToNaver();

            const cookies = await this.naverDriver.manage().getCookies()
            const cookieString = cookies.map(cookie => `${cookie.name}=${cookie.value}`).join('; ');
            let result = []
                    const recursion = async (article,page = 1) => {
                    const commentsResponse = await axios({
                        method: 'get',
                        url: `https://article.cafe.naver.com/gw/v4/cafes/27877258/articles/${article.articleId}/comments/pages/${page}?orderBy=desc`,
                        headers: {
                            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/138.0.0.0 Safari/537.36',
                            'Cookie':cookieString
                        }
                    })
                    const comments = commentsResponse.data.result.comments.items
                    comments.map(async (comment) => {
                        const commentData = {
                            articleId: article.articleId,
                            commentId: comment.id,
                            content: comment.content,
                            writer: comment.writer.nick,
                            timestamp: new Date(comment.updateDate).toLocaleString('ja-jp'),
                            refId: comment.isRef? comment.refId : null
                        }
                        result.push(commentData)
                    })
                    if(commentsResponse.data.result.displayCommentCount > page*100){
                        await recursion(article, page + 1);
                    }
                    }
            for (const article of articles) {
                await recursion(article);
            }
            return result;

        }catch (error) {
            console.error('Error fetching branded divein articles comments:', error);
            return error
        }


    }

    getBrandedDiveinArticlesToUpdateComment = async () =>{
        try {
            const presentArticlesResponse = await axios({
                method: 'get',
                url:'https://apis.naver.com/cafe-web/cafe-search-api/v1.0/cafes/27877258/search/articles?query=DIVEIN&perPage=50&page=1&menuId=0&searchBy=3&views=MEMBER_LEVEL%2CCOUNT%2CSALE_INFO%2CCAFE_MENU',
                headers: {
                    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/138.0.0.0 Safari/537.36'
                }
            });
            const presentArticles = presentArticlesResponse.data.result.articleList.map(article => ({
                articleId:article.item.articleId,
                commentCount: article.item.commentCount
            }))
                const articles = (await this.repository.findAllBrandedDiveinArticles()).slice(-50);
                const articlesToUpdateComments = articles.filter(article => {
                    let responseArticle = presentArticles.find(pArticle => pArticle.articleId == article.articleId);
                    return article.commentCount < responseArticle?.commentCount;
                })
            return articlesToUpdateComments

        } catch (error) {
            console.error('Error fetching branded divein comments:', error);
            throw error;
        }
    }


    getBrandedDiveinArticles  = async () => {
        try {
            const menuResponse = await axios({
            method: 'get',
            url: 'https://apis.naver.com/cafe-web/cafe-cafemain-api/v1.0/cafes/27877258/menus',
            headers: {
                    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/138.0.0.0 Safari/537.36',
                    'x-cafe-product': 'pc'
                
                }
            })
            const menus = menuResponse.data.result.menus

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
                let menuName = menus.find(menu => menu.menuId === article.item.menuId).name
                articleToSave.push({
                    articleId: article.item.articleId,
                    title: article.item.subject,
                    commentCount: article.item.commentCount,
                    viewCount: article.item.readCount,
                    likeCount: article.item.likeCount,
                    timestamp: article.item.addDate,
                    writer: article.item.writerInfo.nickname,
                    menu: menuName,
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
                timestamp: timestamp,
                normalPrice: item.normalPrice,
                price: item.price
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
                            "reviewScore" : null,
                            "price": dataArray[i].items[j].info.finalPrice,
                            "normalPrice": dataArray[i].items[j].impressionEventLog.ga4.payload.original_price,
                            "image": dataArray[i].items[j].image.url,
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
                            "purchasingCount": purchasingCount || null,
                            "price": dataArray[i].items[j].info.finalPrice,
                            "normalPrice": dataArray[i].items[j].impressionEventLog.ga4.payload.original_price,
                            "image": dataArray[i].items[j].image.url,
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
getMusinsaCategories = async () => {
    let categories = [];
    
    // traverse 함수 정의
    const traverse = (List) => {
        List.forEach(item => {
            if (item) {
                categories.push({
                    categoryCode: item.categoryCode,
                    categoryTitle: item.categoryTitle,
                    hasSubCategory: item.hasSubCategory,
                    parentCategoryCode: item.parentCategoryCode || null,
                });
                // 재귀적으로 하위 카테고리 처리
                traverse(item.categoryList);
            }
        });
    };

    // 순차적으로 API 호출
    for (let i = 100; i < 117; i++) {
        try {
            let categoryCode = (i + 1).toString().padStart(3, '0');
            let categoryResponse = await axios({
                method: 'get',
                url: `https://api.musinsa.com/api2/dp/v1/plp/filter/categories?caller=CATEGORY&category=${categoryCode}`,
            });

            // 응답 데이터 처리
            if (categoryResponse.data.data.list) {
                categoryResponse.data.data.list.forEach(item => {
                    if (item) {
                        categories.push({
                            categoryCode: item.categoryCode,
                            categoryTitle: item.categoryTitle,
                            hasSubCategory: item.hasSubCategory,
                            parentCategoryCode: item.parentCategoryCode || null,
                        });
                        // 재귀적으로 하위 카테고리 처리
                        traverse(item.categoryList);
                    }
                });
            }
        } catch (error) {
            console.error(`카테고리 ${i + 1} 요청 실패:`, error.message);
        }
    }
    
    return categories;
}
getMusinsaCategoryOfProducts = async (productId) => {
    try {
    let response = await axios({
        method: 'get',
        url: `https://www.musinsa.com/products/${productId}`
    })
    let htmlString = response.data;
    function extractMSSProductCategoryCode(htmlString) {
    try {
        // window.__MSS__.product.state = 다음의 객체를 찾는 정규표현식
        const regex = /window\.__MSS__\.product\.state\s*=\s*(\{.*?\});/s;
        const match = htmlString.match(regex);
        
        if (match && match[1]) {
            // JSON 문자열을 객체로 변환
            const objectString = match[1];
            const productCategoryCode = JSON.parse(objectString);
            return productCategoryCode;
        }
        
        return null;
    } catch (error) {
        console.error('MSS product category code 파싱 에러:', error);
        return null;
    }
}

let result = await extractMSSProductCategoryCode(htmlString);
if(result.goodsNo == productId) {
    return {productId: result.goodsNo, 
        categoryCode: result.category.categoryDepth4Code? result.category.categoryDepth4Code : result.category.categoryDepth3Code? result.category.categoryDepth3Code : result.category.categoryDepth2Code? result.category.categoryDepth2Code : result.category.categoryDepth1Code,
    }
}
    } catch (err) {
        console.error('카테고리 작업 에러:', err);
    }
}

// 시트 관련
    logInToMusinsaPartner = async () => {
        await this.closeMusinsaDriver();

        const loginId = process.env.MUSINSA_LOGINID;
        const pw = process.env.MUSINSA_PASSWORD;


        if (!this.musinsaDriver) {
            this.musinsaDriver = await this.createDriver();
        }

        try {
            console.log('로그인 페이지로 이동 중...');
            await this.musinsaDriver.get('https://partner.musinsa.com/auth/login');
            
            // 페이지 로딩 완료까지 기다림
            await this.musinsaDriver.wait(async () => {
                const readyState = await this.musinsaDriver.executeScript('return document.readyState');
                return readyState === 'complete';
            }, 15000);
            
            console.log('로그인 페이지 로딩 완료');
            
            // 로그인 폼이 나타날 때까지 기다림
            console.log('로그인 폼 대기 중...');
            await this.musinsaDriver.wait(until.elementLocated(By.name('id')), 10000);
            await this.musinsaDriver.wait(until.elementLocated(By.name('password')), 10000);
            
            // 추가 안정화 대기
            await this.musinsaDriver.sleep(1000);
            
            console.log('아이디 입력 중...');
            const idField = await this.musinsaDriver.findElement(By.name('id'));
            await idField.clear(); // 기존 값 클리어
            await idField.sendKeys(loginId);
            
            console.log('패스워드 입력 중...');
            const pwField = await this.musinsaDriver.findElement(By.name('password'));
            await pwField.clear(); // 기존 값 클리어
            await pwField.sendKeys(pw);

            // 로그인 버튼 클릭
            console.log('로그인 버튼 클릭...');
            let loginButton = await this.musinsaDriver.findElement(By.xpath('//button[contains(text(), "로그인") or @type="submit"]'));
            await loginButton.click();
            
            // 로그인 처리 대기
            await this.musinsaDriver.sleep(1000);

            // 2단계 인증
            const currentUrlAfterLogin = await this.musinsaDriver.getCurrentUrl();
            if(currentUrlAfterLogin.includes('/auth/two-factor')) {

                await this.musinsaDriver.wait(until.elementLocated(By.name('verificationCode')), 10000);
                console.log('2단계 인증 코드 입력 중...');
                const twoFactorField = await this.musinsaDriver.findElement(By.name('verificationCode'));
                await twoFactorField.clear();
                const twoFactor = await speakeasy.totp({
                secret: process.env.OTP_SECRET,
                encoding: 'base32'
            });
                await twoFactorField.sendKeys(twoFactor);
                console.log('2단계 인증 코드 입력 완료, 로그인 버튼 클릭 중...');
                let loginButton = await this.musinsaDriver.findElement(By.xpath('//button[contains(text(), "로그인") or @type="submit"]'))
                await loginButton.click(); 
            }

            // 현재 URL 확인하여 로그인 성공 여부 판단
            await this.musinsaDriver.sleep(1000);
            const currentUrl = await this.musinsaDriver.getCurrentUrl();
            console.log('로그인 후 현재 URL:', currentUrl);

            if (currentUrl.includes('/auth/login') || currentUrl.includes('/auth/two-factor')) {
                // 아직 로그인 페이지에 있으면 실패
                return {
                    success: false,
                    statusCode: 401,
                    message: '로그인에 실패했습니다. 아이디와 패스워드를 확인해주세요.',
                    currentUrl: currentUrl
                };
            } else {
                // 다른 페이지로 이동했으면 성공

                this.musinsaAuthToken = await this.musinsaDriver.manage().getCookie('pp-auth')
                this.musinsaRTK = await this.musinsaDriver.manage().getCookie('partner-platform-rtk')
                this.musinsaRTK = await this.musinsaDriver.manage().getCookie('partner-platform-atk')

                return {
                    success: true,
                    statusCode: 200,
                    message: '로그인에 성공했습니다.',
                    currentUrl: currentUrl
                };
            }

        } catch (error) {
            console.error('로그인 중 오류:', error);
            // 명시적으로 객체 반환
            return {
                success: false,
                statusCode: 500,
                message: '로그인 중 오류가 발생했습니다: ' + error.message,
                error: error.message
            };
        }
    }

    getMusinsaGoodsCreateDate = async (itemId) => {
        try{
            const response = await axios({
                method: 'get',
                url: `https://goods.musinsa.com/api2/review/v1/picture-reviews?goodsNo=${itemId}&size=1&page=1`,
            });
            let result = null;
            if(response.data.data.list[0]){
                result = {
                    itemId : itemId,
                    goodsCreateDate : response.data.data.list[0].goods.goodsCreateDate ? response.data.data.list[0].goods.goodsCreateDate : "9999-12-31"
                }
            }
            console.log(result);
            return result
        } catch (error) {
            console.error('Error fetching goods create date:', error);
            throw error;
        }
    
    
    }
        

    getMusinsaDailySettlement = async (startDate, endDate, status) => {
        /** 
         * startDate, endDate는 string 타입으로 '2025-08-12' 형식이어야 합니다.
         * status는 'confirmed' 또는 'toBeConfirmed' 중 하나여야 합니다
         */
        if(!this.musinsaDriver)
            {
                await this.logInToMusinsaPartner();
            }
        
        //pp-auth 쿠키
        const cookie = await this.musinsaDriver.manage().getCookie('pp-auth');
        const cookieString = `${cookie.name}=${cookie.value};`


        let formData = this.requestForms.musinsaDailySettlement(startDate, endDate, status)
        const response = await axios({
            method: 'post',
            url: 'https://bizest.musinsa.com/po/order-group-admin/account/acc65/search',
            data: formData,
            headers: {
                'accept': '*/*',
               'content-type' : 'application/x-www-form-urlencoded; charset=UTF-8',
                'Cookie': cookieString
            }
        });
        return response.data
    }

    getMusinsaStockManage = async () => {
        if(!this.musinsaDriver)
            {
                await this.logInToMusinsaPartner();
            }
        
        //pp-auth 쿠키
        const cookie = await this.musinsaDriver.manage().getCookie('pp-auth');
        const cookieString = `${cookie.name}=${cookie.value};`


        let formData = this.requestForms.musinsaStockManage()
        const response = await axios({
            method: 'post',
            url: 'https://bizest.musinsa.com/po/api/jaego/jae40/search',
            data: formData,
            headers: {
                'accept': '*/*',
               'content-type' : 'application/x-www-form-urlencoded; charset=UTF-8',
                'Cookie': cookieString
            }
        });
        return response.data
    }
    getMusinsaStockHistory = async (startDate,endDate) => {
        if(!this.musinsaDriver)
            {
                await this.logInToMusinsaPartner();
            }
        
        //pp-auth 쿠키
        const cookie = await this.musinsaDriver.manage().getCookie('pp-auth');
        const cookieString = `${cookie.name}=${cookie.value};`


        let formData = this.requestForms.musinsaStockHistory(startDate, endDate)
        const response = await axios({
            method: 'post',
            url: 'https://bizest.musinsa.com/po/api/jaego/jae05/search',
            data: formData,
            headers: {
                'accept': '*/*',
               'content-type' : 'application/x-www-form-urlencoded; charset=UTF-8',
                'Cookie': cookieString
            }
        });
        return response.data
    }
    getMusinsaGoodsList = async () => {
            if(!this.musinsaDriver)
                {
                    await this.logInToMusinsaPartner();
                }
            
            //pp-auth 쿠키
            const cookie = await this.musinsaDriver.manage().getCookie('pp-auth');
            const cookieString = `${cookie.name}=${cookie.value};`
    
    
            let formData = this.requestForms.musinsaGoodsList()


            const response = await axios({
                method: 'post',
                url: 'https://bizest.musinsa.com/po/api/jaego/jae40/search',
                data: formData,
                headers: {
                    'accept': '*/*',
                   'content-type' : 'application/x-www-form-urlencoded; charset=UTF-8',
                    'Cookie': cookieString
                }
            });
            return response.data
    }
    getMusinsaReviewList = async (startDate, endDate) => {
            if(!this.musinsaDriver)
                {
                    await this.logInToMusinsaPartner();
                }
            
            //pp-auth 쿠키
            const cookie = await this.musinsaDriver.manage().getCookie('pp-auth');
            const cookieString = `${cookie.name}=${cookie.value};`
    
    
            let formData = this.requestForms.musinsaReviewList(startDate, endDate)

            const response = await axios({
                method: 'post',
                url: 'https://bizest.musinsa.com/po/api/csm/csm07/search',
                data: formData,
                headers: {
                    'accept': '*/*',
                   'content-type' : 'application/x-www-form-urlencoded; charset=UTF-8',
                    'Cookie': cookieString
                }
            });
            return response.data
    }
    getMusinsaGlobalOrderHistory = async (startDate, endDate) => {
            if(!this.musinsaDriver)
                {
                    await this.logInToMusinsaPartner();
                }
            
            //pp-auth 쿠키
            const cookies = await this.musinsaDriver.manage().getCookies();
            const cookieString = cookies.map(cookie => `${cookie.name}=${cookie.value}`).join('; ');

            let formData = await this.requestForms.musinsaGlobalOrderHistory(startDate, endDate)
            const response = await axios({
                method: 'post',
                url: 'https://bizest.musinsa.com/po/global-order-admin/order/order/get_order_list',
                data: formData,
                headers: {
                    'accept': '*/*',
                    'Cookie': cookieString,
                    'Origin' : 'https://bizest.musinsa.com',
                    'Referer' : 'https://bizest.musinsa.com/po/global-order-admin/order/order/list?&LAYOUT_TYPE=popup',
                    'accept-encoding': 'same-origin, gzip, deflate, br, zstd'

    }});
            return response.data
    }
    



     createDriver = async () => {
        return await new Builder()
            .forBrowser('chrome')
            .setChromeOptions(this.options)
            .build();
    }

    closeMusinsaDriver = async () =>  {
        if (this.musinsaDriver) {
            try {
                console.log('Driver 종료 중...');
                await this.musinsaDriver.quit();
                console.log('Driver 종료됨');
                this.musinsaDriver = null;
                return {
                    success: true,
                    statusCode: 200,
                    message: 'Driver가 성공적으로 종료되었습니다.'
                };
            } catch (error) {
                console.error('Driver 종료 중 오류:', error);
                this.musinsaDriver = null;
                return {
                    success: false,
                    statusCode: 500,
                    message: 'Driver 종료 중 오류가 발생했습니다: ' + error.message
                };
            }
        } else {
            return {
                success: true,
                statusCode: 200,
                message: '종료할 Driver가 없습니다.'
            };
        }
    }
    checkMusinsaDriver = async () => {
        return Boolean(this.musinsaDriver)
    }

}
module.exports = Crawler;
