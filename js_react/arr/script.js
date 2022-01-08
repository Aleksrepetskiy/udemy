'use strict'

const persone = {
	name: "alex",
	tel: "+5555555",
	parents: {
		mom: "Olga",
		dad: "Mike"

	}
}

//Глубокое копирование
const clone = JSON.parse(JSON.stringify(persone));


console.log(JSON.parse(JSON.stringify(persone)));