import '../sass/base.scss';
// import { sayName, sayName2 } from './testvar';
// sayName();
// sayName2();

import * as greet from './testvar';
// or :
// const greet = require('./testvar');

// console.log(`client.js: hello, greet name: ${greet.name}`);

greet.default();
greet.sayName();
greet.sayName2();

if (module.hot) {
  module.hot.accept();
}
