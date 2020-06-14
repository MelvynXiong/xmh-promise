const PROMISE_STATUS = {
  PENDING: "pending",
  FULFILLED: "fulfilled",
  REJECTED: "rejected",
};

function Promise(fn) {
  this.state = PROMISE_STATUS.PENDING;
  this.val = null;
  this.fulfilledHandler = [];
  this.rejectHandler = [];

  const fulfilled = (val) => {
    if (this.state === PROMISE_STATUS.PENDING) {
      this.val = val;
      this.fulfilledHandler.forEach((handler) => handler(val));
      this.state = PROMISE_STATUS.FULFILLED;
    }
  };

  const reject = (reason) => {
    if (this.state === PROMISE_STATUS.PENDING) {
      this.val = reason;
      this.rejectHandler.forEach((handler) => handler(reason));
      this.state = PROMISE_STATUS.REJECTED;
    }
  };

  fn(fulfilled, reject);
}

Promise.prototype.then = function (onFulfilled, onRejected) {
  /**
   * 解析 then 返回的 promise
   * @param {*} promise2 新的 promise 对象
   * @param {*} x onFulfilled 或 onRejected 的返回值 x
   * @param {*} resolve promise2 的 resolve
   * @param {*} reject promise2 的 reject
   */
  function resolvePromise(promise2, x, resolve, reject) {
    if (x === promise2) {
      // 循环引用
      reject(new TypeError("Chaining cycle detected for promise"));
    }

    if (x !== null && (typeof x === "object" || typeof x === "function")) {
      try {
        let then = x.then;
        if (typeof then === "function") {
          then.call(
            x,
            //递归调用，传入y若是Promise对象，继续循环
            (y) => resolvePromise(promise2, y, resolve, reject),
            (r) => reject(r)
          );
        } else {
          resolve(x);
        }
      } catch (e) {
        reject(e);
      }
    } else {
      // x 为普通值
      resolve(x);
    }
  }

  const promise2 = new Promise((resolve, reject) => {
    if (this.state === PROMISE_STATUS.PENDING) {
      if (typeof onFulfilled === "function") {
        this.fulfilledHandler.push(onFulfilled);
      }

      if (typeof onRejected === "function") {
        this.rejectHandler.push(onRejected);
      }
    }

    // onFulfilled, onRejected 是可选参数，如果不是函数就忽略
    if (
      this.state === PROMISE_STATUS.FULFILLED &&
      typeof onFulfilled === "function"
    ) {
      setTimeout(function () {
        try {
          let x = onFulfilled(this.val);
          resolvePromise(promise2, x, resolve, reject);
        } catch (e) {
          reject(e);
        }
      }, 0);
    }

    if (
      this.state === PROMISE_STATUS.REJECTED &&
      typeof onRejected === "function"
    ) {
      setTimeout(function () {
        try {
          let x = onRejected(this.val);
          resolvePromise(promise2, x, resolve, reject);
        } catch (e) {
          reject(e);
        }
      }, 0);
    }
  });

  return promise2;
};

let p = new Promise((resolve, reject) => {
  resolve(1);
});

p.then((data) => 2)
  .then()
  .then()
  .then((data) => {
    console.log(data); //2
  });

// p.then((data) => {
//   return 2; //返回一个普通值
// }).then((data) => {
//   console.log(data); //输出2
// });

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
