
define ("search", ["facebook", "google","twitter","duckduckgo"], 

function(facebook, google, twitter, duckduckgo) {

	var action = function(queryString, filters, options, category) {
		//cache all vars
		var i;
		if(filters) {
			for (i=0; i<filters; i++) {
				switch(options[i]) {
					case "DuckDuckGo":
						duckduckgo.request(queryString, category);
						break;
					case "Bing":
						break;
					case "Google":
						google.request(queryString, category);
						break;
					case "Facebook":
						facebook.request(queryString, category);
						break;
                    case "Twitter":
                        twitter.request(queryString, category);
                        break;
					}
			}//for
		} else {
			facebook.request(queryString, category);
			google.request(queryString, category);
            twitter.request(queryString, category);
			duckduckgo.request(queryString, category);
		}
	};

	return {
		action: action
	};
});
