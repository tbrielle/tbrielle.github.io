import { Reglure } from "./reglure.mjs";

function findImage() {
  let selection = window.getSelection();
  if (selection.rangeCount > 0) {
    let range = selection.getRangeAt(0);
    let node = range.startContainer;
    if (node.hasChildNodes() && range.startOffset > 0) {
      node = node.childNodes[range.startOffset - 1];
      if (node && node.nodeType === 1 && node.tagName.toLowerCase() === 'img') {
        return node;
      }
    }
  }
  return null;
}

function pxToCm(px) {
  return px * 2.54 / (96 * window.devicePixelRatio);
}

// Ajuste la taille de l'image en nombre de carreaux et préserve les ratios afin de ne pas casser l'alignement de la police et des lignes
function adjustImageTiles(image) {
  let widthTiles = Math.round(pxToCm(image.clientWidth) / Reglure.TILE_SPACING);
  let heightTiles = Math.round(pxToCm(image.clientHeight) / Reglure.TILE_SPACING);
  if (widthTiles > Reglure.HORIZONTAL_TILES) {
    heightTiles = Math.round(Reglure.HORIZONTAL_TILES * heightTiles / widthTiles);
    widthTiles = Reglure.HORIZONTAL_TILES;
  }
  if (heightTiles > Reglure.VERTICAL_TILES) {
    widthTiles = Math.round(Reglure.VERTICAL_TILES * widthTiles / heightTiles);
    heightTiles = Reglure.VERTICAL_TILES;
  }
  image.style.width = widthTiles * Reglure.TILE_SPACING + 'cm';
  image.style.height = heightTiles * Reglure.TILE_SPACING + 'cm';
}

$('.toolbar a').click(function (e) {
  let command = $(this).data('command');
  switch (command) {
    case 'foreColor': {
      let color = $(this).data('value');
      document.execCommand('styleWithCSS', false, true);
      document.execCommand(command, false, color);
    }
    break;
  case 'underline':
  case 'strikeThrough': {
    let color = $(this).data('value');
    document.execCommand(command, false, null);
    let selectedElement = window.getSelection().focusNode.parentNode;
    selectedElement.style['text-decoration-color'] = color;
  }
  break;
  case 'insertImage': {
    let url = prompt('Lien de l\'image: ', 'https:\/\/');
    if (url) {
      document.execCommand(command, false, url);
      let image = findImage();
      if (image) {
        image.onload = function () {
          adjustImageTiles(image);
        };
      }
    }
  }
  break;
  default:
    document.execCommand(command, false, null);
  }
  return false;
});
