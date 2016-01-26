
/**
 * @brief Selects the first element matching the css query
 * 
 * @param  {query} A css string to select a particular element
 * @return A HTML Node matching the query
 */
function selectFirst(query){
	return document.querySelector(query)
}

/**
 * @brief Selects every element matching the css query
 * 
 * @param  {query} A css string to select a particular element
 * @return An array of HTML nodes matching the query
 */
function selectAll(query){
	return Array.from(document.querySelectorAll(query))
}

/**
 * @brief Gets the text from a page item
 * @details Gets a string from the innerHTML of a HTML node
 * 
 * @param  {HTMLNode} The node to extract the insides of
 * @return The innerHTML of the given node
 */
function getText(HTMLNode){
	return HTMLNode.innerHTML
}

/**
 * @brief Puts a string into the html node
 * @details Replaces the HTML Node's innerHTML with {string}
 * 
 * @param {HTMLNode} The node to place the string into
 * @param {string} The string to add to the node
 */
function putText(HTMLNode, string){
	HTMLNode.innerHTML = string;
}

module.exports.selectFirst = selectFirst
module.exports.selectAll = selectAll
module.exports.getText = getText
module.exports.putText = putText
