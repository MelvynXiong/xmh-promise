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
      let called = false;
      try {
        const then = x.then;
        if (typeof then === "function") {
          then.call(
            x,
            //递归调用，传入y若是Promise对象，继续循环
            (y) => {
              if (!called) {
                resolvePromise(promise2, y, resolve, reject);
                called = true;
              }
            },
            (r) => {
              if (!called) {
                reject(r);
                called = true;
              }
            }
          );
        } else {
          resolve(x);
        }
      } catch (e) {
        if (!called) {
          reject(e);
          called = true;
        }
      }
    } else {
      // x 为普通值
      resolve(x);
    }
  }

  const promise2 = new Promise((resolve, reject) => {
    if (this.state === PROMISE_STATUS.PENDING) {
      if (typeof onFulfilled === "function") {
        this.fulfilledHandler.push(() => {
          setTimeout(() => {
            try {
              const x = onFulfilled(this.val);
              resolvePromise(promise2, x, resolve, reject);
            } catch (e) {
              reject(e);
            }
          }, 0);
        });
      } else {
        this.fulfilledHandler.push(() => {
          setTimeout(() => {
            resolve(this.val);
          }, 0);
        });
      }

      if (typeof onRejected === "function") {
        this.rejectHandler.push(() => {
          setTimeout(() => {
            try {
              const x = onRejected(this.val);
              resolvePromise(promise2, x, resolve, reject);
            } catch (e) {
              reject(e);
            }
          }, 0);
        });
      } else {
        this.rejectHandler.push(() => {
          setTimeout(() => {
            reject(this.val);
          }, 0);
        });
      }
    }

    // onFulfilled, onRejected 是可选参数，如果不是函数就忽略
    if (this.state === PROMISE_STATUS.FULFILLED) {
      if (typeof onFulfilled === "function") {
        setTimeout(() => {
          try {
            const x = onFulfilled(this.val);
            resolvePromise(promise2, x, resolve, reject);
          } catch (e) {
            reject(e);
          }
        }, 0);
      } else {
        resolve(this.val);
      }
    }

    if (this.state === PROMISE_STATUS.REJECTED) {
      if (typeof onRejected === "function") {
        setTimeout(() => {
          try {
            const x = onRejected(this.val);
            resolvePromise(promise2, x, resolve, reject);
          } catch (e) {
            reject(e);
          }
        }, 0);
      } else {
        reject(this.val);
      }
    }
  });

  return promise2;
};

module.exports = {
  Promise,
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
