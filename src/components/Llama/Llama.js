import find from 'lodash/find';

import Drawable from '../../common/Drawable';

const MOVE_DISTANCE = 0.5;

class Llama extends Drawable {
  constructor(sketch, x, y) {
    super(sketch, x, y);
    this.width = 50;
    this.height = 50;
    this.destinationX = x;
    this.destinationY = y;
  }

  moveLama(newX, newY) {
    this.destinationX = newX;
    this.destinationY = newY;
  }

  draw(slates) {
    if (this.x > this.destinationX) this.x -= MOVE_DISTANCE;
    if (this.x < this.destinationX) this.x += MOVE_DISTANCE;
    if (this.y > this.destinationY) this.y -= MOVE_DISTANCE;
    if (this.y < this.destinationY) this.y += MOVE_DISTANCE;

    const isInside = find(slates, s => s.hasLoaded && s.findTileAtPos(this.x, this.y));

    if (!isInside) {
      this.destinationX = this.x;
      this.destinationY = this.y;
    }

    this.sketch.push();
    this.sketch.rectMode(this.sketch.CENTER);
    this.sketch.fill('rgba(210, 10, 200, 0.6)');
    this.sketch.rect(this.x, this.y, this.width, this.height);
    this.sketch.pop();
  }
}

export default Llama;
