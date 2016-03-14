module.exports.name = "danitest3";

require("../sass/main.scss");

module.exports.sayName = function () {
  console.log('in sayname');
  console.log("Yo: " + this.name);
  //document.write('<span class="background">Yez22:</span> ' + this.name);
};

module.exports.sayName2 = function () {
  console.log("in sayname 222");
  this.sayName();
};

