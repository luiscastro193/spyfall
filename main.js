"use strict";
import PRNG from 'https://luiscastro193.github.io/PRNG/PRNG.js';

const locations = ["Playa", "Banco", "Hotel", "Rodaje de una película", "Teatro", "Sierra Nevada", "Hospital", "Base militar", "Embajada", "Zoológico", "Estación espacial", "Crucero", "Avión", "Circo", "Comisaría de policía", "Supermercado", "Universidad", "Parque de atracciones", "Carnaval", "Discoteca", "Fiesta de empresa", "Casino", "Restaurante", "Colegio", "Spa", "Batalla campal", "Tren de pasajeros", "Barco pirata", "Submarino", "Gasolinera"];
const spyString = "Eres el espía";

const currentLocation = document.getElementById("currentLocation");
const form = document.querySelector('form');
const seed = document.getElementById("seed");
const locationList = document.getElementById("locationList");

function clearCurrentLocation() {
	currentLocation.innerHTML = '';
}

async function revealLocation(event) {
	event.preventDefault();
	
	let myChance = new Chance(await PRNG(seed.value.toLowerCase()));
	let spy = myChance.integer({min: 1, max: form.numPlayers.valueAsNumber});
	
	if (spy == form.player.valueAsNumber)
		currentLocation.innerHTML = spyString;
	else
		currentLocation.innerHTML = myChance.pickone(locations);
}

form.oninput = clearCurrentLocation;
form.onsubmit = revealLocation;

async function generateSeed() {
	let myChance = seed.value && await PRNG(seed.value.toLowerCase()) || Math.random;
	myChance = new Chance(myChance);
	seed.value = myChance.word({syllables: 2});
	form.oninput();
}

seed.nextElementSibling.onclick = generateSeed;

for (let input of document.querySelectorAll('input'))
	input.addEventListener("focus", () => input.select());

function locationToElement(location) {
	let li = document.createElement('span');
	li.textContent = location;
	return li;
}

locationList.append(...new Chance(Math.random).shuffle(locations).map(locationToElement));

seed.value = new Date().toLocaleDateString('es-ES');

function setSpan(element, margin) {
	element.style.cssText += `grid-column: span ${element.offsetWidth + margin}`;
}

function computeSmartList(list, margin) {
	requestAnimationFrame(() => {
		requestAnimationFrame(() => {
			for (let item of list.children)
				setSpan(item, margin);
			
			list.classList.replace('smart-list', 'smart-list-computed');
		});
	});
}

document.fonts.ready.then(() => computeSmartList(locationList, 15));