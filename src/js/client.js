var greet = require("./testvar");
require("../sass/alt.scss");
console.log("hello bpm2322 xname: " + greet.name);
greet.sayName();
greet.sayName2();
console.log('hello');

if (module.hot) {
    module.hot.accept();
}