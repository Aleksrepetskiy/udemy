window.addEventListener("DOMContentLoaded", () => {
    //TABS
    const tabContents = document.querySelectorAll(".tabcontent"),
        tabsList = document.querySelector(".tabheader__items"),
        tabs = tabsList.querySelectorAll(".tabheader__item");

    function hideTabContents() {
        tabContents.forEach((item) => {
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
		const modalTimer = setTimeout(openModal, 100000);
	function openModal() {
		modal.classList.toggle("show");
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
    modalClose.addEventListener("click", closeModal);
    modal.addEventListener("click", (e) => {
        if (e.target === modal) {
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

	new MenuCard ("img/tabs/vegy.jpg", "vegy", 'Меню "Фитнес"', 'Меню "Фитнес" - это новый подход к приготовлению блюд: больше свежих овощей и фруктов. Продукт активных и здоровых людей. Это абсолютно новый продукт с оптимальной ценой и высоким качеством!', '50', '.menu .container', 'menu__item', 'big').render();
	new MenuCard ("img/tabs/elite.jpg", "elite", 'Меню “Премиум”', 'В меню “Премиум” мы используем не только красивый дизайн упаковки, но и качественное исполнение блюд. Красная рыба, морепродукты, фрукты - ресторанное меню без похода в ресторан!', '10', '.menu .container', 'menu__item').render();
	new MenuCard ("img/tabs/post.jpg", "post", 'Меню "Постное"', 'Меню “Постное” - это тщательный подбор ингредиентов: полное отсутствие продуктов животного происхождения, молоко из миндаля, овса, кокоса или гречки, правильное количество белков за счет тофу и импортных вегетарианских стейков.', '2', '.menu .container').render();

	//FORMS

	const forms = document.querySelectorAll('form');
	const message = {
		loading: 'loading...',
		sucess: 'shanks',
		failure: 'error'
	}
	forms.forEach(item => {
		postData(item);
	})


	function postData (form) {
		form.addEventListener('submit', function(e) {
			e.preventDefault();

			const statusMessage = document.createElement('div');
			statusMessage.classList.add('status');
			statusMessage.textContent = message.loading;
			form.append(statusMessage);

			const request = new XMLHttpRequest();
			request.open('POST', 'server.php');
			request.setRequestHeader('Content-type', 'application/json; charset=utf-8');
			const formDate = new FormData(form);
			const obj = {};
			formDate.forEach((value, key)=>{
				obj[key] = value;
			})
			const json = JSON.stringify(obj)
			request.send(json);

			request.addEventListener('load', ()=>{
				if (request.status === 200) {
					console.log(request.response);
					statusMessage.textContent = message.sucess;
					form.reset();
					setTimeout(()=>{
						statusMessage.remove();
					}, 2000)
				}else {
					statusMessage.textContent = message.error;
				}
			})
		})
	}
    setClock(".timer", deadline);
    hideTabContents();
    showTabContent();
});
