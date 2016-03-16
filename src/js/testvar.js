module.exports.name = "dan";

require("../sass/main.scss");

module.exports.sayName = function () {
  console.log("in sayName, Yo: " + this.name);
  //document.write('<span class="background">Yes:</span> ' + this.name);
};

module.exports.sayName2 = function () {
  console.log("in sayName2");
  this.sayName();
};

