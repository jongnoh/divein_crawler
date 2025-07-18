const { Builder, By, until } = require('selenium-webdriver');
const chrome = require('selenium-webdriver/chrome');

class SeleniumCrawler {
    constructor() {

    this.options = new chrome.Options();
    this.options.addArguments('--window-size=1920,1080');
    this.options.addArguments('--no-sandbox');
    // this.options.addArguments('--headless'); // Uncomment this line to run in headless mode
    // this.options.addArguments('--disable-gpu');
    // this.options.addArguments('--disable-dev-shm-usage');
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

      getKeywordsFromMusinsa = async () => {
        let driver = await new Builder().forBrowser('chrome').setChromeOptions(this.options).build();
        try {
            await driver.get('https://www.musinsa.com/main/musinsa/');
            await driver.wait(until.elementLocated(By.css('[data-button-name="검색창"]')), 10000);
            await driver.findElement(By.css('[data-button-name="검색창"]')).click();
            await driver.wait(until.elementLocated(By.className('sc-8tmsfl-0 gQVxzD search-home-popular-wrap')), 10000);
            // 인기검색어
            const popularElements = await driver.findElements(By.className('sc-8tmsfl-0 gQVxzD search-home-popular-wrap'));

            const now = this.createKSTData();
            function convertToISODate(mdHmStr) {
                // 예: "07.16 19:00, 기준" → "07.16 19:00"
                const mdHm = mdHmStr.split(', ')[0];
                const [md, hm] = mdHm.split(' '); // md: "07.16", hm: "19:00"
                const [month, day] = md.split('.').map(Number);
                const [hour, minute] = hm.split(':').map(Number);

                let date = new Date();
                const kstDate = new Date(date.getTime() + (9 * 60 * 60 * 1000)); // KST is UTC+9
                const year = kstDate.getFullYear();

                // padStart로 2자리 보장
                const mm = String(month).padStart(2, '0');
                const dd = String(day).padStart(2, '0');
                const hh = String(hour).padStart(2, '0');
                const min = String(minute).padStart(2, '0');

                return `${year}-${mm}-${dd} ${hh}:${min}`;
            }
            await driver.wait(until.elementLocated(By.xpath('//*[@class="text-body_13px_reg text-gray-600 font-pretendard"]')), 10000);
            
            let popularTimesString = await popularElements[0].findElement(By.xpath('//*[@class="text-body_13px_reg text-gray-600 font-pretendard"]')).getAttribute('textContent')
            let popularTimestamp = convertToISODate(popularTimesString);
            // 리스트 배열
            let liList = await popularElements[0].findElements(By.css('li'));
            const keywordList = []; // 통합 배열
            // const popularList = []
            for (let i=0; i<liList.length; i++) {
                keywordList.push({
                    "keyword": await liList[i].getText(),
                    "rank": i + 1,
                    "timestamp": popularTimestamp,
                    "type" : "인기"
                });
            }

            // 급상승검색어

            const risingElements = await driver.findElements(By.className('sc-e1rvdc-0 gZkExN search-home-rising'));
            await driver.wait(until.elementLocated(By.className('text-body_13px_reg text-gray-600 font-pretendard')), 10000);
            let risingTimesString = await risingElements[0].findElement(By.xpath('//*[@class="text-body_13px_reg text-gray-600 font-pretendard"]')).getAttribute('textContent')
            let risingTimestamp = convertToISODate(risingTimesString);

            liList = await risingElements[0].findElements(By.css('li'));
            // const risingList = [];
            for (let i=0; i<liList.length; i++) {
                keywordList.push({
                    "keyword": await liList[i].getText(),
                    "rank": i + 1,
                    "timestamp": risingTimestamp,
                    "type" : "급상승"
                });
            }
            return { keywordList };


        } catch (err) {
            console.error('Error during crawling:', err);
            throw err;
        }
    }

    getNewRankingFromMusinsa = async () => {
        let driver = await new Builder().forBrowser('chrome').setChromeOptions(this.options).build();  
        try {
            // new ranking page
            await driver.get('https://www.musinsa.com/main/musinsa/ranking?storeCode=musinsa&sectionId=200&contentsId=&categoryCode=000');
            await driver.wait(until.elementLocated(By.css('article')), 10000);
            
            // scroll down until rank 200
            const container = await driver.findElement(By.css('article'));
            let found = false;
            let targetText = null;
            let maxScrolls = 10; // 무한루프 방지
            let kstDate = this.createKSTData();
            let timestamp = kstDate.toISOString().slice(0, 19).replace('T', ' ');


            for (let i = 0; i < maxScrolls; i++) {
                const elements = await container.findElements(By.xpath('//*[@class="text-etc_11px_semibold text-black font-pretendard"]'));

                    const text = await elements[elements.length - 1].getText();
                    if (Number(text) >= 200) {
                        found = true;
                        targetText = text;
                        break
                    } else {
                        console.log('scroll down');
                    }
                // PageDown 키 입력
                for (let j = 0; j < 5; j++) {
                await driver.actions().sendKeys('\uE00F').perform(); // '\uE00F'는 Keys.PAGE_DOWN
                }
                await driver.sleep(300); // 페이지가 로드될 시간을 주기 위해 잠시 대기
            }
            if(!found) {
                console.log('조건에 맞는 요소를 찾지 못했습니다.');
                throw new Error('failed to find rank 200');
            }

            //rank 1-200까지 data 수집
            const itemElements = await driver.findElements(By.css('div[class*="sc-1t5ihy5-0"]'));
            let items = [];
            for (let i = 0; i < 200; i++) {
                items.push({
                    "rank": await itemElements[i].findElement(By.className('text-etc_11px_semibold text-black font-pretendard')).getText(),
                    "brand": await itemElements[i].findElement(By.xpath('./div[2]/div[1]/a[1]/p')).getText(),
                    "name": await itemElements[i].findElement(By.xpath('./div[2]/div[1]/a[2]/p')).getText(),
                    "itemId": await itemElements[i].getAttribute('data-item-id'),
                    "type": "newRanking",
                    "timestamp": timestamp
                });
            }
            return {items}
        } catch (err) {
            console.error('Error during crawling:', err);
            throw err;
        } finally {
            await driver.quit();
        }
    }

    getTotalRankingFromMusinsa = async () => {
        let driver = await new Builder().forBrowser('chrome').setChromeOptions(this.options).build();  
        try {
            // new ranking page
            await driver.get('https://www.musinsa.com/main/musinsa/ranking?storeCode=musinsa&sectionId=199');
            
            await driver.wait(until.elementLocated(By.css('article')), 10000);
            
            // scroll down until rank 200
            const container = await driver.findElement(By.css('article'));
            let found = false;
            let targetText = null;
            let maxScrolls = 10; // 무한루프 방지

            let kstDate = this.createKSTData();
            let timestamp = kstDate.toISOString().slice(0, 19).replace('T', ' ');

            for (let i = 0; i < maxScrolls; i++) {
                const elements = await container.findElements(By.xpath('//*[@class="text-etc_11px_semibold text-black font-pretendard"]'));

                    const text = await elements[elements.length - 1].getText();
                    if (Number(text) >= 200) {
                        found = true;
                        targetText = text;
                        break
                    } else {
                        console.log('scroll down');
                    }
                // PageDown 키 입력
                for (let j = 0; j < 5; j++) {
                await driver.actions().sendKeys('\uE00F').perform(); // '\uE00F'는 Keys.PAGE_DOWN
                }
                await driver.sleep(300); // 페이지가 로드될 시간을 주기 위해 잠시 대기
            }
            if(!found) {
                console.log('조건에 맞는 요소를 찾지 못했습니다.');
                throw new Error('failed to find rank 200');
            }

            //rank 1-200까지 data 수집
            const itemElements = await driver.findElements(By.css('div[class*="sc-1t5ihy5-0"]'));
            let items = [];
            for (let i = 0; i < 200; i++) {
                items.push({
                    "rank": await itemElements[i].findElement(By.className('text-etc_11px_semibold text-black font-pretendard')).getText(),
                    "brand": await itemElements[i].findElement(By.xpath('./div[2]/div[1]/a[1]/p')).getText(),
                    "name": await itemElements[i].findElement(By.xpath('./div[2]/div[1]/a[2]/p')).getText(),
                    "itemId": await itemElements[i].getAttribute('data-item-id'),
                    "type": "totalRanking",
                    "timestamp": timestamp
                });
            }
            return {items}
        } catch (err) {
            console.error('Error during crawling:', err);
            throw err;
        }finally {
            await driver.quit();
        }
    }

    getSearchResultFromMusinsa = async (keyword) => {
        let driver = await new Builder().forBrowser('chrome').setChromeOptions(this.options).build();
        try {
            // 무신사 추천순
            await driver.get(`https://www.musinsa.com/search/goods?keyword=${keyword}&keywordStatus=correction&sortCode=POPULAR`);
            //첫 번째 상품 대기
            await driver.wait(until.elementLocated(By.className('sc-igtioI eSJwIO')), 10000);

            let upperElement, itemColumns, topColumnIndex, bottomColumnIndex, itemColumn
            let maxScrolls = 60 // 무한루프 방지
            let itemData = [];
            let kstDate = this.createKSTData();
            const timestamp = kstDate.toISOString().slice(0, 19).replace('T', ' ')
            for (let i = 0; i < maxScrolls; i++) {
                upperElement = await driver.findElement(By.css('[data-testid="virtuoso-item-list"]'));
                itemColumns = await upperElement.findElements(By.css('[style="overflow-anchor: none;"]'));
                topColumnIndex = await itemColumns[0].getAttribute('data-item-index');
                bottomColumnIndex = await itemColumns[itemColumns.length - 1].getAttribute('data-item-index');

            
            let itemIndex, itemBrand, itemName, itemId
            
           
            let itemElements;
            for (let j = 0; j < Number(bottomColumnIndex)-Number(topColumnIndex)+1; j++) {
                itemElements = await itemColumns[j].findElements(By.className('sc-igtioI eSJwIO'));
                let previousItemCount = itemData.length; // 이전 아이템 개수 저장
                for (let k = 0; k < itemElements.length; k++) {
                    itemIndex = previousItemCount + k
                    itemBrand = await itemElements[k].findElement(By.xpath('.//div[2]/div/div[1]/a[1]/span')).getText();
                    itemName = await itemElements[k].findElement(By.xpath('.//div[2]/div/div[1]/a[2]/span')).getText();
                    itemId = await itemElements[k].findElement(By.xpath('.//div[2]/div/div[1]/a[2]')).getAttribute('data-item-id');
                    if(!itemData.some(item => item.itemId === itemId) && itemData.length < 200) {
                        itemData.push({ index : itemIndex, brand : itemBrand, name : itemName, itemId, keyword, timestamp });
                    }
                }
            }
            if(itemData.length == 200) {
                console.log('200개 아이템 수집 완료 :' +  keyword) ;
                break;
            }else{await driver.executeScript(`arguments[0].scrollIntoView();`, itemColumns[itemColumns.length - 1]);
            await driver.wait(until.elementLocated(By.css(`[data-item-index="${Number(bottomColumnIndex)+1}"]`)), 10000);
            console.log('스크롤 다운');}
            
            
            
        }
             return { itemData };
        } catch (err) {
            console.error('Error during crawling:', err);
            throw err;
        } finally {
            await driver.quit();
        }
    }
    getBrandedTrendedArticles = async () => {
        let driver = await new Builder().forBrowser('chrome').setChromeOptions(this.options).build();
        try {
            await driver.get('https://cafe.naver.com/ca-fe/cafes/27877258/popular');
            await driver.wait(until.elementLocated(By.className('article')), 10000);
            console.log('네이버 카페 페이지 로드 완료');
            const articleBoardElement = await driver.findElement(By.className('article-board'));
            const trs = await articleBoardElement.findElements(By.xpath('//div[@class="article-board"]//table//tbody/tr'));
            let link, articleId, articleIndex, title, commentCount, viewCountRaw, viewCount;

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
                articleList.push({ articleId, articleIndex, title, commentCount, viewCount, timestamp });
            }
            return { articleList };
        } catch (err) {
            console.error('Error during Naver login:', err);
            throw err;
        } finally {
            await driver.quit();
        }
    
    }
}

module.exports = SeleniumCrawler;
