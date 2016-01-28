
define ("search", ["facebook", "google","twitter","duckduckgo","suri"], function(facebook, google,twitter,duckduckgo,suri) {



	var action = function(queryString, filters, options, category) {
		//cache all vars
		var i;
		if(filters) {
			for (i=0; i<filters; i++) {
				switch(options[i]) {
					case "DuckDuckGo":
						duckduckgo.request(queryString, category);
						break;
					case "Google":
						google.request({},queryString, category);
						break;
					case "Facebook":
						facebook.request(queryString, category);
						break;
                    case "Twitter":
                        twitter.request(queryString, category);
                        break;
                    case "Instagram":
                    	alert("good");
                    	break;
					}
			}//for
		} else {
			facebook.request(queryString, category);
			google.request({}, queryString, category);
            twitter.request(queryString, category);
			duckduckgo.request(queryString, category);
		}

    suri.changeUrlParam('s',queryString);

	};
	return {
		action: action
	};
});
