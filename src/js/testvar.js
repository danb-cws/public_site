exports.name = 'dan';

require("../sass/main.scss");

exports.sayName = function () {
  console.log('in sayname');
  console.log('Yo: ' + this.name);
  document.write('<span class="special">Yo:</span> ' + this.name);
};

exports.sayName2 = function () {
  console.log('in sayname2');
  this.sayName();
};
