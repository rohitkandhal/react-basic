class EventEmitter {
  constructor() {
    this.subscribers = new Map();  // eventname and [] callback array
  }

  subscribe(eventName, callback) {
    if (!this.subscribers.has(eventName)) {
      this.subscribers.set(eventName, new Set());
    }

    const subscriptions = this.subscribers.get(eventName);
    // So that we can delete, we will store it in an obj
    const callBackObj = { callback };
    subscriptions.add(callBackObj);

    return {
      release: () => {
        subscriptions.delete(callBackObj);

        if (subscriptions.size === 0) {
          this.subscribers.delete(eventName);
        }
      }
    }
  }

  emit(eventName, ...args) {
    const currSubscribers = this.subscribers.get(eventName);

    currSubscribers && currSubscribers.forEach(subscriber => {
      subscriber.callback.apply(null, args);
    })
  }
}

// const emitter = new Emitter()
// const sub1 = emitter.subscribe('event1', callback1)
// const sub2 = emitter.subscribe('event2', callback2)

// // same callback could subscribe 
// // on same event multiple times
// const sub3 = emitter.subscribe('event1', callback1)

// emitter.emit('event1', 1, 2);
// // callback1 will be called twice

// sub1.release()
// sub3.release()
// // now even if we emit 'event1' again,
// // callback1 is not called anymore