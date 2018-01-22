class Drawable {
  constructor(sketch, x = 0, y = 0) {
    this.sketch = sketch;
    this.x = x;
    this.y = y;
  }

  draw(sketch) {
    console.error("this method should be overriden!");
  }
}

export default Drawable;
