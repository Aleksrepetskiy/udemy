document.addEventListener('DOMContentLoaded', () => {
	const box = document.querySelector('.box');
	box.addEventListener('touchstart', (e)=>{
		e.preventDefault();
		console.log('start');
	})
	box.addEventListener('touchmove', (e)=>{
		e.preventDefault();
		console.log('move');
		console.log( )
	})
	box.addEventListener('touchend', (e)=>{
		e.preventDefault();
		console.log('end');
	})
})