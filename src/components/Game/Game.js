import sample from 'lodash/sample';

import Drawable from '../../common/Drawable';
import Timer from '../../common/Timer';
import Slate from '../Slate/Slate';
import Llama from '../Llama/Llama';
import { isGrassUnderLlama, eatGrassUnderLlama,
  hasEatenTheGrass } from './helpers';

class Game extends Drawable {
  constructor(sketch) {
    super(sketch);

    this.llama = new Llama(sketch, sketch.width / 2, sketch.height / 2);
    this.slates = [];
    this.addTile();

    this.eatTime = null;
    this.timer = new Timer();
    this.timer.subscribe(1, () => this.addGrass());
  }

  addTile() {
    const nextTileNum = this.slates.length + 1;
    this.slates.push(new Slate(this.sketch, nextTileNum));
  }

  addGrass() {
    const randSlate = sample(this.slates);
    randSlate.addGrass();
  }

  mouseMoved(e) {
    this.slates.forEach(t => t.mouseMoved(e));
  }

  mouseClicked(e) {
    let result;
    for (let i = 0; i < this.slates.length; i++) {
      result = this.slates[i].mouseClicked(e);
      if (result) break;
    }

    if (result) {
      this.llama.moveLama(result.x, result.y);
    }
  }

  draw() {
    this.slates.map(t => t.draw());
    this.llama.draw();

    if (isGrassUnderLlama(this.slates, this.llama)) {
      if (!this.eatTime) {
        this.eatTime = new Date();
      } else if (hasEatenTheGrass(this.eatTime)) {
        eatGrassUnderLlama(this.slates, this.llama);
      }
    } else {
      this.eatTime = null;
    }
  }
}

export default Game;
