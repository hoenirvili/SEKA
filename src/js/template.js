define("template", function() {

	this.quotes = ["<h5 class=\"text-center slide-text-anime \">			\
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
						'<img src="https://graph.facebook.com/' + id + '/picture" height="50" width="50" alt="' + name + '" />'+
					'</div>'+
					'<div class="result-title">'+
						'<a href="https://facebook.com/'+ id +' ">' + name + '</a>'+
					'</div>'+
					'<div class="result-excerpt">'+
						about +
					'</div>'+
					'</li>';
		};




            var images = function() {
			return 	'<li>'+
						'<div class="result-images">'+
							'<img src="https://graph.facebook.com/' + about.id + '/picture" height="250" width="250" alt="' + name + '" />'+
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
						'<a href="https://facebook.com/'+ id +' ">' + name + '</a>'+
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

    this.twitterResults = function(pictureUrl, username, text,profileUrl) {
        var fullpage = function() {
            return	'<li>'+
                '<div class="result-img">'+
                '<img src="'+pictureUrl+'" height="50" width="50" alt="' + username + '" />'+
                '</div>'+
                '<div class="result-title">'+
                '<a href="'+profileUrl+'">' + username + '</a>'+
                '</div>'+
                '<div class="result-excerpt">'+
                text +
                '</div>'+
                '</li>';
        };
        return {
            fullpage: fullpage,
        };

    }; //facebookResults

	return this;
});// define
