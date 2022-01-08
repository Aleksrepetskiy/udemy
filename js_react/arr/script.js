'use strict'


//filter
const arr = ['ivan', 'Ann', 'Ksenia', 'Voldemar'];

const shortNmames = arr.filter((name)=>{
	return name.length < 5;
});

console.log(shortNmames);

//map
const answer = ['ivadsdsn', 'dsdAnn', 'JDJDJDenia', 'DDDJJDJVoldemar'];
const answersMew = arr.map((item)=>{
	return item.toLowerCase();
});
console.log(answersMew);

//every/some

const some = [4, 'sds', 'dsdssd'];
console.log(some.some(item => typeof(item)=== 'number'))

//reduce

const num = [4, 5, 3 , 1, 6];
const result = num.reduce((sum, item)=>{
	return sum + item;
})
console.log(result)

const str = ['apple', 'lemon', 'blueberry'];
const fruit = str.reduce((sum, item) => {
	return `${sum}, ${item}`
})
console.log(fruit)

const newName = {
	ivan: 'person',
	anna: 'person',
	tom: 'animal',
	sharik: 'animal'
}
const newArray = Object.entries(newName) // переводим обьект в массив (матрицу)
console.log(newArray);
const b = newArray.filter(item=>item[1]==='person');
console.log(b);
const c = b.map(item => item[0])
console.log(c);