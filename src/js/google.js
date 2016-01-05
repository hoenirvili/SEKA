define("google", ["apicfg", "template"], function() {

	var request = function(queryString) {
		console.log(queryString);
	};

	return {
		request: request
	};
});
