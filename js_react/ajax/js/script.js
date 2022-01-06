'use strict'

const inputRub = document.querySelector('#rub');
const inputUsd = document.querySelector('#usd');

inputRub.addEventListener('input', function(){
	const request = new XMLHttpRequest();

	request.open('GET', 'js/current.json');
	request.setRequestHeader('Content-type', 'application/json; charset=utf-8');
	request.send();

	//следит за собитыем readyState
	// request.addEventListener('readystatechange', ()=>{
	// 	if (request.readyState === 4 && request.status === 200) {
	// 		console.log(request.response);
	// 		const date = JSON.parse(request.response);
	// 		inputUsd.value = (inputRub.value / date.current.usd).toFixed(2);
	// 	}else {
	// 		inputUsd.value = "some wrong";
	// 	}
	// })

	// используется чаще просто load
	request.addEventListener('load', ()=>{
		if (request.status === 200) {
			console.log(request.response);
			const date = JSON.parse(request.response);
			inputUsd.value = (inputRub.value / date.current.usd).toFixed(2);
		}else {
			inputUsd.value = "some wrong";
		}
	})



	//status (404, 200 ...more)
	//statusText (ok, not found ...more)
	//response (данные которые приходят с сервера например json)
	//readyState (0(create), 1(open), ... 4(done))
})