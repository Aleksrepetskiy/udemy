const ans = 'Ana';

// flags
// i - вне зависимости от регистра
// g - поиск всех совпадений
// m - включение многострочного режима(с переносами)

const reg = /n/ig; // просто поиск буквы n с любым регистором все вхождения
console.log(ans.match(reg));
console.log(reg.test(ans)); // метод test возвращает булевое значение

const ans2 = 'Anavdkndkjnvd';

console.log(ans2.replace(/./g, '*'));
console.log("12-12-12".replace(/\-/g, ':'));

const ans3 = 'kdkdkd1278394';
console.log(ans3.match(/\d/ig));//поиск только цыфр

console.log('my name is R2D2'.match(/\w\d\w\d/ig));//поиск R2D2

console.log('my name is R2D2'.match(/\D/ig));//поиск всех не чисел
console.log('my name is R2D2'.match(/\W/ig));//поиск всех не букв
