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
		var i, j, lenResult = result.RelatedTopics.length, 
			topics, html_append,topic_append
			relatedT = result.RelatedTopics;

		for(i=0; i<lenResult; i++) {
			//if everything is define just show them
			if( relatedT[i].hasOwnProperty('FirstURL') && relatedT[i].hasOwnProperty('Icon') &&
				relatedT[i].hasOwnProperty('Text') && relatedT[i].hasOwnProperty('Result')) {
					html_append = template.duckduckgoResults(
							relatedT[i].Result, relatedT[i].FirstURL, 
							relatedT[i].Icon.URL, relatedT[i].Text).fullpage();
					$('.duckduckgo-results > ul').append(html_append).appendTo('.search-result-wrapper');
			}//if

			if(result.RelatedTopics[i].hasOwnProperty('Topics')) {
				topics = result.RelatedTopics[i].Topics;
				topicLen = topics.length;
				for(j=0; j<topicLen; j++) {
					topic_append = template.duckduckgoResults(
							topics[j].Result, topics[j].FirstURL,
							topics[j].Icon.URL, topics[j].Text).fullpage();
					$('.duckduckgo-results > ul').append(topic_append).appendTo('.search-result-wrapper');
				}//for
			}//if
		}//for
	};

	/**
	 * IMAGE PAGE CONTENT
	 */
	var imageJSON = function(result) {
		// ALL VAR
		var i, j, lenResult = result.RelatedTopics.length, 
			topics, topicsLen,
			relatedT = result.RelatedTopics,
			related_icons_append, topics_icon_append;
		
		for(i=0;i<lenResult; i++) {
			//console.log(relatedT[i]);
			if(relatedT[i].hasOwnProperty('Result') && relatedT[i].hasOwnProperty('Icon')){
				related_icons_append = template.duckduckgoResults(
								relatedT[i].Result, "",relatedT[i].Icon.URL,"","").images();
				$('.duckduckgo-results > ul').append(related_icons_append).appendTo('.search-result-wrapper');
			}
			// if it has this property
			if(relatedT[i].hasOwnProperty('Topics')) {
				topics = relatedT[i].Topics;
				topicsLen = topics.length;
				for(j=0; j<topicsLen; j++) {
					if(topics[j].hasOwnProperty('Result') && topics[j].hasOwnProperty('Icon')) {
						// if we have picture
						// display it
						if(topics[j].Icon.URL != 0) {
							topics_icon_append = template.duckduckgoResults(
									topics[j].Result, "", topics[j].Icon.URL, "" , "").images();
							$('.duckduckgo-results > ul').append(topics_icon_append).appendTo('.search-result-wrapper');
						}//if
					}//if
				}//for
			}//if
		}//for
	};

	return {
		request: request
	};

});
