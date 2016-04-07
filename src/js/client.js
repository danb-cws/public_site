// var greet = require('./testvar');
import * as greet from './testvar';

// require('../sass/alt.scss');
import '../sass/alt.scss';
// console.log(`client.js: hello, greet name: ${greet.name}`);
greet.sayName();
greet.sayName2();

if (module.hot) {
  module.hot.accept();
}
