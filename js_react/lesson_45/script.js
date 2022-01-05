'use strict'
// function User(name, id) {
// 	this.name = name;
// 	this.id = id;
// 	this.human = true;
// }

// User.prototype.exit = function(name) {
// 	console.log(`${this.name} exit`)
// }

// const ivan = new User ('Ivan', 28);
// const alex = new User ('alex', 27);

// console.log(ivan)
// console.log(alex)
// ivan.exit();

// function sayName(surname) {
// 	console.log(this);
// 	console.log(this.name + surname )
// }
// const user = {
// 	name: 'Ivan'
// }
// sayName.call(user, 'ivanovich')
// sayName.apply(user, ['fefef'])

// function count (num) {
// 	return this*num
// }
// const double = count.bind(2)
// console.log(double(3))
// console.log(double(8))


class Rect {
	constructor(h,w){
		this.h = h;
		this.w = w;
	}
	calcArea() {
		return this.h * this.w;
	}
}
const square = new Rect(10, 20);
console.log(square.calcArea())

class Colored extends Rect {
	constructor(h,w, text, bg){
		super(h,w); // копирование у родителя, всегда на 1 месте
		this.text = text;
		this.bg = bg;
	}
	showMyProps() {
		console.log(`Text:  ${this.text}, Color: ${this.bg} and ${this.h} `)
	}
}
const div = new Colored (10, 10, 'fdfdfdf', 'red');

div.showMyProps();
console.log(div.calcArea())