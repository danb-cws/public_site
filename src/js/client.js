import '../sass/base.scss';

import * as greet from './testvar';
// or :
// const greet = require('./testvar');

// console.log(`client.js: hello, greet name: ${greet.name}`);

greet.default();
greet.printName();

if (module.hot) {
  module.hot.accept();
}
