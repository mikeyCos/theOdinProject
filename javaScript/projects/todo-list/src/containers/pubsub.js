export default {
  subscribers: {},
  subscribe(subscriber, handler) {
    if (this.subscribers[subscriber]) {
      delete this.subscribers[subscriber];
    }
    this.subscribers[subscriber] = this.subscribers[subscriber] || [];
    this.subscribers[subscriber].push(handler);
  },
  unsubscribe(subscriber, handler) {
    if (this.subscribers[subscriber]) {
      for (let i = 0; i < this.subscribers[subscriber].length; i += 1) {
        if (this.subscribers[subscriber][i] === handler) {
          this.subscribers[subscriber].splice(i, 1);
          break;
        }
      }
    }
  },
  publish(subscriber, data) {
    if (this.subscribers[subscriber]) {
      this.subscribers[subscriber].forEach((handler) => {
        handler(data);
      });
    }
  },
};
