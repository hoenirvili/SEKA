define("google", ["apicfg", "template", "jquery",], function(apicfg, tempalte, $) {

	

	var request = function(settings,queryString, category) {

			//daca functia nu ia nici un parametru atunci isi ia datele de la config(apicfg.google);
			
			switch(category){
				case "web":
					googleWebSearch(settings,queryString);
					break;
				case "news":
					
					break;
				case "video":
					
					break;
				case "images":
					
					break;
			}
	};	
		
	function googleWebSearch(settings,queryString){
		//daca functia nu ia nici un parametru atunci isi ia datele de la "config"		
		settings = $.extend({},apicfg.google,settings);//settings primeste toate metodele, variabilele definite in config
		settings.term =  settings.term || queryString;
		
		//URL-ul spre google ajax search api
		var apiURL = 'http://ajax.googleapis.com/ajax/services/search/'+settings.type+'?v=1.0&callback=?';
		var resultsDiv = $('#resultsDiv');		
		$.getJSON(apiURL,{q:settings.term,rsz:settings.perPage,start:settings.page*settings.perPage},function(r){
			var results = r.responseData.results;
			//$('#more').remove();//imi da elementul afara din dom
			
			if(results.length){
				//daca au fost returnate rezultate, adauga le la pageContainer div
				//dupa care adauga-le la #resultsDiv		
				var pageContainer = $('<div>',{className:'pageContainer'});		
				for(var i=0;i<results.length;i++){
					//cream un nou rezultat 
					pageContainer.append(new result(results[i]) + '');
				}
				
				pageContainer.append('<div class="clear"></div>')
							 .hide().appendTo(resultsDiv)
							 .fadeIn('fast');
				
				
			}
			else {
				resultsDiv.empty();
				$('<p>',{className:'notFound',html:'No Results Were Found!'}).hide().appendTo(resultsDiv).fadeIn();
			}
			result(r);
		});
	
	}//--end googleSearch


function result(r){
		
		//in aceasta functie cream un obiect pentru fiecare rezultat 
		
		var arr = [];
	
		switch(r.GsearchResultClass){
			//clasa GsearchResultClass este pasata de google API
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
		

		this.toString = function(){
			return arr.join('');
		};
	}









	return {
		request: request
	};
});
