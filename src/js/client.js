import '../sass/base.scss';
import * as greet from './testvar';
// var greet = require('./testvar');

// console.log(`client.js: hello, greet name: ${greet.name}`);
greet.sayName();
greet.sayName2();

if (module.hot) {
  module.hot.accept();
}
