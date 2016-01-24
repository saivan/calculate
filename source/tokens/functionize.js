
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
