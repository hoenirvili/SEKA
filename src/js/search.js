define ("search", ["facebook", "google"], function(facebook, google) {

var action = function(queryString, filters, options, category) {
		//cache all vars
		var i;
		if(filters) {
			for (i=0; i<filters; i++) {
				switch(options[i]) {
					case "DuckDuckGo":
						break;
					case "Bing":
						break;
					case "Google":
						google.request(queryString, category);
						break;
					case "Facebook":
						facebook.request(queryString, category);
						break;
					}
			}//for
		} else {
			facebook.request(queryString, category);
			google.request(queryString, category);
		}
	};

	return {
		action: action
	};
});
