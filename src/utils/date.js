class dateUtils
{
    getKSTDateString() {
    const today = new Date().toLocaleDateString("ja-JP");

    return today;
}
getLatestMonday() {
    const today = new Date();
    const day = today.getDay(); // 0=일요일, 1=월요일, 2=화요일, ..., 6=토요일
    
    let diff;
    if (day === 1) {
        // 월요일이면 지난주 월요일 (7일 전)
        diff = today.getDate() - 7;
    } else {
        // 화~일요일이면 그 주 월요일
        diff = today.getDate() - day + (day === 0 ? -6 : 1);
    }
    
    const targetMonday = new Date(today.setDate(diff));
    return targetMonday.toLocaleDateString("ja-JP");
}
getTodayDateObject(){
    const todayString = this.getKSTDateString();
    const todayDateObject = new Date(todayString);
    return todayDateObject;
}
getAWeekAgoDateObject(){
    const todayString = this.getKSTDateString();
    const todayDateObject = new Date(todayString);
    todayDateObject.setDate(todayDateObject.getDate() - 7);
    return todayDateObject;
}

// ISO 주차 번호 가져오기 (ISO 8601 표준)
getISOWeekNumber(date = new Date()) {
    const d = new Date(date);
    d.setHours(0, 0, 0, 0);
    
    // 목요일을 기준으로 계산 (ISO 8601 표준)
    d.setDate(d.getDate() + 3 - (d.getDay() + 6) % 7);
    
    // 1월 4일이 있는 주가 첫 번째 주
    const week1 = new Date(d.getFullYear(), 0, 4);
    
    // 주차 계산
    return 1 + Math.round(((d.getTime() - week1.getTime()) / 86400000 - 3 + (week1.getDay() + 6) % 7) / 7);
}

// 현재 주차 번호 가져오기
getCurrentWeekNumber() {
    return this.getISOWeekNumber(new Date());
}

// 특정 날짜의 주차 번호 가져오기
getWeekNumberFromString(dateString) {
    const date = new Date(dateString);
    return this.getISOWeekNumber(date);
}

// 연도와 주차로 해당 주의 월요일 구하기
getMondayOfWeek(year, weekNumber) {
    const jan4 = new Date(year, 0, 4);
    const jan4Day = jan4.getDay() || 7; // 일요일을 7로 변환
    
    // 첫 번째 주의 월요일
    const firstMonday = new Date(jan4);
    firstMonday.setDate(jan4.getDate() - jan4Day + 1);
    
    // 지정된 주차의 월요일
    const targetMonday = new Date(firstMonday);
    targetMonday.setDate(firstMonday.getDate() + (weekNumber - 1) * 7);
    
    return targetMonday;
}

// 주차별 기간 구하기 (월요일~일요일)
getWeekRange(year, weekNumber) {
    const monday = this.getMondayOfWeek(year, weekNumber);
    const sunday = new Date(monday);
    sunday.setDate(monday.getDate() + 6);
    
    return {
        start: monday,
        end: sunday,
        startString: monday.toLocaleDateString("ja-JP"),
        endString: sunday.toLocaleDateString("ja-JP")
    };
}
}
module.exports = dateUtils