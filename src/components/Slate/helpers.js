import sample from 'lodash/sample';

import { WIDTH, HEIGHT, START_PAD, NUM_COLS, NUM_ROWS } from './Slate';
import Tile from '../Tile/Tile';

export const getYAndAlpha = (currentY, tempY) => {
  if (tempY > currentY) {
    const progress = START_PAD / (tempY - currentY);
    let alpha = 1 - (currentY / progress / currentY);
    return { y: tempY, alpha };
  }
  return { y: currentY, alpha: 1 };
}

export const getCoords = (tileNumber, canvasWidth, canvasHeight) => {
  const centreW = (canvasWidth / 2) - (WIDTH / 2);
  const centreH = (canvasHeight / 2) - (HEIGHT / 2);

  switch (tileNumber) {
    case 1: return { x: centreW, y: centreH };
    case 2: return { x: centreW + WIDTH, y: centreH };
    case 3: return { x: centreW, y: centreH + HEIGHT };
    case 4: return { x: centreW - WIDTH, y: centreH };
    case 5: return { x: centreW, y: centreH - HEIGHT };
    case 6: return { x: centreW + WIDTH, y: centreH - HEIGHT };
    case 7: return { x: centreW + WIDTH, y: centreH + HEIGHT };
    case 8: return { x: centreW - WIDTH, y: centreH + HEIGHT };
    case 9: return { x: centreW - WIDTH, y: centreH - HEIGHT };
  }

  this.tempY = this.y + START_PAD;
}

export const buildTiles = (sketch, slateX, slateY) => {
  const tiles = [];
  const tileWidth = WIDTH / NUM_COLS;
  const tileHeight = HEIGHT / NUM_ROWS;

  for (let i = 0; i < NUM_COLS; i++) {
    for (let j = 0; j < NUM_ROWS; j++) {
      const x = slateX + (tileWidth * i);
      const y = slateY + (tileHeight * j);
      tiles.push(new Tile(sketch, x, y, tileWidth, tileHeight));
    }
  }

  return tiles;
}

export const getEmptyTile = (tiles) => {
  let counter = 0;
  let randTile;

  do {
    randTile = sample(tiles);
    counter++;
  } while (randTile.isGrass && counter < this.tiles.length);

  if (randTile.isGrass) {
    return null;
  }

  return randTile;
}