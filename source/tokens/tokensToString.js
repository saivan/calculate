
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
