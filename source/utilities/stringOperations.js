
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
