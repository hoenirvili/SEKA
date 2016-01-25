define("duckduckgo", ["apicfg","jquery"], function(apicfg, $) {
// main request link
var req;
// hold the first json var temp;
// hold every id
//var tempi;
var temp;

	var request = function(queryString, category) {
		// build the request
		req	=	apicfg.duckduckgo.url +
				queryString +
				apicfg.duckduckgo.format +
				apicfg.duckduckgo.fromat_t[0]+
				apicfg.duckduckgo.pretty[1]+
				apicfg.duckduckgo.misc;
		
		switch(category) {
			case "web":
				$.ajax({
					type:'POST',
					dataType: 'jsonp',
					data: {
						format: 'json'
					},
					url: req,
					success: pageJSON
				});
				break;
			case "news":
				break;
			case "video":
				break;
			case "images":
				break;
		}

		console.log(req);
		console.log(category);
	};
	/**
	 * FULL PAGE CONTENT
	 */
	var pageJSON = function(result) {
		//var i;
		temp = result;
		console.log(temp);
	};
	return {
		request: request
	};
});
