const moment = require('moment');

const now = moment();

console.log(now);


const birthday = moment('03/06/1996' , 'DD/MM/YYYY');
console.log(birthday);

const jesus = now.diff(birthday,'days');
const result = `Desde mi nacimiento han pasado ${jesus} dias.`
console.log(result);