
class dateUtils
{
    getKSTDateString() {
    const today = new Date().toLocaleDateString({ timeZone: 'Asia/Seoul' });

    return today;
}
}