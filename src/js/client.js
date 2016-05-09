import '../sass/base.scss';

import * as greet from './testvar';
// or :
// const greet = require('./testvar');

greet.default();
greet.printName();

if (module.hot) {
  module.hot.accept();
}
