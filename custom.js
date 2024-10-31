"use strict";
import {zip, unzip} from "https://luiscastro193.github.io/zip-string/zip-string.js";

const defaultLocations = ["Avión", "Banco", "Barco pirata", "Base militar", "Batalla campal", "Carnaval", "Casino", "Circo", "Colegio", "Comisaría de policía", "Crucero", "Discoteca", "Embajada", "Estación espacial", "Fiesta de empresa", "Gasolinera", "Hospital", "Hotel", "Parque de atracciones", "Playa", "Restaurante", "Rodaje de una película", "Sierra Nevada", "Spa", "Submarino", "Supermercado", "Teatro", "Tren de pasajeros", "Universidad", "Zoológico"];
const dialog = document.querySelector("dialog");
const locationsInput = document.querySelector("textarea");
const [updateButton, cancelButton, cleanButton, defaultButton] = dialog.querySelectorAll("button");

export let locations = defaultLocations;

if (location.hash) {
	let uncompressed = await unzip(location.hash.slice(1)).catch(console.error);
	if (uncompressed)
		locations = uncompressed.split('\n');
	else
		history.replaceState(null, '', ' ');
}

window.onhashchange = () => location.reload();
cancelButton.onclick = () => dialog.close();
cleanButton.onclick = () => {locationsInput.value = ''};
defaultButton.onclick = () => {locationsInput.value = defaultLocations.join('\n')};

updateButton.onclick = async () => {
	locationsInput.value = locationsInput.value.trim();
	
	if (locationsInput.reportValidity()) {
		const newLocations = [...new Set(locationsInput.value.split(/\s+^\s*/m))].sort().join('\n');
		
		if (newLocations != locations.join('\n')) {
			if (newLocations == defaultLocations.join('\n')) {
				history.pushState(null, '', ' ');
				window.onhashchange();
			}
			else
				location.hash = await zip(newLocations);
		}
		
		dialog.close();
	}
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
