export default {
  subscribers: {},
  subscribe(subscriber, fn) {
    this.subscribers[subscriber] = this.subscribers[subscriber] || [];
    this.subscribers[subscriber].push(fn);
  },
  unsubscribe(subscriber, fn) {
    if (this.subscribers[subscriber]) {
      this.subscribers[subscriber] = this.subscribers[subscriber].filter(
        (handler) => handler !== fn,
      );
    }
  },
  publish(subscriber, data) {
    if (this.subscribers[subscriber]) {
      this.subscribers[subscriber].forEach((fn) => {
        fn(data);
      });
    }
  },
};
