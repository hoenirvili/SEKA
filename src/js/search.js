define ("search", ["facebook"], function(facebook) {

var action = function(queryString, filters, options) {
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
						break;
					case "Facebook":
						facebook.request(queryString);
						break;
					}
			}//for
		} else {
			facebook.request(queryString);
		}
	};

	return {
		action: action
	};
});
