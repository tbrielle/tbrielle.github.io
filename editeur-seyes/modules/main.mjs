import { Reglure } from "./reglure.mjs";

// Génération de la réglure
Reglure.draw('.page');

// Mise à jour de la date du jour
function capitalize(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}
const DATE_OPTIONS = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
document.getElementById('date').innerText = capitalize(new Date().toLocaleDateString('fr', DATE_OPTIONS));
