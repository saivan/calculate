
// Get the text area that we will be getting data from
var textArea = document.getElementById('textArea');
var resultArea = document.getElementById('resultArea');

// Process the user input when the submit button is pressed
var submitButton = document.getElementById('submitButton');
submitButton.onmouseup = function(){
	
	// Convert the user input into a javascript function (with no variables)
	var userInput = textArea.value;
	var userFunction = calculate.stringToFunction(userInput, undefined, [], undefined);

	// Place the result of evaluating the function in the text box
	var result = userFunction()
	resultArea.innerHTML = result ? result.toFixed(6) : "Invalid Expression";

}
