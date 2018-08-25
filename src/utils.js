export const reactTableTextProps = {
    previousText: 'Назад',
    nextText: 'Дальше',
    loadingText: 'Загрузка...',
    noDataText: 'Данных нет',
    pageText: 'Страница',
    ofText: 'из',
    rowsText: 'строк'
};

export const unixtimeToDate = unixtime => new Date(unixtime * 1000);

export const datediff = (fromDate, toDate) => {
    if (!fromDate) throw new Error('Date should be specified');

    const startDate = new Date(1970, 0, 1, 0).getTime(),
        now = new Date(),
        toDate2 = toDate && toDate instanceof Date ? toDate : now,
        diff = toDate2 - fromDate,
        date = new Date(startDate + diff),
        years = date.getFullYear() - 1970,
        months = date.getMonth(),
        days = date.getDate() - 1,
        hours = date.getHours(),
        minutes = date.getMinutes(),
        seconds = date.getSeconds(),
        diffDate = {
            years: 0,
            months: 0,
            days: 0,
            hours: 0,
            minutes: 0,
            seconds: 0
        };
  
    if (years < 0) return diffDate;
    diffDate.years = years > 0 ? years : 0;
    diffDate.months = months > 0 ? months : 0;
    diffDate.days = days > 0 ? days : 0;
    diffDate.hours = hours > 0 ? hours : 0;
    diffDate.minutes = minutes > 0 ? minutes : 0;
    diffDate.seconds = seconds > 0 ? seconds : 0;

    // return diffDate;
    return `${diffDate.hours} часов назад`;
}  
