'use strict';

let numberOfFilms = prompt("Сколько фильмов вы уже посмотрели?", "");

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

for (let index = 1; index < 3; index++) {
	let a = prompt("Один из последних просмотренных фильмов?", "");
	let b = prompt("На сколько оцените его?", "");
	if(a !== null && a !== '' && a.length < 50 && b !== null && b !== '') {
		personalMovieDB.movies[a] = b;
	} else {
		index--;
	}
}

if(personalMovieDB.count < 10) {
	console.log('Просмотрено довольно мало фильмов');
}else if (personalMovieDB.count >= 10 && personalMovieDB.count < 30) {
	console.log('Вы классический зритель');
}else if (personalMovieDB.count >= 30) {
	console.log('Вы киноман');
}else {
	console.log('Error');
}