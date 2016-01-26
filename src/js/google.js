define("google", ["apicfg", "template", "jquery",], function(apicfg, tempalte, $) {

	

	var request = function(settings,queryString, category) {

			//daca functia nu ia nici un parametru atunci isi ia datele de la config(apicfg.google);
			
			
			
			switch(category){
				case "web":
						webSearch(settings,queryString);
					break;
				case "news":
					//TODO implement news
					break;
				case "video":
					$.getJSON(apiURL, videoJSON);
					break;
				case "images":
					$.getJSON(apiURL, imageJSON);
					break;
			}
	};	
	var webSearch = function(settings,queryString){
			//daca functia nu ia nici un parametru atunci isi ia datele de la "config";
			settings = $.extend({},apicfg.google,settings);
			settings.term = settings.term || queryString;

			//url -ul spre google ajax search api
			var apiURL = 'http://ajax.googleapis.com/ajax/services/search/'+'web'+'?v=1.0&callback=?';//de rescris !!!
			var resultsDiv = $('#resultsDiv');
			
			$.getJSON(apiURL,{q:settings.term,rsz:settings.perPage,start:settings.page*settings.perPage},function(r){
				var results = r.responseData.results;
			$('#more').remove();//imi da elementul afara din dom
			
			if(results.length){
				//daca au fost returnate rezultate, adauga le la pageContainer div
				//dupa care adauga-le la #resultsDiv		
				var pageContainer = $('<div>',{className:'pageContainer'});		
				for(var i=0;i<results.length;i++){
					//cream un nou rezultat 
					pageContainer.append(new result(results[i]) + '');
				}
				pageContainer.append('<div class="clear"></div>').hide().appendTo(resultsDiv).fadeIn('fast');
			}else{
				resultsDiv.empty();
				$('<p>',{className:'notFound',html:'No Results Were Found!'}).hide().appendTo(resultsDiv).fadeIn();
			}

			var arr = [];
			//se creaza un obiect pt fiecare rezultat
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
			}
	}

	
	
});



