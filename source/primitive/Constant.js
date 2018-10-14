
function Constant(name, value, latexString, nativeString){
	this.name = name;
	this.value = value;
	this.latexString = latexString == null ? name : latexString;
	this.nativeString = nativeString;
}

var constants = [
	new Constant("pi", 3.141592654, "\\pi", "Math.PI"),
	new Constant("π", 3.141592654, "\\pi", "Math.PI"),
	new Constant("e", 2.718281828, "e", "Math.E"),
	new Constant("tau", 6.283185307, "\\tau", "2*Math.PI")
];

module.exports.definition = Constant;
module.exports.defaults = constants;
