export const name = 'dan';
// require('../sass/base.scss');
import '../sass/base.scss';

// module.exports.sayName = function () {
export function sayName() {
  console.log(`in sayName, Yo: ${name}`);
}

/*module.exports.sayName2 = function () {
  console.log('in sayName2');
  this.sayName();
};*/

// exports.sayName2 = () => {
export function sayName2() {
  console.log('in sayName2');
  sayName();
}

