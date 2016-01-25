define("duckduckgo", ["template", "apicfg", "jquery"], function(template, apicfg, $) {
// main request link var req;
// hold the first json var temp;
// hold every id //var tempi;
//var temp;

	var request = function(queryString, category) {
		// build the request
		var req	=	apicfg.duckduckgo.url +
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
	};
	/**
	 * FULL PAGE CONTENT
	 */
	var pageJSON = function(result) {
		var i, lenResult = result.RelatedTopics.length;
		//temp = result;
		
		for(i=0; i<lenResult; i++) {
			//if everything is define just show them
			if(	result.RelatedTopics[i].Result &&
				result.RelatedTopics[i].Icon.URL &&
				result.RelatedTopics[i].Text ) {
				
					var t = template.duckduckgoResults(
							result.RelatedTopics[i].Result,
							result.RelatedTopics[i].Icon.URL,
							result.RelatedTopics[i].Text).fullpage();
					$('.duckduckgo-results > ul').append(t).appendTo('.search-result-wrapper');

			}
		}

	};

	

	return {
		request: request
	};

});
