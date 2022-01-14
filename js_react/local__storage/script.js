'use strict';

// localStorage.setItem('checkbox', 'true') // установка
// localStorage.getItem('checkbox') // получение
// localStorage.removeItem('checkbox') // удаление елемента
// localStorage.clear() // очистка хранилища

const checkbox = document.querySelector('#checkbox');
const form = document.querySelector('.form-signin');
const btn = document.querySelector('#color');
console.log(localStorage.getItem('isChecked') == 'true');

if(localStorage.getItem('isChecked') == 'true') {
	checkbox.checked = true;
}
if (localStorage.getItem('bgColor') == 'chenged') {
	form.style.backgroundColor = 'red';
}
checkbox.addEventListener('change', function () {
	(this.checked)?localStorage.setItem('isChecked', 'true'):localStorage.removeItem('isChecked');
});

btn.addEventListener('click', ()=>{
	if (localStorage.getItem('bgColor') == 'chenged') {
		localStorage.removeItem('bgColor');
		form.style.backgroundColor = '';

	} else {
		localStorage.setItem('bgColor', 'chenged');
		form.style.backgroundColor = 'red';
	}
})
//закидывание обьекта в localStorage
const obj = {
	name: 'sasha',
	age: '25'
}
const serialaze = JSON.stringify(obj);
localStorage.setItem('alex', serialaze);

//парсинг обьекта из localStorage
console.log(JSON.parse(localStorage.getItem('alex')));
