
var Page = calculate.Page

// This function performs the test
function runImplicitTest(string){
	var tokens = calculate.tokenize(string);
	var tokenString = calculate.tokensToString(tokens, true);
	return tokenString;
}

// Run the tests on every test element in the page
var testResults = 
	Page.selectAll('.testContainer #input span')
		.map(Page.getText)
		.map(runImplicitTest);

// Place the results into the results sections of the html
function addResult(HTMLElement, i){
	HTMLElement.innerHTML = testResults[i];
}

Page.selectAll('.testContainer #result span')
	.map(addResult)

// Determine which tests passed
var expectedOutputs = 
	Page.selectAll('.testContainer #expected span')
		.map(Page.getText)

var passedTests = expectedOutputs.map(function(output, i){
	console.log(output, testResults[i])
	return output === testResults[i]
})

// Attach the pass or fail class to the corresponding test containers
var testContainers = Page.selectAll(".testContainer");
passedTests.forEach(function(passed, i){
	testContainers[i].className += passed ? " passed" : " failed"
})

