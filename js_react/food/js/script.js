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
			days = Math.floor(t/(1000*60*60*24)),
			hours = Math.floor((t/(1000*60*60))% 24),
			minutes = Math.floor((t/(1000*60))% 60),
			seconds = Math.floor((t/1000)%60);
		return {
			'total': t,
			days,
			hours,
			minutes,
			seconds
		}
    }
	function getZero(num) {
		if (num >= 0 && num < 10) {
			return `0${num}`
		}else {
			return num;
		}
	}
	function setClock(selector, endtime) {
		const timer = document.querySelector(selector),
			days = timer.querySelector('#days'),
			hours = timer.querySelector('#hours'),
			minutes = timer.querySelector('#minutes'),
			seconds = timer.querySelector('#seconds'),
			timeInterval = setInterval(updateClock, 1000);
			updateClock();
		function updateClock() {
			const t = getTimeRemaining(endtime);
			days.innerHTML = getZero(t.days);
			hours.innerHTML = getZero(t.hours);
			minutes.innerHTML = getZero(t.minutes);
			seconds.innerHTML = getZero(t.seconds);
			if(t.total <= 0) {
				clearInterval(timeInterval);
			}
		}
	}

	setClock('.timer', deadline );



    hideTabContents();
    showTabContent();
});
