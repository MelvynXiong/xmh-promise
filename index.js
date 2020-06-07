const PROMISE_STATE = {
  PENDING: "PENDING",
  FULFILLED: "FULFILLED",
  REJECTED: "REJECTED",
};

class Promise {
  constructor(fn) {
    this.state = PROMISE_STATE.PENDING;
    this.value = null;
    this.fulfilledHandlers = [];
    this.rejectedHandlers = [];

    fn(this.resolve, this.reject); // 立即执行
  }

  resolve = (val) => {
    this.fulfilled(val);
  };

  fulfilled = (val) => {
    if (this.state === PROMISE_STATE.PENDING) {
      this.value = val;
      // 执行回调
      this.fulfilledHandlers.forEach((handler) => handler(val));
      this.state == PROMISE_STATE.FULFILLED;
    }
  };

  reject = (val) => {
    if (this.state === PROMISE_STATE.PENDING) {
      this.val = val;
      // 执行回调
      this.rejectedHandlers.forEach((handler) => handler(val));
      this.state = PROMISE_STATE.reject;
    }
  };

  then(onFulfilled, onRejected) {
    if (this.state === PROMISE_STATE.FULFILLED) {
      if (typeof onFulfilled === "function") {
        onFulfilled(this.val);
      }
    }

    if ((this.state = PROMISE_STATE.REJECTED)) {
      if (typeof onRejected === "function") {
        onRejected(this.val);
      }
    }

    if (this.state === PROMISE_STATE.PENDING) {
      if (typeof onFulfilled === "function") {
        this.fulfilledHandlers.push(onFulfilled);
      }

      if (typeof onRejected === "function") {
        this.rejectedHandlers.push(onRejected);
      }
    }
    return new Promise((resolve, reject) => {});
  }

  resolvePromise(newP, x, resolve, reject) {}
}

const p = new Promise((resolve, reject) => {
  setTimeout(function () {
    resolve(1);
  }, 1000);
});

p.then((data) => console.log(data)); //没有任何结果
