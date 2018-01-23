import sample from 'lodash/sample';

import Drawable from '../../common/Drawable';
import Slate from '../Slate/Slate';
import Llama from '../Llama/Llama';
import { getRandomNumber } from '../../common/Timer';
import { isGrassUnderLlama, eatGrassUnderLlama,
  hasEatenTheGrass, canAddGrass } from './helpers';

const ADD_GRASS_WAIT = 10000;

class Game extends Drawable {
  constructor(sketch) {
    super(sketch);

    this.llama = new Llama(sketch, sketch.width / 2, sketch.height / 2);
    this.slates = [];
    this.eatTime = null;
    this.nextGrowTime = null;

    this.addSlate();
    this.setNextGrowTime();
  }

  addSlate() {
    const nextTileNum = this.slates.length + 1;
    this.slates.push(new Slate(this.sketch, nextTileNum));
  }

  addGrass() {
    const randSlate = sample(this.slates);
    randSlate.addGrass();
  }

  setNextGrowTime() {
    const date = new Date();
    date.setSeconds(date.getSeconds() + getRandomNumber(5, 15));
    this.nextGrowTime = date;
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

    if (canAddGrass(this.nextGrowTime, this.slates)) {
      this.addGrass();
      this.setNextGrowTime();
    }

    if (isGrassUnderLlama(this.slates, this.llama)) {
      if (!this.eatTime) {
        this.eatTime = new Date();
      } else if (hasEatenTheGrass(this.eatTime)) {
        eatGrassUnderLlama(this.slates, this.llama);
        this.setNextGrowTime();
      }
    } else {
      this.eatTime = null;
    }
  }
}

export default Game;
