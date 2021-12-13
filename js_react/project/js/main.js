"use strict";

const personalMovieDB = {
    count: 0,
    movies: {},
    actors: {},
    genres: [],
    privat: false,
    start: function () {
        this.count = +prompt("Сколько фильмов вы уже посмотрели?", "");
        while (this.count == "" || this.count == null || isNaN(this.count)) {
            this.count = +prompt("Сколько фильмов вы уже посмотрели?", "");
        }
    },
    rememberMyFilms: function () {
        for (let index = 1; index < 3; index++) {
            let a = prompt("Один из последних просмотренных фильмов?", "");
            let b = prompt("На сколько оцените его?", "");
            if (
                a !== null &&
                a !== "" &&
                a.length < 50 &&
                b !== null &&
                b !== ""
            ) {
                this.movies[a] = b;
            } else {
                index--;
            }
        }
    },
    detectPersonalLevel: function () {
        if (this.count < 10) {
            console.log("Просмотрено довольно мало фильмов");
        } else if (this.count >= 10 && this.count < 30) {
            console.log("Вы классический зритель");
        } else if (this.count >= 30) {
            console.log("Вы киноман");
        } else {
            console.log("Error");
        }
    },
    showMyDB: function (hidden) {
        if (!hidden) {
            console.log(this);
        }
    },
    writeYourGenres: function () {
        for (let index = 1; index < 4; index++) {
            let genre = prompt(`Ваш любимый жанр под номером ${index}`, "");
            if (genre == null || genre == '') {
				index--;
            }else{
				this.genres[index - 1] = genre;
			}
        }
		this.genres.forEach((element, index) => {
			console.log(`Любимый жанр #${index+1} - это ${element}`);
		});
    },
    toggleVisibleMyDB: function () {
        if (this.privat) {
            this.privat = false;
        } else {
            this.privat = true;
        }
    },
};
//personalMovieDB.start();
//personalMovieDB.toggleVisibleMyDB();
//personalMovieDB.showMyDB();
//personalMovieDB.rememberMyFilms();
//personalMovieDB.detectPersonalLevel();
//personalMovieDB.showMyDB(personalMovieDB.privat);
//personalMovieDB.writeYourGenres();
