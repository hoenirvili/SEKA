define("google", ["apicfg", "template", "jquery",], function(apicfg, tempalte, $) {

	

	var request = function(settings,queryString,category) {
			
			//daca functia nu ia nici un parametru atunci isi ia datele de la config(apicfg.google);
			
			switch(category){
				case "web":
					googleSearch(settings,queryString,category);
					break;
				case "news":
					googleSearch(settings,queryString,category);
					break;
			case "video":
					googleSearch(settings,queryString,category);
				break;
			case "images":
					googleSearch(settings,queryString,category)
				break;
			}
	};	

	function googleSearch(settings,queryString,category){
		
		//dac functia nu are definit parametrul settings atunci isi ia datele din apicfg.google
		settings = $.extend({},apicfg.google,settings);
		settings.term = settings.term || queryString;
		
		//URL-ul de la google ajax search api
		var apiURL = 'http://ajax.googleapis.com/ajax/services/search/'+category+'?v=1.0&callback=?';
		var resultsDiv = $('.google-results');
		
		$.getJSON(apiURL,{q:settings.term,rsz:settings.perPage,start:settings.page*settings.perPage},function(r){
			
			var results = r.responseData.results;
			$('#more').remove();
			
			if(results.length){
	
				//daca sunt rezultate atunci ele sunt adaugate in pageContainer iar apoi in resultsDiv
				var pageContainer = $('<div>',{className:'pageContainer'});
				for(var i=0;i<results.length;i++){
					pageContainer.append(new result(results[i]) + '');
				}
				
				if(!settings.append){
					// This is executed when running a new search, 
					// instead of clicking on the More button:
					resultsDiv.empty();
				}
				
				pageContainer.append('<div class="clear"></div>')
							 .hide().appendTo(resultsDiv)
							 .fadeIn('slow');
				
				//var cursor = r.responseData.cursor;
				
				// Checking if there are more pages with results, 
				// and deciding whether to show the More button:
				
				// if( +cursor.estimatedResultCount > (settings.page+1)*settings.perPage){
				// 	$('<div>',{id:'more'}).appendTo(resultsDiv).click(function(){
				// 		googleSearch({append:true,page:settings.page+1});
				// 		$(this).fadeOut();
				// 	});
				// }
			}
			else {
				// Nu s-au gasit rezultate
				resultsDiv.empty();
				$('<p>',{className:'notFound',html:'No Results Were Found!'}).hide().appendTo(resultsDiv).fadeIn();
			}
			result(r);
		});
	}

	return {
		request: request
	};
});

	
function result(r){
		
		//Este creat un obiect al clasei pentru fiecare rezultat..continutul este generat de metoda .toString()
		var arr = [];
		
		// GsearchResultClass is passed by the google API
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
					'<li>'+
						'<div class="result-title">'+
							'<a href="',r.unescapedUrl,'" target="_blank">',r.title,'</a>'+ 						
						'</div>'+
						'<div class="result-excerpt">'+
							r.content+
						'</div>'+			
					'<li>'
				];
			break;
		}
		
		this.toString = function(){
			return arr.join('');
		}
	}



