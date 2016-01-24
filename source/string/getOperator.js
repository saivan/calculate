
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
