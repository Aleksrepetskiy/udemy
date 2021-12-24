'use strict';

const box = document.querySelector('.box');
const btn = document.querySelector('button')
const boxWidth = box.clientWidth;
const boxHeight = box.clientHeight;
const boxOfsetWidth = box.offsetWidth;
const boxOfsetHeight = box.offsetHeight;
const boxScrollWidth = box.scrollWidth;
const boxScrollHeight = box.scrollHeight;

console.log(boxWidth, boxHeight)
console.log(boxOfsetWidth, boxOfsetHeight)
console.log(boxScrollWidth, boxScrollHeight)

btn.addEventListener('click', function(){
	// box.style.height = box.scrollHeight + 'px'
	console.log(box.scrollTop)
})

console.log(box.getBoundingClientRect());
console.log(window.getComputedStyle(box));

document.documentElement.scrollTop = 0;