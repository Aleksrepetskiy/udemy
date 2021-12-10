"use strict";

let numberOfFilms;
function start() {
    numberOfFilms = +prompt("Сколько фильмов вы уже посмотрели?", "");
    while (
        numberOfFilms == "" ||
        numberOfFilms == null ||
        isNaN(numberOfFilms)
    ) {
        numberOfFilms = +prompt("Сколько фильмов вы уже посмотрели?", "");
    }
}
start();

const personalMovieDB = {
    count: numberOfFilms,
    movies: {},
    actors: {},
    genres: [],
    privat: false,
};

function rememberMyFilms() {
    for (let index = 1; index < 3; index++) {
        let a = prompt("Один из последних просмотренных фильмов?", "");
        let b = prompt("На сколько оцените его?", "");
        if (a !== null && a !== "" && a.length < 50 && b !== null && b !== "") {
            personalMovieDB.movies[a] = b;
        } else {
            index--;
        }
    }
}
//rememberMyFilms();

function detectPersonalLevel() {
	if (personalMovieDB.count < 10) {
		console.log("Просмотрено довольно мало фильмов");
	} else if (personalMovieDB.count >= 10 && personalMovieDB.count < 30) {
		console.log("Вы классический зритель");
	} else if (personalMovieDB.count >= 30) {
		console.log("Вы киноман");
	} else {
		console.log("Error");
	}
}
detectPersonalLevel();

function showMyDB(hidden) {
	if(!hidden) {
		console.log(personalMovieDB);
	}
}
showMyDB(personalMovieDB.privat);

function writeYourGenres() {
	for (let index = 1; index < 4; index++) {
		personalMovieDB.genres[index-1] = prompt(`Ваш любимый жанр под номером ${index}`, "");
	}
}
writeYourGenres();
