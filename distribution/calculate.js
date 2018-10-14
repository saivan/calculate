(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){

/**
 * Extend the array prototype to include a set of handy functions
 */
var extendArray = require('./utilities/ArrayExtensions')
extendArray();

/**
 * Include the various methods required for the calculator 
 */
var calculate = {

	// Useful functions
	tokenize : require('./string/tokenize'),
	tokensToString : require('./tokens/tokensToString'),
	functionize : require('./tokens/functionize'),
	latexify : require('./tokens/tokensToLatex'),
	stringToFunction : require('./string/toFunction'),

	// Definitions to access constants=
	Operator : require('./primitive/Operator'),
	Variable : require('./primitive/Variable'),
	Constant : require('./primitive/Constant'),

	// Useful utility functions
	Page : require('./utilities/Page')

}

/**
 * We attach the library to the users global namespace to allow
 * them to use it in their own scripts.
 */
 
window ? 
	window.calculate = calculate : 
	module.exports = calculate

},{"./primitive/Constant":2,"./primitive/Operator":3,"./primitive/Variable":4,"./string/toFunction":7,"./string/tokenize":8,"./tokens/functionize":9,"./tokens/tokensToLatex":10,"./tokens/tokensToString":11,"./utilities/ArrayExtensions":12,"./utilities/Page":13}],2:[function(require,module,exports){

function Constant(name, value, latexString, nativeString){
	this.name = name;
	this.value = value;
	this.latexString = latexString===undefined ? name : latexString;
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

},{}],3:[function(require,module,exports){

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

},{}],4:[function(require,module,exports){

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

},{}],5:[function(require,module,exports){

var chopFloat = require("../utilities/stringOperations").chopFloat

// Gets a variable, a constant or a number from the front of a string, from the list
// Returns NaN if there is no number or variable at the start
// Returns {value:[NUMBER, CONSTANT OR VARIABLE], remainingString: [string]}
function getOperand(string, variables, constants){

	// Check the start of the string for every variable
	var variableIndex = variables.map(function(o){
		return o.name
	}).map(function(o){
		return string.startsWith(o)
	}).indexOf(true)

	if(variableIndex!==-1){

		// Find the remaining string
		remainingString = string.replace(
			variables[variableIndex].name, 
			""
		);

		// Return the value and the remaining string
		return {
			value: variables[variableIndex],
			remainingString: remainingString
		}
	}

	// Check for constants at the start of the string
	var constantIndex = constants.map(function(o){
		return o.name
	}).map(function(o){
		return string.startsWith(o)
	}).indexOf(true)

	if(constantIndex!==-1){

		// Find the remaining string
		remainingString = string.replace(
			constants[constantIndex].name, 
			""
		);

		// Return the value and the remaining string
		return{
			value: constants[constantIndex],
			remainingString: remainingString
		}
	}

	// Check for a number at the start of the string
	floatObject = chopFloat(string);
	if(!isNaN(floatObject.value)){
		return floatObject;
	} 

	// Return undefined if we don't have a variable or a number
	return undefined

}

module.exports = getOperand


},{"../utilities/stringOperations":14}],6:[function(require,module,exports){

/**
 * @brief Gets a valid operator from the start of a string
 * @details This function scans the star t of the input string for
 * 		an operator in the provided operator list.
 * 
 * @param string The string to check for operators
 * @param operators The list of recognised <Operator> objects
 * 
 * @return If an operator was found, an object containing:
 * 		{	
 * 			value: A reference to the <Operator>, 
 * 			remainingString: The remainder of the string with the 
 * 				<Operator> removed from the front
 * 		}
 * 		Otherwise, this method simply returns undefined
 */
function getOperator(string, operators){

	// Check the start of the string for an opperator and return
	var operatorIndex = operators.map(function(o){
		return o.name
	}).map(function(o){
		return string.startsWith(o)
	}).indexOf(true)

	if(operatorIndex!==-1){

		// Remove the operator at the front of the string
		remainingString = string.replace(
			operators[operatorIndex].name, 
			""
		);

		// Return the operator and the remaing string
		return {
			value: operators[operatorIndex],
			remainingString: remainingString
		}
	}

	// If there was no operator, return undefined
	return undefined

}

module.exports = getOperator

},{}],7:[function(require,module,exports){

var stringToTokens = require('../string/tokenize')
var tokensToFunction = require('../tokens/functionize')

var defaultOperators = require('../primitive/Operator').defaults
var defaultConstants = require('../primitive/Constant').defaults
var defaultVariables = require('../primitive/Variable').defaults

/**
 * @brief Converts a string directly to a function
 * @details Simply converts the string into a set of tokens, then converts
 * 		the result directly to a javascript function. Useful as an 
 * 		abstraction to avoid calling both functions directly.
 * 
 * @param {string} The string to convert to a javascript function
 * @param {operators} (optional) A set of allowed <Operator> objects
 * @param {variables} (optional) A set of allowed <Variable> objects
 * @param {constants} (optional) A set of allowed <Constant> objects
 * @return A function reference if the conversion was successful,
 * 		otherwise the function simply returns undefined
 */
function stringToFunction(string, operators, variables, constants){

	// Setting default values in the case that variables weren't provided
	if(operators === undefined){ operators = defaultOperators }
	if(variables === undefined){ variables = defaultVariables }
	if(constants === undefined){ constants = defaultConstants }

	// First convert to tokens then convert the result to a function
	var tokens = stringToTokens(string, operators, variables, constants);
	var functionRef = tokensToFunction(tokens, operators, variables, constants);
	return functionRef

}

module.exports = stringToFunction;

},{"../primitive/Constant":2,"../primitive/Operator":3,"../primitive/Variable":4,"../string/tokenize":8,"../tokens/functionize":9}],8:[function(require,module,exports){

var removeSpaces = require('../utilities/stringOperations').removeSpaces
var getOperator = require('../string/getOperator')
var getOperand = require('../string/getOperand')

var defaultOperators = require('../primitive/Operator').defaults
var defaultConstants = require('../primitive/Constant').defaults
var defaultVariables = require('../primitive/Variable').defaults

var Operator = require('../primitive/Operator').definition 
var Variable = require('../primitive/Variable').definition
var Constant = require('../primitive/Constant').definition

var CLOSE_BRACKET = require('../primitive/Operator').CLOSE_BRACKET
var OPEN_BRACKET = require('../primitive/Operator').OPEN_BRACKET
var MULTIPLY = require('../primitive/Operator').MULTIPLY
var DIVISION = require('../primitive/Operator').DIVISION

/**
 * @brief Tokenises a string into an array of tokens
 * @details This function attempts to parse a string into an array of
 * 		valid tokens, which may be <Number>, <Operator>, <Variable>
 * 		or <Constant> objects.
 * 
 * @param string The string that requires tokenising
 * @param operators An array of <Operator> objects to recognise
 * @param variables An array of <Variable> objects to recognise
 * @param constants An array of <Constant> objects to recognise
 * @return An array representation of the string containing Operator, 
 * 		Variable and Constant objects. If the tokeniser encountered
 * 		an invalid character, it will return undefined.
 */
function stringToTokens(string, operators, variables, constants){

	// Setting default values in the case that variables weren't provided
	if(operators === undefined){ operators = defaultOperators }
	if(variables === undefined){ variables = defaultVariables }
	if(constants === undefined){ constants = defaultConstants }

	/**
	 * CASE CHECKING FUNCTIONS
	 */

	// Decides if an operator is a function that takes a single input,
	// returns true for sin, cos, tan, exp etc...
	function isFunction(operator){
		var operatorIndex = operators.indexOf(operator)
		return operatorIndex >= 7 
	}

	// Returns true if we have a negative at the beginning of the 
	function ambiguousLeadingNegative(string, tokens){
		return string[0]==="-" && (
			tokens.length===0 || 
			[MULTIPLY, DIVISION].contains(tokens.last())
		)
	}

	// Checks if a token is an operand (Constant, Variable or Number)
	function isOperand(token){
		return token instanceof Variable 
			|| token instanceof Constant 
			|| typeof token === "number";
	}

	/**
	 * TOKENISING THE INPUT
	 */

	// Remove all white spaces
	string = removeSpaces(string)

	// Cut down the string whilst converting it to tokens
	var tokens = [];
	while(string.length){

		// Scan the beginning for an operator and an operand
		var operator = getOperator(string, operators);
		var operand = getOperand(string, variables, constants)
		var lastToken = tokens.last()

		// Deal with "-" at the begining and after multiplication or division
		if(ambiguousLeadingNegative(string, tokens) && operand){
			tokens.push(operand.value);
			string = operand.remainingString;
			continue;
		}

		// Check for an operator, if found add it to the array
		if(operator){

			// Append a multiplication symbol for the following patterns:
			// 		<)><Function>  OR  <Operand><(>  OR  <Operand><Function>
			if(isOperand(lastToken) 
				&& (operator.value===OPEN_BRACKET || isFunction(operator.value)) 
				|| (lastToken===CLOSE_BRACKET && isFunction(operator.value))){
				tokens.push(MULTIPLY);
			}

			tokens.push(operator.value);
			string = operator.remainingString;
			continue;
		}
 
		// Check for a number or a variable
		if(operand){

			// If our last token was also an operand, we add a multiplication
			if(isOperand(lastToken)){
				tokens.push(MULTIPLY)
			}

			// An operand that comes immediately after a function needs brackets
			isFunction(lastToken) ? 
				tokens.push(OPEN_BRACKET, operand.value, CLOSE_BRACKET) :
				tokens.push(operand.value)
			string = operand.remainingString;
			continue;
		}

		// If we reach this point, we have an error
		break;
	}

	// If the string isn't empty, we found invalid tokens during parsing
	return string==="" ? tokens : undefined
}

module.exports = stringToTokens;

},{"../primitive/Constant":2,"../primitive/Operator":3,"../primitive/Variable":4,"../string/getOperand":5,"../string/getOperator":6,"../utilities/stringOperations":14}],9:[function(require,module,exports){

var defaultOperators = require('../primitive/Operator').defaults
var defaultConstants = require('../primitive/Constant').defaults
var defaultVariables = require('../primitive/Variable').defaults

var Operator = require('../primitive/Operator').definition 
var Variable = require('../primitive/Variable').definition
var Constant = require('../primitive/Constant').definition

/**
 * @brief Converts a series of tokens into a javascript function
 * @details Constructs a new function object by attempting to convert a set
 * 		of tokens into a javascript function. This function will return a 
 * 		valid function reference if the tokens comprised a valid function,
 * 		you can validate the tokens to check this.
 * 
 * @param  {tokens} An array of tokens 
 * @return A function reference that can be evaluated
 */
function functionize(tokens, operators, variables, constants){

	// Setting default values in the case that variables weren't provided
	if(operators === undefined){ operators = defaultOperators }
	if(variables === undefined){ variables = defaultVariables }
	if(constants === undefined){ constants = defaultConstants }

	// Get the variables into a list
	var variableString = ""
	for(var i=0; i<variables.length; i++){
		variableString += variables[i].name 
		if(i!=variables.length-1){
			variableString += ", ";
		}
	}

	// Construct the function string
	var functionString = "return "
	for(var i=0; i<tokens.length; i++){

		// If we have a number, we must add 
		if(typeof tokens[i] === "number"){
			functionString += tokens[i].toString();

		// If we have an operator, add it to the function string 
		} else if(tokens[i] instanceof Operator){
			functionString += tokens[i].operation;

		// If we have a variable, add it
		} else if(tokens[i] instanceof Variable){
			functionString += tokens[i].name;

		// Constants should also be accounted for
		} else if(tokens[i] instanceof Constant){
			functionString += tokens[i].nativeString
		}
	}

	// Make the function
	var functionReference = Function(variableString, functionString);
	return functionReference;
}

module.exports = functionize

},{"../primitive/Constant":2,"../primitive/Operator":3,"../primitive/Variable":4}],10:[function(require,module,exports){

var Operator = require('../primitive/Operator').definition 
var Variable = require('../primitive/Variable').definition
var Constant = require('../primitive/Constant').definition

/**
 * @brief Converts a set of valid tokens to a latex string
 * @details Given a set of valid tokens, this function will 
 *		produce valid latex that should correctly typeset with
 *		any latex distribution of choice.
 * 
 * @param {tokens} A set of valid token primitives
 * @return A latex string representation of the tokens
 */
function tokensToLatex(tokens){

	var string = "{ "
	for(var i=0; i<tokens.length; i++){

		// If we have a number, we must add 
		if(typeof tokens[i] === "number"){
			string += tokens[i].toString();

		// If we have an operator, add it to the function string 
		} else if(tokens[i] instanceof Operator){
			string += tokens[i].latexString;

		// If we have a variable, add it
		} else if(tokens[i] instanceof Variable){
			string += tokens[i].name;

		// Constants should also be accounted for
		} else if(tokens[i] instanceof Constant){
			string += tokens[i].latexString
		}

	}

	string += " }"
	return string

}

module.exports = tokensToLatex

},{"../primitive/Constant":2,"../primitive/Operator":3,"../primitive/Variable":4}],11:[function(require,module,exports){

/**
 * @brief Converts a set of tokens 
 * 
 * @param tokens An array of tokens that can be variables, constants, numbers and operators
 * @return A string that is the direct unpacked version of the token array
 */
function tokensToString(tokens, debugging){

	// Construct the string by getting the names of the tokens
	// add commas inbetween tokens if we are debugging
	var string = ""
	for(var i=0; i<tokens.length; i++){
		string += (tokens[i].name ? tokens[i].name : tokens[i]) 
		string += debugging ? ", " : ""
	}

	// Remove the final comma in the case that we were debugging
	if(debugging && string.length>0){
		string = string.slice(0, -2)
	}

	return string
}

module.exports = tokensToString

},{}],12:[function(require,module,exports){

function extendArray(){
	Array.prototype.last = function(){return this[this.length-1]}
	Array.prototype.first = function(){return this[0]}
	Array.prototype.contains = function(x){return this.indexOf(x)!==-1}
}

module.exports = extendArray;

},{}],13:[function(require,module,exports){

/**
 * @brief Selects the first element matching the css query
 * 
 * @param  {query} A css string to select a particular element
 * @return A HTML Node matching the query
 */
function selectFirst(query){
	return document.querySelector(query)
}

/**
 * @brief Selects every element matching the css query
 * 
 * @param  {query} A css string to select a particular element
 * @return An array of HTML nodes matching the query
 */
function selectAll(query){
	return Array.from(document.querySelectorAll(query))
}

/**
 * @brief Gets the text from a page item
 * @details Gets a string from the innerHTML of a HTML node
 * 
 * @param  {HTMLNode} The node to extract the insides of
 * @return The innerHTML of the given node
 */
function getText(HTMLNode){
	return HTMLNode.innerHTML
}

/**
 * @brief Puts a string into the html node
 * @details Replaces the HTML Node's innerHTML with {string}
 * 
 * @param {HTMLNode} The node to place the string into
 * @param {string} The string to add to the node
 */
function putText(HTMLNode, string){
	HTMLNode.innerHTML = string;
}

module.exports.selectFirst = selectFirst
module.exports.selectAll = selectAll
module.exports.getText = getText
module.exports.putText = putText

},{}],14:[function(require,module,exports){

/**
 * @brief Removes a float from the beginning of a string 
 * @details The float is returned whilst a shortened version of the
 * 		string is returned. 
 * 
 * @param string The string
 * @return an object containing the following properties
 * 		value: The float value returned by parseFloat
 * 		remainingString: The same string with the float value removed
 */
function chopFloat(string){
	var value = parseFloat(string)
	string = string.substr(findLastNumber(string), string.length)
	return {value:value, remainingString:string};
}

/**
 * @brief Finds the index of the last numeral
 * @details Given a string with a number at the beginning, this 
 * 		function will return the index of the last number eg:
 * 		o '-12.23sin' : returns 5 
 * 		o '.2345boo'  : returns 4
 * 
 * @param string The string to check
 * @return The last index of the number
 */
function findLastNumber(string){

	var decimalSpotted=false, i=0;

	// Allow for the inclusion of a negative at the beginning
	if(string[0]==="-" || isNumeral(string[0])){
		i++;
	} else if(string[0]==="."){
		i++; decimalSpotted=true;
	} else { // illegal character
		return 0;
	}

	// Find the <number>
	var substring = "";
	for(; i<string.length; i++){
		substring = string.substr(i-1, 2);
		if(isNumeral(substring[0]) & ~isNumeral(substring[1])){
			if(substring[0]==="." && decimalSpotted===false){
				decimalSpotted=true;
			} else if(substring[0]==="."){ // Too many negatives
				return -1;
			}
			return i;
		}
	}
	return i==string.length ? i : 0;
}

/**
 * @brief This function returns true if character is a numeral
 * @details Given any of the following characters:
 * 		0, 1, 2, 3, 4, 5, 6, 7, 8, 9, .
 * 		This function will return true, otherwise it returns false
 * 
 * @param character the character to check
 * @return true if the character is a numeral, false otherwise
 */
function isNumeral(character){
	return "0123456789.".indexOf(character)!==-1 ? true : false;
}

/**
 * @brief This function removes any white spaces from a string
 * @details For example, 
 * 		- "hello world" will be converted to "helloworld"
 * 		- "  this is 1 2 3 4" will be converted to "thisis1234"
 * 
 * @param string the string to modify
 * @return the modified string, sans spaces
 */
function removeSpaces(string){
	return string.replace(/ /g,'')
}

/**
 * Exporting the necessary modules
 */
module.exports.chopFloat = chopFloat
module.exports.findLastNumber = findLastNumber
module.exports.isNumeral = isNumeral
module.exports.removeSpaces = removeSpaces

},{}]},{},[1]);
