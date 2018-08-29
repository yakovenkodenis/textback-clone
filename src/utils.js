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

export const formatDate = date => {
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();

    if ((new Date(date)).setHours(0,0,0,0) === (new Date()).setHours(0,0,0,0)) { // the date is today

        const hours = date.getHours();
        const minutes = date.getMinutes();
        const seconds = date.getSeconds();

        return `${hours}:${minutes}:${seconds}`;

    } else return `${day}.${month}.${year}`;
}

export const datediff = (fromDate, toDate, shorter=false) => {
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

    if (
        diffDate.years === 0
        && diffDate.months === 0
        && diffDate.days === 0
        && diffDate.hours === 0
        && diffDate.minutes === 0
        && diffDate.seconds <= 59
    ) {
        return 'Только что';
    } else if (
        diffDate.years === 0
        && diffDate.months === 0
        && diffDate.days === 0
        && diffDate.hours === 0
        && diffDate.minutes <= 59
    ) {
        return `${diffDate.minutes} минут${shorter ? "" : " назад"}`;
    } else if (
        diffDate.years === 0
        && diffDate.months === 0
        && diffDate.days === 0
        && diffDate.hours < 24
    ) {
        return `${diffDate.hours} часов${shorter ? "" : " назад"}`;
    }

    return formatDate(fromDate);
}

export const capitalize = str =>
    str.charAt(0).toUpperCase() + str.slice(1);

export const generateVkOAuthLink = (groups_id, redirect_uri) =>
    `https://oauth.vk.com/authorize?client_id=6668833&display=page&redirect_uri=${redirect_uri}&scope=messages,photos,docs,manage&group_ids=${groups_id}&response_type=token&state=auth_vk&v=5.80`;


export const urlRegex = new RegExp("([a-zA-Z0-9]+://)?([a-zA-Z0-9_]+:[a-zA-Z0-9_]+@)?([a-zA-Z0-9.-]+\\.[A-Za-z]{2,4})(:[0-9]+)?([^ ])+", "gi");

export const stripURLSfromText = str =>
    str.match(urlRegex);

export const linkify = text =>
    text.replace(urlRegex, link => `<a href="${link}">${link}</a>`);


export const truncate = (msg, n, useWordBoundary) => {
    if (msg.length <= n) { return msg; }
    let subString = msg.substr(0, n - 1);
    return (useWordBoundary
        ? subString.substr(0, subString.lastIndexOf(' '))
        : subString
    ) + '...';
};
