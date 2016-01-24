
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

