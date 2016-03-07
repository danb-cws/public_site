
exports.name = "dan";

exports.sayName = function(){
    console.log('in sayname');
    console.log('Yo: '+this.name);
};

exports.sayName2 = function(){
    console.log('in sayname2');
    this.sayName();
};