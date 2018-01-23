import Drawable from '../../common/Drawable';

class Tile extends Drawable {
  constructor(sketch, x, y, w, h) {
    super(sketch, x, y);
    this.width = w;
    this.height = h;

    this.isGrass = false;
    this.isMouseOver = false;
  }

  mouseMoved() {
    this.isMouseOver = this.isInside(this.sketch.mouseX, this.sketch.mouseY);
  }

  isInside(mX, mY) {
    const isInX = mX >= this.x && mX <= this.x + this.width;
    const isInY = mY >= this.y && mY <= this.y + this.height;

    return isInX && isInY;
  }

  getCentreCoords() {
    return {
      x: this.x + this.width / 2,
      y: this.y + this.height / 2
    };
  }

  draw() {
    this.sketch.push();

    if (this.isGrass) {
      this.sketch.fill('green');
      this.sketch.rect(this.x, this.y, this.width, this.height);
    }

    if (this.isMouseOver) {
      this.sketch.fill('rgba(10, 150, 200, 0.6)');
      this.sketch.rect(this.x, this.y, this.width, this.height);
    }

    this.sketch.pop();
  }
}

export default Tile;
