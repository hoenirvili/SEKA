$(document).ready(function() {
   	
	var config = {
		siteURL		: 'SEKA.com',	
		searchSite	: true,
		type		: 'web',
		append		: false,
		perPage		: 8,		//Maxim 8 rezultat pe pagina sunt admise de google	
		page		: 0			//Pagina de start
	};
	
//sageata mica ce marcheaza tipul de cautare
	var arrow = $('<span>',{className:'arrow'}).appendTo('ul.icons');
	//functia pentru ul, tipul de cautare
	$('ul.icons li').click(function(){
		var el = $(this);
		
		if(el.hasClass('active')){//verifica daca exista clasa
			//iconita este deja activa,exit
			return false;
		}
		
		el.siblings().removeClass('active');//siblings: returneaza toate elementele frate si le sterge clasa active
		el.addClass('active');
		
		//Miscarea sagetii sub iconite
		arrow.stop().animate({
			left		: el.position().left,
			marginLeft	: (el.width()/2)-4
		});
		
		//setam in variabila config tipul de cautare pe baza atributului din data-searchType
		config.type = el.attr('data-searchType');

		//Metoda se schimbă treptat opacitatea , pentru elementele selectate , de la vizibil la ascuns ( efect fading ) .
		$('#more').fadeOut();
	});// end-ul
	
	//adaugam site ul nostru ca si label pentru primul radio button
	$('#siteNameLabel').append(' '+config.siteURL);//append-insereaza continut la sfarsitul elementelor selectate
	
	//facem primul radio button activ
	$('#searchSite').click();	
	
	//categoria web este activa
	$('li.web').click();
	
	//ne focusam asupra textbox ului
	$('#s').focus();

	//cand dam submit la form se apeleaza functia googleSearch();
	
	$('#searchForm').submit(function(){
		googleSearch({},"Ceva");//{append:true,page:settings.page+0},"Ceva"
		return false;
	});
	
	$('#searchSite,#searchWeb').change(function(){
		//ascultam sa se schimbe unul din butoane
		config.searchSite = this.id === 'searchSite';
	});
	
	function googleSearch(settings,queryString){
		//daca functia nu ia nici un parametru atunci isi ia datele de la "config"		
		settings = $.extend({},config,settings);//settings primeste toate metodele, variabilele definite in config
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
				
				// if(!settings.append){
				// 	//executata atunci cand rulam o noua cautare in loc sa apasam pe more
				// 	resultsDiv.empty();
				// }
				
				//punem rezultatele din page container in resultsDiv
				pageContainer.append('<div class="clear"></div>')
							 .hide().appendTo(resultsDiv)
							 .fadeIn('fast');
				
				//var cursor = r.responseData.cursor;
				
				//vedem daca mai sunt rezultate si le afisam cu more
				
				// if( +cursor.estimatedResultCount > (settings.page+1)*settings.perPage){
				// 	$('<div>',{id:'more'}).appendTo(resultsDiv).click(function(){
				// 		googleSearch({append:true,page:settings.page+1});
				// 		$(this).fadeOut();
				// 	});
				// }
			}
			else {
				resultsDiv.empty();
				$('<p>',{className:'notFound',html:'No Results Were Found!'}).hide().appendTo(resultsDiv).fadeIn();
			}
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
	
	
});
