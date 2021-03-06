
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
