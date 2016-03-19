module.exports.name = 'dan';

require('../sass/base.scss');

module.exports.sayName = function () {
  console.log('in sayName, Yo: ' + this.name);
};

module.exports.sayName2 = function () {
  console.log('in sayName2');
  this.sayName();
};

