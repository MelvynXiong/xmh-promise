const { Promise } = require("../promise");

new Promise((resolve, reject) => {
  console.log("外部promise");
  resolve();
})
  .then(() => {
    console.log("外部第一个then");
    return new Promise((resolve, reject) => {
      console.log("内部promise");
      resolve();
    })
      .then(() => {
        console.log("内部第一个then");
        return 2
      })
      .then(() => {
        console.log("内部第二个then");
        return 3
      });
  })
  .then((val) => {
    console.log('res', val)
    console.log("外部第二个then");
  });
