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
      this.state = PROMISE_STATE.REJECTED;
    }
  };

  then(onFulfilled, onRejected) {
    const newP = new Promise((resolve, reject) => {
      /**
       * 同步操作
       */
      if (this.state === PROMISE_STATE.FULFILLED) {
        if (typeof onFulfilled === "function") {
          const x = onFulfilled(this.val);
        }
      }

      if (this.state === PROMISE_STATE.REJECTED) {
        if (typeof onRejected === "function") {
          onRejected(this.val);
        }
      }

      /**
       * 异步操作
       */
      if (this.state === PROMISE_STATE.PENDING) {
        if (typeof onFulfilled === "function") {
          this.fulfilledHandlers.push(onFulfilled);
        }

        if (typeof onRejected === "function") {
          this.rejectedHandlers.push(onRejected);
        }
      }
    });
    return newP;
  }

  resolvePromise(newP, x, resolve, reject) {}
}

let p = new Promise((resolve, reject) => {
  resolve(1);
});

p.then((data) => {
  return 2; //返回一个普通值
}).then((data) => {
  console.log(data); //输出2
});

module.exports = {
  resolved: function (value) {
    return new Promise(function (resolve) {
      resolve(value);
    });
  },
  rejected: function (reason) {
    return new Promise(function (resolve, reject) {
      reject(reason);
    });
  },
  deferred: function () {
    var resolve, reject;

    return {
      promise: new Promise(function (rslv, rjct) {
        resolve = rslv;
        reject = rjct;
      }),
      resolve: resolve,
      reject: reject,
    };
  },
};
