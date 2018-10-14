
/**
 * Extend the array prototype to include a set of handy functions
 */
var extendArray = require('./utilities/ArrayExtensions')
extendArray();

/**
 * Include the various methods required for the calculator
 */

// Useful functions
export const tokenize = require('./string/tokenize')
export const tokensToString = require('./tokens/tokensToString')
export const functionize = require('./tokens/functionize')
export const latexify = require('./tokens/tokensToLatex')
export const stringToFunction = require('./string/toFunction')

// Definitions to access constants=
export const Operator = require('./primitive/Operator')
export const Variable = require('./primitive/Variable')
export const Constant = require('./primitive/Constant')

// Useful utility functions
export const Page = require('./utilities/Page')

console.log("hello");
