import Game from './components/Game/Game';

let game;

const s = (sketch) => {
  sketch.setup = () => {
    sketch.angleMode(sketch.DEGREES);
    sketch.rectMode(sketch.LEFT);
    sketch.createCanvas(window.innerWidth, window.innerHeight);

    game = new Game(sketch);
  };

  sketch.draw = () => {
    sketch.background('#222');
    game.draw();
  };

  sketch.mousePressed = (e) => {
    game.mouseClicked(e);
  }

  sketch.mouseMoved = (e) => {
    game.mouseMoved(e);
  };
};

new p5(s);