"use strict";
import {zip, unzip} from "https://luiscastro193.github.io/zip-string/zip-string.js";

const defaultLocations = ["Playa", "Banco", "Hotel", "Rodaje de una película", "Teatro", "Sierra Nevada", "Hospital", "Base militar", "Embajada", "Zoológico", "Estación espacial", "Crucero", "Avión", "Circo", "Comisaría de policía", "Supermercado", "Universidad", "Parque de atracciones", "Carnaval", "Discoteca", "Fiesta de empresa", "Casino", "Restaurante", "Colegio", "Spa", "Batalla campal", "Tren de pasajeros", "Barco pirata", "Submarino", "Gasolinera"];
const dialog = document.querySelector("dialog");
const locationsInput = document.querySelector("textarea");
const [updateButton, cancelButton, cleanButton, defaultButton] = dialog.querySelectorAll("button");

export let locations = defaultLocations;

if (location.hash) {
	let uncompressed = await unzip(location.hash.slice(1)).catch(console.error);
	if (uncompressed)
		locations = JSON.parse(uncompressed);
	else
		history.replaceState(null, '', ' ');
}

window.onhashchange = () => location.reload();
cancelButton.onclick = () => dialog.close();
cleanButton.onclick = () => {locationsInput.value = ''};
defaultButton.onclick = () => {locationsInput.value = defaultLocations.join('\n')};

updateButton.onclick = async () => {
	locationsInput.value = locationsInput.value.trim();
	if (locationsInput.value == defaultLocations.join('\n')) {
		if (location.hash) {
			history.pushState(null, '', ' ');
			window.onhashchange();
		}
	}
	else if (locationsInput.reportValidity())
		location.hash = await zip(JSON.stringify(locationsInput.value.split(/\s+^\s*/m)));
	
	dialog.close();
}

document.getElementById("edit").onclick = () => {
	locationsInput.value = locations.join('\n');
	dialog.showModal();
};

document.getElementById("share").onclick = () => {
	if (navigator.share)
		navigator.share({url: location.href});
	else {
		navigator.clipboard.writeText(location.href)
			.then(() => alert("Enlace copiado al portapapeles"))
			.catch(() => alert("Copia el enlace para compartir la lista de localizaciones"));
	}
};
