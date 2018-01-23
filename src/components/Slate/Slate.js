import find from 'lodash/find';

import Drawable from '../../common/Drawable';
import { getYAndAlpha, getCoords, buildTiles, getEmptyTile } from './helpers';

export const WIDTH = 240;
export const HEIGHT = 180;
export const START_PAD = 80;
export const NUM_COLS = 4;
export const NUM_ROWS = 3;

class Slate extends Drawable {
  constructor(sketch, tileNum) {
    super(sketch);
    this.hasLoaded = false;
    this.isMouseOver = false;

    const { x, y } = getCoords(tileNum, sketch.width, sketch.height);
    this.x = x;
    this.y = y;
    this.tempY = y + START_PAD;
    this.tiles = buildTiles(sketch, this.x, this.y);
  }

  mouseMoved() {
    if (this.hasLoaded) {
      this.tiles.forEach(t => t.mouseMoved());
    }
  }

  mouseClicked(e) {
    const tile = this.findTileAtPos(e.x, e.y);
    if (tile) return tile.getCentreCoords();
  }

  isGrassAtPos(x, y) {
    return !!this.findGrassAtPos(x, y);
  }

  eatGrassAtPos(x, y) {
    const grassTile = this.findGrassAtPos(x, y);
    if (grassTile) {
      grassTile.isGrass = false;
    }
  }

  findTileAtPos(x, y) {
    return find(this.tiles, t => t.isInside(x, y));
  }

  findGrassAtPos(x, y) {
    return find(this.tiles, t => t.isGrass && t.isInside(x, y))
  }

  countGrass() {
    return this.tiles.reduce((total, t) => t.isGrass ? ++total : total, 0);
  }

  addGrass() {
    const randTile = getEmptyTile(this.tiles);
    if (randTile) {
      randTile.isGrass = true;
    }
  }

  draw() {
    const { y, alpha } = getYAndAlpha(this.y, this.tempY);

    if (alpha < 1) {
      this.tempY--;
    } else {
      this.hasLoaded = true;
    }

    this.sketch.push();
    this.sketch.noStroke();
    this.sketch.fill(`rgba(46, 204, 113, ${alpha})`);
    this.sketch.rect(this.x, y, WIDTH, HEIGHT);
    this.sketch.pop();

    this.tiles.forEach(t => t.draw());
  }
}

export default Slate;
