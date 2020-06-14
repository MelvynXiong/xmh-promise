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
  let res = null;

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
    res = onFulfilled(this.val);
  }

  if (
    this.state === PROMISE_STATUS.REJECTED &&
    typeof onRejected === "function"
  ) {
    res = onRejected(this.val);
  }
  return new Promise((resolve, reject) => {});
};

const p1 = new Promise((resolve, reject) => {
  console.log(1);
  setTimeout(function () {
    resolve(2);
  }, 100);
});

p1.then((val) => {
  console.log(val + 2);
});
