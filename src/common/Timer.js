export const getRandomNumber = (min, num) => (
  Math.floor(Math.random() * num) + min * 1000
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
    }, getRandomNumber(5, 5));
  }



  subscribe(count, callback) {
    this.subscribers.push({ count, callback });
  }
}

export default Timer;
