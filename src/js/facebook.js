define("facebook", ["template", "apicfg", "jquery"], function(template, apicfg, $) {
	// main request link
	var req;
	// hold the first json
	var temp;
	// hold every id
	var tempi;
	

	var request = function(queryString) {
		//build the request
		req = apicfg.facebook.url + queryString + apicfg.facebook.type + apicfg.facebook.limit + apicfg.facebook.token;
		$.getJSON(req, getPageList);
	};

	var getPageList = function(result) {
		var i;
		temp = result;
		for (i=0; i<result.data.length; i++) {
			temp.data[result.data[i].id] = result.data[i];
			$.getJSON('https://graph.facebook.com/' + result.data[i].id + '/?fields=about' + apicfg.facebook.token, appendResults);
		}
	};

	var appendResults = function(results) {
		tempi = results.id;
		$('.facebook-results > ul').append(
			template.results(temp.data[tempi].id, temp.data[tempi].name, results.about)
		).appendTo('.search-result-wrapper');
	};


	return {
		request: request
	};
});
