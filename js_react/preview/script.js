const btn = document.querySelector('#btn');
const overlay = document.querySelector('.overlay');

const deleteElem = function(event){
	//console.log(event.target);
	console.log(event.currentTarget);
	console.log(event.type);

}

btn.addEventListener('click', deleteElem);
overlay.addEventListener('click', deleteElem);

console.log(document.querySelector('#btn').parentNode)
console.log(document.querySelector('[data-current="3"]'))

// const deleteElem = function(event){
// 	console.log(event.target);
// 	event.target.remove();
// }

// btn.addEventListener('click', deleteElem);

// btn.removeEventListener('click', deleteElem);
// btn.addEventListener('mouseenter', function(event){
// 	console.log(event);
// })