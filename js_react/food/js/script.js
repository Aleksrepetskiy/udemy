window.addEventListener("DOMContentLoaded", () => {
    //TABS
    const tabContents = document.querySelectorAll(".tabcontent"),
        tabsList = document.querySelector(".tabheader__items"),
        tabs = tabsList.querySelectorAll(".tabheader__item");

    function hideTabContents() {
        tabContents.forEach((item) => {
            //item.style.display = "none"
            //item.style.display = "none"
            item.classList.add("hide");
            item.classList.remove("show", "fade");
        });
        tabs.forEach((item) => {
            item.classList.remove("tabheader__item_active");
        });
    }
    function showTabContent(position = 0) {
        // tabContents[position].style.display = "block";
        tabContents[position].classList.add("show", "fade");
        tabContents[position].classList.remove("hide");
        tabs[position].classList.add("tabheader__item_active");
    }
    tabsList.addEventListener("click", function (e) {
        const target = e.target;
        if (target.classList.contains("tabheader__item")) {
            tabs.forEach((item, num) => {
                if (item == target) {
                    hideTabContents();
                    showTabContent(num);
                }
            });
        }
    });

    //TIMER

    const deadline = "2021-12-26";
    function getTimeRemaining(endtime) {
        const t = Date.parse(endtime) - Date.parse(new Date()),
            days = Math.floor(t / (1000 * 60 * 60 * 24)),
            hours = Math.floor((t / (1000 * 60 * 60)) % 24),
            minutes = Math.floor((t / (1000 * 60)) % 60),
            seconds = Math.floor((t / 1000) % 60);
        return {
            total: t,
            days,
            hours,
            minutes,
            seconds,
        };
    }
    function getZero(num) {
        if (num >= 0 && num < 10) {
            return `0${num}`;
        } else {
            return num;
        }
    }
    function setClock(selector, endtime) {
        const timer = document.querySelector(selector),
            days = timer.querySelector("#days"),
            hours = timer.querySelector("#hours"),
            minutes = timer.querySelector("#minutes"),
            seconds = timer.querySelector("#seconds"),
            timeInterval = setInterval(updateClock, 1000);
        updateClock();
        function updateClock() {
            const t = getTimeRemaining(endtime);
            days.innerHTML = getZero(t.days);
            hours.innerHTML = getZero(t.hours);
            minutes.innerHTML = getZero(t.minutes);
            seconds.innerHTML = getZero(t.seconds);
            if (t.total <= 0) {
                clearInterval(timeInterval);
            }
        }
    }

    //MODAL
    const modal = document.querySelector(".modal"),
        modalBtn = document.querySelectorAll("[data-modal]"),
        modalClose = modal.querySelector("[data-close]");
		const modalTimer = setTimeout(openModal, 500000000);
	function openModal() {
		modal.classList.add("show");
		document.body.style.overflow = "hidden";
		clearInterval(modalTimer);
	}
    modalBtn.forEach((btn) => {
        btn.addEventListener("click", openModal);
    });

    function closeModal() {
        modal.classList.remove("show");
        document.body.style.overflow = "";
    }
    modal.addEventListener("click", (e) => {
        if (e.target === modal || e.target.getAttribute('data-close') == '') {
            closeModal();
        }
    });
    document.addEventListener("keydown", (e) => {
        if (e.code === "Escape") {
            closeModal();
        }
    });
	function showModalByScroll () {
		if(window.pageYOffset + document.documentElement.clientHeight >= document.documentElement.scrollHeight) {
			openModal();
			window.removeEventListener('scroll', showModalByScroll);
		}
	}
	window.addEventListener('scroll', showModalByScroll);

	//Card классы

	class MenuCard {
		constructor (img,alt, title, descr, total, parentSelector, ...classes){
			this.img = img;
			this.alt = alt;
			this.title = title;
			this.descr = descr;
			this.total = total;
			this.classes = classes;
			this.parent = document.querySelector(parentSelector);
			this.transfer = 28;
			this.chengeToUAN();
		}
		chengeToUAN(){
			this.total =  this.total * this.transfer;
		}
		render() {
			const element = document.createElement('div');
			if(this.classes.length === 0){
				this.classes.push('menu__item')
			}
			this.classes.forEach(className => element.classList.add(className))
			element.innerHTML = `
				<img src=${this.img} alt=${this.alt}>
				<h3 class="menu__item-subtitle">${this.title}</h3>
				<div class="menu__item-descr">${this.descr}</div>
				<div class="menu__item-divider"></div>
				<div class="menu__item-price">
					<div class="menu__item-cost">Цена:</div>
					<div class="menu__item-total"><span>${this.total}</span> грн/день</div>
				</div>
			`;
			this.parent.append(element);
		}
	}

	const getResourse = async (url) => {
		const res = await fetch(url);
		if(!res.ok) {
			throw new Error(`Could not fetchcto ${url} status promise ${res.status}`)
		}
		return await res.json();
	}
	getResourse('http://localhost:3000/menu')
		.then((data)=>{
			data.forEach(({img, altimg, title, descr, price})=>{
				new MenuCard(img, altimg, title, descr, price,'.menu .container').render();
			})
		})

	//FORMS
	const forms = document.querySelectorAll('form');
	const message = {
		loading: 'img/spinner.svg',
		sucess: 'Спасибо мы с вами свяжемся',
		failure: 'error'
	}
	forms.forEach(item => {
		bindPostData(item);
	})

	const postData = async (url, data) => {
		const res = await fetch(url, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: data
		});
		return await res.json();
	}

	//Старая техника AjAX
	// function postData (form) {
	// 	form.addEventListener('submit', function(e) {
	// 		e.preventDefault();

	// 		const statusMessage = document.createElement('img');
	// 		statusMessage.src = message.loading;
	// 		statusMessage.style.cssText = `
	// 			display: block;
	// 			margin: 0 auto;
	// 		`
	// 		form.insertAdjacentElement('afterend', statusMessage);

	// 		const request = new XMLHttpRequest();
	// 		request.open('POST', 'server.php');
	// 		request.setRequestHeader('Content-type', 'application/json; charset=utf-8');
	// 		const formDate = new FormData(form);
	// 		const obj = {};
	// 		formDate.forEach((value, key)=>{
	// 			obj[key] = value;
	// 		})
	// 		const json = JSON.stringify(obj)
	// 		request.send(json);

	// 		request.addEventListener('load', ()=>{
	// 			if (request.status === 200) {
	// 				console.log(request.response);
	// 				form.reset();
	// 				statusMessage.remove();
	// 				showModalFidback(message.sucess);
	// 			}else {
	// 				showModalFidback(message.error);
	// 			}
	// 		})
	// 	})
	// }

	//вызов AJAX через FETCH API
	function bindPostData (form) {
		form.addEventListener('submit', function(e) {
			e.preventDefault();

			const statusMessage = document.createElement('img');
			statusMessage.src = message.loading;
			statusMessage.style.cssText = `
				display: block;
				margin: 0 auto;
			`
			form.insertAdjacentElement('afterend', statusMessage);

			const formDate = new FormData(form);
			const json = JSON.stringify(Object.fromEntries(formDate.entries()))
			// const obj = {};
			// formDate.forEach((value, key)=>{
			// 	obj[key] = value;
			// })

			postData('http://localhost:3000/requests', json)
			.then((data) => {
				console.log(data);
				statusMessage.remove();
				showModalFidback(message.sucess);
			})
			.catch(()=>{
				showModalFidback(message.failure);
			})
			.finally(()=>{
				form.reset();
			})
		})
	}
	function showModalFidback (message) {
		const prevModalDialog = document.querySelector('.modal__dialog');
		prevModalDialog.classList.add('hide');
		openModal();
		const modalFidback = document.createElement('div');
		modalFidback.classList.add('modal__dialog');
		modalFidback.innerHTML = `
			<div class="modal__content">
                    <div class="modal__close" data-close>&times;</div>
                    <div class="modal__title">${message}</div>
            </div>

		`
		document.querySelector('.modal').append(modalFidback);
		setTimeout(()=>{
			prevModalDialog.classList.remove('hide');
			modalFidback.remove();
			closeModal()
		}, 5000)
	}

	//Slider

	const nextBtn = document.querySelector('.offer__slider-next'),
		prevBtn = document.querySelector('.offer__slider-prev'),
		slides = document.querySelectorAll('.offer__slide'),
		total = document.querySelector('#total'),
		current = document.querySelector('#current'),
		sliderWrapper = document.querySelector('.offer__slider-wrapper'),
		sliderInner = document.querySelector('.offer__slider-inner'),
		offerSlider = document.querySelector('.offer__slider'),
		sliderWidth = window.getComputedStyle(sliderWrapper).width,
		sliderDotsBox = document.createElement('ul'),
		arrDots = [];
	let slideIndex = 1;
	let slideOffset = 0;

	function replaceWidth(width) {
		return +width.replace(/[^\d.]/g, '')
	}

	if(slides.length < 10) {
		total.textContent = `0${slides.length}`;
		current.textContent = `0${slideIndex}`;
	}else {
		total.textContent = slides.length;
		current.textContent = slideIndex;
	}
	sliderInner.style.width = 100 * slides.length   + '%';
	sliderInner.style.display = 'flex';
	sliderInner.style.transition = 'all 0.5s';
	sliderWrapper.style.overflow = 'hidden';
	slides.forEach(item => {
		item.style.width = sliderWidth;
	})

	offerSlider.style.position = 'relative';

	sliderDotsBox.classList.add('carousel-indicators');
	sliderDotsBox.style = `
		position: absolute;
		right: 0;
		bottom: 0;
		left: 0;
		z-index: 15;
		display: flex;
		justify-content: center;
		margin-right: 15%;
		margin-left: 15%;
		list-style: none;
	`;

	for (let index = 1; index <= slides.length; index++) {
		const sliderDot = document.createElement('li');
		sliderDot.setAttribute('data-slide-to', index);
		sliderDot.classList.add('dot');
		sliderDot.style.cssText = `
			box-sizing: content-box;
			flex: 0 1 auto;
			width: 30px;
			height: 6px;
			margin-right: 3px;
			margin-left: 3px;
			cursor: pointer;
			background-color: #fff;
			background-clip: padding-box;
			border-top: 10px solid transparent;
			border-bottom: 10px solid transparent;
			opacity: .5;
			transition: opacity .6s ease;
		`;
		if (index == 1) {
			sliderDot.style.opacity = '1';
		}
		sliderDotsBox.append(sliderDot);
		arrDots.push(sliderDot);
	}
	offerSlider.append(sliderDotsBox);

	function  sliderArrDotsActive() {
		arrDots.forEach(dot => dot.style.opacity = '0.5');
		arrDots[slideIndex-1].style.opacity = '1';
	}
	function  slideIndexNum() {
		if(slides.length < 10) {
			current.textContent = `0${slideIndex}`;
		}else {
			current.textContent = slideIndex;
		}
	}

	nextBtn.addEventListener('click', ()=> {
		if(slideOffset ==  replaceWidth(sliderWidth) * (slides.length -1) ){
			slideOffset = 0;
		} else {
			slideOffset += replaceWidth(sliderWidth);
		}
		sliderInner.style.transform = `translateX(-${slideOffset}px)`;
		if(slideIndex == slides.length) {
			slideIndex = 1;
		}else {
			slideIndex++;
		}
		slideIndexNum();
		sliderArrDotsActive();

	})
	prevBtn.addEventListener('click', ()=> {
		if(slideOffset ==  0 ){
			slideOffset = replaceWidth(sliderWidth) * (slides.length -1);
		} else {
			slideOffset -= replaceWidth(sliderWidth);
		}
		sliderInner.style.transform = `translateX(-${slideOffset}px)`;
		if(slideIndex == 1) {
			slideIndex = slides.length;
		}else {
			slideIndex--;
		}
		slideIndexNum()
		sliderArrDotsActive()
	})

	arrDots.forEach((dot) => {
		dot.addEventListener('click', function(e){
			const slideTo = e.target.getAttribute('data-slide-to');
			slideIndex = slideTo;
			slideOffset = replaceWidth(sliderWidth) * (slideTo - 1);
			sliderInner.style.transform = `translateX(-${slideOffset}px)`;
			slideIndexNum();
			sliderArrDotsActive();

		})

	})

	// showSlides(slideIndex);

	// if(slides.length < 10) {
	// 	total.textContent = `0${slides.length}`;
	// }else {
	// 	total.textContent = slides.length;
	// }

	// function showSlides(n) {
	// 	if(n > slides.length) {
	// 		slideIndex = 1;
	// 	}
	// 	if(n < 1) {
	// 		slideIndex = slides.length;
	// 	}
	// 	if(slides.length < 10) {
	// 		current.textContent = `0${slideIndex}`;
	// 	}else {
	// 		current.textContent = slideIndex;
	// 	}
	// 	slides.forEach((item)=> item.style.display = 'none');
	// 	slides[slideIndex - 1].style.display = 'block';
	// }
	// function rotateSlide (n) {
	// 	showSlides(slideIndex += n);
	// }
	// prevBtn.addEventListener('click', ()=> {
	// 	rotateSlide(-1);
	// })
	// nextBtn.addEventListener('click', ()=> {
	// 	rotateSlide(1)
	// })

    setClock(".timer", deadline);
    hideTabContents();
    showTabContent();

	fetch('db.json')
	.then(data => data.json())
	.then(res => console.log(res));

	//Calculator

	let resultCalc = document.querySelector('.calculating__result span');
	let sex, height, weight, age, ratio;

	if(localStorage.getItem('sex')) {
		sex = localStorage.getItem('sex');
	}else {
		localStorage.setItem('sex', 'female');
		sex = 'female';
	}

	if(localStorage.getItem('ratio')) {
		ratio = +localStorage.getItem('ratio');
	}else {
		localStorage.setItem('ratio', '1.375');
		ratio = 1.375
	}

	function initLocalSettings(parentSelector, activeClass) {
		const elements = document.querySelectorAll(parentSelector);
		elements.forEach(item => {
			console.log(item);
			item.classList.remove(activeClass);
			if(item.getAttribute('id') === localStorage.getItem('sex')) {
				item.classList.add(activeClass);
			}
			if(item.getAttribute('data-ratio') === localStorage.getItem('ratio')) {
				item.classList.add(activeClass);
			}
		})
	}
	initLocalSettings('#gender div', 'calculating__choose-item_active');
	initLocalSettings('.calculating__choose_big div', 'calculating__choose-item_active');

	function calcTotal() {
		if (!sex||!height||!weight||!age||!ratio) {
			resultCalc.textContent = '___';
			return;
		}
		if(sex === 'male') {
			resultCalc.textContent = Math.round(ratio*(88.36 + (13.4 * weight) + (4.8 * height)-(5.7 * age)));

		}
		if(sex === 'female') {
			resultCalc.textContent = Math.round(ratio*(447.6 + (9.2*weight) + (3.1 *height)-(4.3*age)));
		}

	};
	calcTotal();

	function getStaticInfo(parentSelector, activeClass) {
		const elements = document.querySelectorAll(`${parentSelector} div`);
		elements.forEach( elem => {
			elem.addEventListener('click', (e) => {
				if(e.target.getAttribute('data-ratio')) {
					ratio = +e.target.getAttribute('data-ratio');
					localStorage.setItem('ratio', +e.target.getAttribute('data-ratio'));
				}else {
					sex = e.target.getAttribute('id');
					localStorage.setItem('sex', e.target.getAttribute('id'));
				}
				elements.forEach(item => {
					item.classList.remove(activeClass);
				})
				e.target.classList.add(activeClass);
				calcTotal();

			})
		})

		// if(target.matches('[data-ratio]')) {
		// 	ratio = target.dataset.ratio;
		// 	elements.forEach(item => item.classList.remove(activeClass));
		// 	target.classList.add(activeClass);
		// }
	}
	getStaticInfo('#gender', 'calculating__choose-item_active');
	getStaticInfo('.calculating__choose_big', 'calculating__choose-item_active');
	function getDinamicInfo (selector) {
		const input = document.querySelector(selector);
		input.addEventListener('input', () => {
			if(input.value.match(/\D/g)) {
				input.style.border = '1px solid red';
			}else {
				input.style.border = 'none';
			}
			switch(input.getAttribute('id')) {
				case 'height':
					height = +input.value;
					break;
				case 'weight':
					weight = +input.value;
					break;
				case 'age':
					age = +input.value;
					break;
			}
			calcTotal();
		});
	}
	getDinamicInfo('#height');
	getDinamicInfo('#weight');
	getDinamicInfo('#age');


});
