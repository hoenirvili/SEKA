define("template", function() {

	this.quotes= ["<h5 class=\"text-center slide-text-anime \">			\
							Search Engine Analyzer for 						\
								<a href=#>facebook</a> 						\
								<a href=#>twitter </a> 						\
								and 										\
								<a href=#> duckduckgo</a> 					\
						</h5>",
						"<h5 class=\"text-center slide-text-anime \">		\
							Search Engine Analyzer that is 					\
								<a href=#>specialized</a>					\
								to help you search some things..			\
						</h5>",
						"<h5 class=\"text-center slide-text-anime \">		\
							This is another									\
							<a href=#>example</a> 							\
							of good search engine. 							\
						</h5>"];

	this.facebookResults = function(id, name, about) {

		var fullpage = function() {
			return	'<li>'+
					'<div class="result-img">'+
						'<img src="http://graph.facebook.com/' + id + '/picture" height="50" width="50" alt="' + name + '" />'+
					'</div>'+
					'<div class="result-title">'+
						'<a href="http://facebook.com/'+ id +' ">' + name + '</a>'+
					'</div>'+
					'<div class="result-excerpt">'+
						about +
					'</div>'+
					'</li>';
		};

		var images = function() {
			return 	'<li>'+
						'<div class="result-images">'+
							'<img src="http://graph.facebook.com/' + about.id + '/picture" height="250" width="250" alt="' + name + '" />'+
						'</div>'+
						'<div class="result-excerpt">'+
							about.created_time +
						'</div>'+
					'</li>'
					;

		};

		var videos = function() {
		return	'<li>'+
					'<div class="result-img">'+
						'<img src="' + about.icon +' " height="50" width="50" alt="' + name + '" />'+
					'</div>'+
					'<div class="result-title">'+
						'<a href="http://facebook.com/'+ id +' ">' + name + '</a>'+
					'</div>'+
						about.embed_html +
					'<div class="result-excerpt">'+
						about.description +
					'</div>'+
					'</li>';
	
		};

		return {
			fullpage: fullpage,
			images: images,
			videos: videos
		};

	}; //facebookResults
	
	this.googleResults = function(r) {
		var arr = [];
		
	
		switch(r.GsearchResultClass){

			case 'GwebSearch':
				arr = [
					'<div class="webResult">',
					'<h2><a href="',r.unescapedUrl,'" target="_blank">',r.title,'</a></h2>',
					'<p>',r.content,'</p>',
					'<a href="',r.unescapedUrl,'" target="_blank">',r.visibleUrl,'</a>',
					'</div>'
				];
			break;
			case 'GimageSearch':
				arr = [
					'<div class="imageResult">',
					'<a target="_blank" href="',r.unescapedUrl,'" title="',r.titleNoFormatting,'" class="pic" style="width:',r.tbWidth,'px;height:',r.tbHeight,'px;">',
					'<img src="',r.tbUrl,'" width="',r.tbWidth,'" height="',r.tbHeight,'" /></a>',
					'<div class="clear"></div>','<a href="',r.originalContextUrl,'" target="_blank">',r.visibleUrl,'</a>',
					'</div>'
				];
			break;
			case 'GvideoSearch':
				arr = [
					'<div class="imageResult">',
					'<a target="_blank" href="',r.url,'" title="',r.titleNoFormatting,'" class="pic" style="width:150px;height:auto;">',
					'<img src="',r.tbUrl,'" width="100%" /></a>',
					'<div class="clear"></div>','<a href="',r.originalContextUrl,'" target="_blank">',r.publisher,'</a>',
					'</div>'
				];
			break;
			case 'GnewsSearch':
				arr = [
					'<div class="webResult">',
					'<h2><a href="',r.unescapedUrl,'" target="_blank">',r.title,'</a></h2>',
					'<p>',r.content,'</p>',
					'<a href="',r.unescapedUrl,'" target="_blank">',r.publisher,'</a>',
					'</div>'
				];
			break;
		}
		return arr;
	};


	return this;
});// define
