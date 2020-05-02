/*
https://fr.wikipedia.org/wiki/R%C3%A9glure#R%C3%A9glures_fr%C3%A9quemment_utilis%C3%A9es
Réglure Seyès, ou « grands carreaux »
- Lignes horizontales fines tous les 2 mm, lignes horizontales et verticales tous les 8 mm.
- Typique du cahier d'écolier en France. Ce lignage semble toujours accompagné d'une marge à gauche.
- Créé en 1892 par Jean-Alexandre Seyès, libraire-papetier à Pontoise7.
- Une feuille Seyès de format A4 dispose de 21 carreaux complets sur une ligne et de 29 carreaux complets sur une colonne, soit un total de 609 carreaux complets.
*/

let Reglure = {};

Reglure.HORIZONTAL_TILES = 21; // Nombre de carreaux sur la largeur
Reglure.VERTICAL_TILES = 29; // Nombre de carreaux sur la hauteur
Reglure.PAGE_WIDTH = 21; // Largeur de la page A4
Reglure.PAGE_HEIGHT = 29.7; // Hauteur de la page A4
Reglure.PAGE_WIDTH = 21; // Largeur de la page A4
Reglure.OPACITY = 0.2;
Reglure.X_FROM = 4.0; // Première ligne verticale (marge)
Reglure.X_TO = Reglure.PAGE_WIDTH; // Dernière ligne verticale jusqu'au bout de la page
Reglure.Y_FROM = 3.0; // Première ligne horizontale en haut de la page (on commence par 3 lignes fines intermédiaires)
Reglure.Y_TO = Reglure.PAGE_HEIGHT - 2.4;  // Dernière ligne horizontale en bas de la page (on finit par 2 lignes fines intermédiaires)
Reglure.TILE_SPACING = 0.8; // Lignes verticales tous les 8mm
Reglure.INTERMEDIARY_LINE_SPACING = 0.2; // Lignes horizontales tous les 2mm
Reglure.MARGIN_LINE_COLOR = 'rgb(255,0,0)';
Reglure.TILE_LINE_COLOR = 'rgb(0,0,255)';
Reglure.INTERMEDIARY_LINE_COLOR = 'rgb(0,255,255)';

function horizontalLines(reglure) {
    let yFrom = Reglure.Y_FROM;
    let y = yFrom;
    let i = 0;
    do {
        // La page débute par 3 lignes fines et se termine par 2 lignes fines
        let lineWidth = (i + 1) % 4 === 0 ? 2 : 1;
        let color = (i + 1) % 4 === 0 ? Reglure.TILE_LINE_COLOR : Reglure.INTERMEDIARY_LINE_COLOR;
        reglure.line('0.0cm', y + 'cm', Reglure.PAGE_WIDTH + 'cm', y + 'cm')
            .attr({ stroke: color, 'stroke-width': lineWidth })
            .opacity(Reglure.OPACITY);
        y += Reglure.INTERMEDIARY_LINE_SPACING;
        i++; 
    } while (y <= Reglure.Y_TO);
}

function verticalLines(reglure) {
    let xFrom = Reglure.X_FROM;
    let x = xFrom;
    let i = 0;
    do {
        let color = i === 0 ? Reglure.MARGIN_LINE_COLOR : Reglure.TILE_LINE_COLOR;
        reglure.line(x + 'cm', '0.0cm', x + 'cm', Reglure.PAGE_HEIGHT + 'cm')
            .attr({ stroke: color, 'stroke-width': 2 })
            .opacity(Reglure.OPACITY);
        x += Reglure.TILE_SPACING;
        i++;
    } while (x <= Reglure.X_TO);
}

Reglure.draw = function reglure(selector) {
    // Réglure pour page A4
    let reglure = SVG().addClass('reglure')
        .addTo(selector)
        .size(Reglure.PAGE_WIDTH + 'cm', Reglure.PAGE_HEIGHT + 'cm');
    horizontalLines(reglure);
    verticalLines(reglure);
};

export { Reglure };
