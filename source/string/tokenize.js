
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
	if (operators === undefined) { operators = defaultOperators }
	if (variables === undefined) { variables = defaultVariables }
	if (constants === undefined) { constants = defaultConstants }

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
		return string[0] === "-" && (
			tokens.length===0 || [MULTIPLY, DIVISION].contains(tokens.last())
		)
	}

	// Checks if a token is an operand (Constant, Variable or Number)
	function isOperand(token){
		return token instanceof Variable
			|| token instanceof Constant
			|| typeof token === "number"
	}

	/**
	 * TOKENISING THE INPUT
	 */

	// Remove all white spaces
	string = removeSpaces(string)

	// Cut down the string whilst converting it to tokens
	var tokens = []
	while(string.length){

		// Scan the beginning for an operator and an operand
		var operator = getOperator(string, operators);
		var operand = getOperand(string, variables, constants)
		var lastToken = tokens.last()

		// Deal with "-" at the begining and after multiplication or division
		if(ambiguousLeadingNegative(string, tokens) && operand){
			tokens.push(operand.value)
			string = operand.remainingString
			continue
		}

		// Check for an operator, if found add it to the array
		if(operator){

			// Append a multiplication symbol for the following patterns:
			// 		<)><Function>  OR  <Operand><(>  OR  <Operand><Function>
			if(isOperand(lastToken)
				&& (operator.value===OPEN_BRACKET || isFunction(operator.value))
				|| (lastToken===CLOSE_BRACKET && isFunction(operator.value))){
				tokens.push(MULTIPLY)
			}

			tokens.push(operator.value)
			string = operator.remainingString
			continue
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
			string = operand.remainingString
			continue
		}

		// If we reach this point, we have an error
		break
	}

	// If the string isn't empty, we found invalid tokens during parsing
	return string==="" ? tokens : undefined
}

module.exports = stringToTokens
