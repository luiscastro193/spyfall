"use strict";
let locations = ["Playa", "Banco", "Hotel", "Rodaje de una película", "Teatro", "Sierra Nevada", "Hospital", "Base militar", "Embajada", "Zoológico", "Estación espacial", "Crucero", "Avión", "Circo", "Comisaría de policía", "Supermercado", "Universidad", "Parque de atracciones", "Carnaval", "Discoteca", "Fiesta de empresa", "Casino", "Restaurante", "Colegio", "Spa", "Batalla campal", "Tren de pasajeros", "Barco pirata", "Submarino", "Gasolinera"];
let spyString = "Eres el espía";

let currentLocation = document.getElementById("currentLocation");

function clearCurrentLocation() {
	currentLocation.innerHTML = '';
}

let form = document.querySelector('form');

function revealLocation(event) {
	event.preventDefault();
	
	let myChance = new Chance(form.seed.value.toLowerCase());
	let spy = myChance.integer({min: 1, max: parseInt(form.numPlayers.value)});
	
	if (spy == form.player.value)
		currentLocation.innerHTML = spyString;
	else
		currentLocation.innerHTML = myChance.pickone(locations);
}

let seed = document.getElementById("seed");

function generateSeed() {
	let myChance = seed.value && new Chance(seed.value.toLowerCase()) || chance;
	seed.value = myChance.word({syllables: 2});
	form.oninput();
}

function selectInput(input) {
	setTimeout(function() {
		try {
			input.setSelectionRange(0, input.value.length);
		}
		catch(e) {
			input.select();
		}
	}, 0);
}

let locationList = document.getElementById("locationList");

for (let location of chance.shuffle(locations)) {
	let li = document.createElement("li");
	li.textContent = location;
	locationList.appendChild(li);
}
