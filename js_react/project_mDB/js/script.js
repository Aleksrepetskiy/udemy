"use strict";

document.addEventListener("DOMContentLoaded", () => {
    const movieDB = {
        movies: [
            "Логан",
            "Лига справедливости",
            "Ла-ла лэнд",
            "Одержимость",
            "Скотт Пилигрим против...",
        ],
    };

    const promoAdv = document.querySelectorAll(".promo__adv img"),
        promoBg = document.querySelector(".promo__bg"),
        promoGenre = promoBg.querySelector(".promo__genre"),
        promoList = document.querySelector(".promo__interactive-list"),
        promoItem = promoList.querySelectorAll(".promo__interactive-item"),
        promoDelete = promoList.querySelectorAll(".delete"),
		addForm = document.querySelector('form.add'),
        addBtn = addForm.querySelector("button"),
        addCheckbox = addForm.querySelector("[type='checkbox']"),
        addInput = addForm.querySelector(".adding__input");

	const deleteAdv = (arr)=> {
		arr.forEach((element) => {
			element.remove();
		});
	}

	const makeChanges = () => {
		promoGenre.textContent = "драма";
		promoBg.style.backgroundImage = "url('img/bg.jpg')";
	}

	const sortArr = (arr) => {
		arr.sort()
	}

    function createMovieList(films, parent) {
		parent.innerHTML = "";
		sortArr(films);
        films.forEach((item, num) => {
            parent.innerHTML += `
			<li class="promo__interactive-item">
				${num + 1}. ${item}
				<div class="delete"></div>
			</li>
		`;
        });
		document.querySelectorAll('.delete').forEach((elem, index) => {
			elem.addEventListener('click', function (params) {
				this.parentElement.remove();
				films.splice(index, 1);
				createMovieList(movieDB.movies, promoList)
			})

		})
    }
    createMovieList(movieDB.movies, promoList);

	addForm.addEventListener("submit", (event) => {
		event.preventDefault();
		let newFilm = addInput.value;
		const favorite = addCheckbox.checked;
		if(newFilm) {
			if (newFilm.length > 21) {
				newFilm = `${newFilm.substring(0, 22)}...`;
			}
			movieDB.movies.push(newFilm);
			sortArr(movieDB.movies)
			createMovieList(movieDB.movies, promoList);
			if (favorite) {
				console.log("Добавляем любимый фильм")
			}
		}
		event.target.reset();
	})

	deleteAdv(promoAdv);
	makeChanges();
});
