const keywords = [
    {
        "month": "2025-07",
        "keywords": ["반소매 티셔츠","피케 티셔츠","카라 티셔츠","원피스","스커트","모자","숏 팬츠","메신저","크로스백","샌들","슬리퍼","수영복","비치웨어","프래그런스","선케어","셔츠","블라우스","청바지","데님 팬츠","스킨케어","나시","민소매 티셔츠","속옷","홈웨어","레인부츠"]
    },
    {
        "month": "2025-08",
        "keywords": ["반소매 티셔츠","피케 티셔츠","카라 티셔츠","백팩","모자","숏 팬츠","패션스니커즈화","샌들","슬리퍼","수영복","비치웨어","코튼 팬츠","선케어","셔츠","블라우스","청바지","데님 팬츠","스킨케어","나시","민소매 티셔츠","캐리어","숄더백"]
    }

]

const getMonthlyKeywords = (startDate, endDate) => {
    const today = new Date()
    if(!startDate){
        startDate = today
    }
    if(!endDate){
        endDate = today
    }
    startDate = new Date(startDate).toLocaleDateString('en-CA', {timeZone: 'Asia/Seoul', year: 'numeric', month: '2-digit', day: '2-digit' }).slice(0, 7);
    
    endDate = new Date(endDate).toLocaleDateString('en-CA', {timeZone: 'Asia/Seoul', year: 'numeric', month: '2-digit', day: '2-digit' }).slice(0, 7);
    

    const startMonthData = keywords.find(item => item.month === startDate)
    const endMonthData = keywords.find(item => item.month === endDate)

    const merged = Array.from(new Set([...startMonthData.keywords, ...endMonthData.keywords]));

    return merged;
};

module.exports = getMonthlyKeywords;