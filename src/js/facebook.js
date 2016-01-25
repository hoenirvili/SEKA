define("facebook", ["template", "apicfg", "jquery"], function(template, apicfg, $) {

	// main request link
	var req;
	// hold the first json var temp;
	var temp;
	// hold every id
	var tempi;

	var request = function(queryString, category) {
		//build the request
		req = apicfg.facebook.url + queryString + apicfg.facebook.type + apicfg.facebook.limit + apicfg.facebook.token;

		switch(category) {
			case "web":
				console.log(req);
				console.log(category);
				$.getJSON(req, pageJSON);
				break;
			case "news":
				//TODO implement news
				break;
			case "video":
				$.getJSON(req, videoJSON);
				break;
			case "images":
				$.getJSON(req, imageJSON);
				break;
		}
	};

	/**
	 * FULL PAGE CONTENT
	 *
	 */
	var pageJSON = function(result) {
		var i;
		temp = result;
		console.log(result);
		//loading animation
		for (i=0; i<result.data.length; i++) {
			temp.data[result.data[i].id] = result.data[i];
			$.getJSON('https://graph.facebook.com/' + result.data[i].id + '/?fields=about' + apicfg.facebook.token, fullpageResults);
		}
	};

	var fullpageResults = function(results) {
		tempi = results.id;
		$('.facebook-results > ul').append(
			template.facebookResults(temp.data[tempi].id, temp.data[tempi].name, results.about).fullpage()
		).appendTo('.search-result-wrapper');
	};

	/**
	 * PAGE IMAGES
	 *
	 */
	var imageJSON = function(result) {
		var i;
		temp = result;
		for (i=0; i<result.data.length; i++) {
			temp.data[result.data[i].id] = result.data[i];
			$.getJSON('https://graph.facebook.com/' + result.data[i].id + '/?fields=photos' + apicfg.facebook.token, imageResult);
		}
	};

	var imageResult = function(results) {
		tempi = results.id;

		if( results.photos !== undefined ) {
			$('.facebook-results > ul').append(
				template.facebookResults(temp.data[tempi].id, temp.data[tempi].name, results.photos.data[0]).images()
			).appendTo('.search-result-wrapper');
		}
	};
	/**
	 * PAGE VIDEOS
	 */
	var videoJSON = function(result) {
		var i;
		temp = result;
		for (i=0; i<result.data.length; i++) {
			temp.data[result.data[i].id] = result.data[i];
			$.getJSON('https://graph.facebook.com/' + result.data[i].id + '/?fields=videos{embed_html,description,icon}' + apicfg.facebook.token, videoResult);
		}
	};

	///1397929407115642/?fields=videos{embed_html, description,icon}
	var videoResult = function(results) {
		tempi = results.id;
		if(results.videos !==undefined) {
			$('.facebook-results > ul').append(
				template.facebookResults(temp.data[tempi].id, temp.data[tempi].name, results.videos.data[0]).videos()
			).appendTo('.search-result-wrapper');
		}
	};

	return {
		request: request
	};
});
