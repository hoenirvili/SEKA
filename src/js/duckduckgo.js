define("duckduckgo", ["template", "apicfg", "jquery"], 

function(template, apicfg, $) {

	var request = function(queryString, category) {
		// build the request
		var req	=	apicfg.duckduckgo.url +
					queryString +
					apicfg.duckduckgo.format +
					apicfg.duckduckgo.fromat_t[0]+
					apicfg.duckduckgo.pretty[1]+
					apicfg.duckduckgo.no_html[1]+
					apicfg.duckduckgo.misc;
		
		//console.log(req);	
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
				$.ajax({
					type:'POST',
					dataType:'jsonp',
					url: req,
					success: imageJSON
				});
				break;
		}
	};
	/**
	 * FULL PAGE CONTENT
	 */
	var pageJSON = function(result) {
		var i, lenResult = result.RelatedTopics.length, topics;

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
			}//if

			if(result.RelatedTopics[i].hasOwnProperty('Topics')) {
				topics = result.RelatedTopics[i].Topics;
				appendEveryTopic(topics);
			}
		}//for
	};
	var appendEveryTopic = function(topics) {
		for(var i=0;i<topics.length; i++) {
			var topic_append = template.duckduckgoResults(
				topics[i].Result, topics[i].FirstURL, 
				topics[i].Icon.URL, topics[i].Text).fullpage();
				$('.duckduckgo-results > ul').append(topic_append).appendTo('.search-result-wrapper');
		}//for
	};//func


	/**
	 * IMAGE PAGE CONTENT
	 */
	var imageJSON = function(result) {
		var i, lenResult = result.RelatedTopics.length, topics;
		//TODO: image undefined
		for(i=0; i<lenResult; i++) {
			//if everything is define just show them
			if(result.RelatedTopics[i].Icon.URL && result.RelatedTopics[i].Result) {
				var html_append = template.duckduckgoResults(
							result.RelatedTopics[i].Result,
							result.RelatedTopics[i].FirstURL,
							result.RelatedTopics[i].Icon.URL,
							result.RelatedTopics[i].Text).images();
					$('.duckduckgo-results > ul').append(html_append).appendTo('.search-result-wrapper');
			}//if

			if(result.RelatedTopics[i].hasOwnProperty('Topics')) {
				topics = result.RelatedTopics[i].Topics;
				console.log(topics);
			}
		}//for
	};

	return {
		request: request
	};

});
