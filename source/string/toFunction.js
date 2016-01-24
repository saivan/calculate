
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
