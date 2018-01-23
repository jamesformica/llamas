export const getRandomNumber = (min, max) => (
  Math.floor(Math.random() * (max - min)) + min
);

class Timer {
  constructor() {
    this.subscribers = [];

    this.loop();
  }

  loop() {
    setTimeout(() => {
      for (let i = 0; i < this.subscribers.length; i++) {
        this.subscribers[i].count--;

        if (this.subscribers[i].count === 0) {
          this.subscribers[i].callback();
          this.subscribers.splice(i, 1);
        }
      }

      this.loop();
    }, getRandomNumber(5, 10));
  }



  subscribe(count, callback) {
    this.subscribers.push({ count, callback });
  }
}

export default Timer;
