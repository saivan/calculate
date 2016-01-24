
/**
 * @brief A class to encode a mathematical operator
 * @details An operator can be considered a function 
 * 
 * @param {string} The string representation of the operator
 * @param {precedence} An arbitrary integer that specifies the operator
 * 		precedence, higher precedence requires a higher integer
 * @param {operation} A javascript representation of the function
 * 		for function evaluation and building.
 * @param {latexString} A latex representation of the operation
 */
function Operator(string, precedence, operation, latexString){
	this.name = string;
	this.precedence = precedence;
	this.latexString = latexString===undefined ? string : latexString;
	this.operation = operation===undefined ? string : operation;
}

/**
 * @brief A single input function is a function in the form f(x)
 * @return true if the function is a single input function
 */
Operator.prototype.singleInput = function(){
	return this.singleInput;
}

/**
 * A set of default operators
 */
var operators = [
	new Operator("(", 1, "(", "{\\left({ "), 
	new Operator(")", 1, ")", "}\\right)} "),
	new Operator("+", 2, "+", "}+{"),
	new Operator("-", 2, "-", "}-{"),
	new Operator("*", 3, "*", "}{"),
	new Operator("/", 3, "/", "\\over "),
	new Operator("^", 4),
	new Operator("sin", 5, "Math.sin", "\\sin "),
	new Operator("cos", 5, "Math.cos", "\\cos "),
	new Operator("tan", 5, "Math.tan", "\\tan "),
	new Operator("asin", 5, "Math.asin", "\\arcsin "),
	new Operator("acos", 5, "Math.acos", "\\arccos "),
	new Operator("atan", 5, "Math.atan", "\\arctan "),
	new Operator("exp", 5, "Math.exp", "\\exp "),
	new Operator("log", 5, "Math.log", "\\log ")
];

/**
 * Defining all of the constants required by the 
 */
module.exports.OPEN_BRACKET = operators[0];
module.exports.CLOSE_BRACKET = operators[1];
module.exports.ADD = operators[2];
module.exports.SUBTRACT = operators[3];
module.exports.MULTIPLY = operators[4];
module.exports.DIVISION = operators[5];
module.exports.EXPONENTIATION = operators[6];
module.exports.SIN = operators[7];
module.exports.COSINE = operators[8];
module.exports.TANGENT = operators[9];
module.exports.ARCSIN = operators[10];
module.exports.ARCCOS = operators[11];
module.exports.ARCTAN = operators[12];
module.exports.EXPONENTIAL = operators[13];
module.exports.LOGARITHM = operators[14];

/**
 * Exporting the class definition and default operators
 */
module.exports.definition = Operator;
module.exports.defaults = operators;
