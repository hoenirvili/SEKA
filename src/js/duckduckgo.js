define("duckduckgo", ["template", "apicfg", "jquery"], 

function(template, apicfg, $) {
// main request link var req;
// hold the first json var temp;
// hold every id //var tempi;
// var temp;

	var request = function(queryString, category) {
		// build the request
		var req	=	apicfg.duckduckgo.url +
					queryString +
					apicfg.duckduckgo.format +
					apicfg.duckduckgo.fromat_t[0]+
					apicfg.duckduckgo.pretty[1]+
					apicfg.duckduckgo.no_html[1]+
					apicfg.duckduckgo.misc;
		
		console.log(req);	
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
		
		console.log(result.Topics);
		//TODO:  repair cod
		var topicLen = result.Topics;
		// UNDEFINED
		var topic = result.Topics;

		for(i=0; i<lenResult; i++) {
			//if everything is define just show them
			if( result.RelatedTopics[i].FirstURL &&
				result.RelatedTopics[i].Icon.URL &&
				result.RelatedTopics[i].Text &&
				result.RelatedTopics[i].Result) {
					var html_append = template.duckduckgoResults(
							result.RelatedTopics[i].Result,
							result.RelatedTopics[i].FirstURL,
							result.RelatedTopics[i].Icon.URL,
							result.RelatedTopics[i].Text).fullpage();
					$('.duckduckgo-results > ul').append(html_append).appendTo('.search-result-wrapper');
			}
		}//for
		/**
		for(i=0; i<topicLen; i++) {
			if( topic[i].FirstURL &&
				topic[i].Icon.URL &&
				topic[i].Text &&
				topic[i].Result) {
					html_append = template.duckduckgoResults(
						topic[i].FirstURL,
						topic[i].Icon.URL,
						topic[i].Text,
						topic[i].Result).fullpage();
				$('.duckduckgo-results > ul').append(html_append).appendTo('.search-result-wrapper');
			}
		}*/
	};

	return {
		request: request
	};

});
