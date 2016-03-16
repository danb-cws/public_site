var greet = require("./testvar");
require("../sass/alt.scss");
console.log("hello, greet name: " + greet.name);
greet.sayName();
greet.sayName2();

if (module.hot) {
    module.hot.accept();
}