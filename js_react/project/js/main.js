'use strict';

let numberOfFilms = +prompt("Сколько фильмов вы уже посмотрели?", "");

const personalMovieDB = {
	count: numberOfFilms,
	movies: {

	},
	actors: {

	},
	genres: [

	],
	privat: false

};

for (let index = 0; index < 2; index++) {
	let lastOfFilms = prompt("Один из последних просмотренных фильмов?", "");
	let numberOfFilms = prompt("На сколько оцените его?", "");
	personalMovieDB.movies[lastOfFilms] = numberOfFilms;
}

console.log(personalMovieDB.count);
console.log(personalMovieDB);