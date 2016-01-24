
function Variable(name){
	this.name = name;
	this.range = null;
}

var variables = [
	new Variable("x"),
	new Variable("t")
];

module.exports.definition = Variable
module.exports.defaults = variables
