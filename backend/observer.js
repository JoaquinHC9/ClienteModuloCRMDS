class Observer {
    constructor() {
      this.observers = [];
    }
  
    addObserver(observer) {
      this.observers.push(observer);
    }
  
    notify(message) {
      this.observers.forEach(observer => observer.update(message));
    }
  }

module.exports = Observer;