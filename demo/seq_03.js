const { Promise } = require("../promise");

new Promise((resolve, reject) => {
  console.log("外部promise");
  resolve();
})
  .then(() => {
    console.log("外部第一个then");
    let p = new Promise((resolve, reject) => {
      console.log("内部promise");
      resolve();
    });
    p.then(() => {
      console.log("内部第一个then");
    });
    p.then(() => {
      console.log("内部第二个then");
    });
  })
  .then(() => {
    console.log("外部第二个then");
  });
