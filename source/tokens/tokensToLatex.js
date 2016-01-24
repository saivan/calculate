
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
