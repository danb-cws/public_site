// var greet = require('./testvar');
import * as greet from './testvar';

import '../sass/base.scss';
// console.log(`client.js: hello, greet name: ${greet.name}`);
greet.sayName();
greet.sayName2();

if (module.hot) {
  module.hot.accept();
}
