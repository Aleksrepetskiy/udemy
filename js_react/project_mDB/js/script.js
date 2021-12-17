/* Задания на урок:

1) Удалить все рекламные блоки со страницы (правая часть сайта)

2) Изменить жанр фильма, поменять "комедия" на "драма"

3) Изменить задний фон постера с фильмом на изображение "bg.jpg". Оно лежит в папке img.
Реализовать только при помощи JS

4) Список фильмов на странице сформировать на основании данных из этого JS файла.
Отсортировать их по алфавиту

5) Добавить нумерацию выведенных фильмов */

"use strict";

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
    promoItem = document.querySelectorAll(".promo__interactive-item");

promoAdv.forEach((element) => {
    element.remove();
});
promoGenre.textContent = "драма";
promoBg.style.backgroundImage = "url('img/bg.jpg')";
promoList.innerHTML = "";
movieDB.movies.sort().forEach((item, num) => {
    promoList.innerHTML += `
		<li class="promo__interactive-item">
			${num + 1}. ${item}
			<div class="delete"></div>
		</li>
	`;
});
