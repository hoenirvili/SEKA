$(document).ready(function(){
	
	var config = {
		siteURL		: 'SEKA.com',	
		searchSite	: true,
		type		: 'web',
		append		: false,
		perPage		: 8,			// ;omita impusa de google
		page		: 0				// pagina de start
	}
	
	//sageata ce marcheaza tipul de cautare
	var arrow = $('<span>',{className:'arrow'}).appendTo('ul.icons');//continutul precede metoda
	
	$('ul.icons li').click(function(){
		var el = $(this);
		
		if(el.hasClass('active')){
			//iconita(tipul de cautare) e deja activ
			return false;
		}
		
		el.siblings().removeClass('active'); //deselectam toate elementele li
		el.addClass('active');
		
		//miscarea sagetii
		arrow.stop().animate({
			left		: el.position().left,
			marginLeft	: (el.width()/2)-4
		});
		
		//setam tipul de search
		config.type = el.attr('data-searchType');
		$('#more').fadeOut();
	});
	
	$('#siteNameLabel').append(' '+config.siteURL); //adaugam domeniul site ului ca eticheta la primul radioButton
	$('#searchSite').click();//SEKA.com devine activ
	$('li.web').click();//webSearch devine activ
	$('#s').focus();

	$('#searchForm').submit(function(){
		googleSearch();
		return false;
	});
	
	$('#searchSite,#searchWeb').change(function(){
		////asteptam ca unul din radioButton sa fie selectat
		//configuram searchSite true sau false
		config.searchSite = this.id == 'searchSite';
	});
	
	
	function googleSearch(settings){
		

		settings = $.extend({},config,settings); //adaugam proprietatile lui config
		settings.term = settings.term || $('#s').val();
		
		if(settings.searchSite){
				//limitam cautarile la un domeniu specific
			settings.term = 'site:'+settings.siteURL+' '+settings.term;
		}
		
		//url ul spre search api-ul de la google
		var apiURL = 'http://ajax.googleapis.com/ajax/services/search/'+settings.type+'?v=1.0&callback=?';
		var resultsDiv = $('#resultsDiv');
		
		$.getJSON(apiURL,{q:settings.term,rsz:settings.perPage,start:settings.page*settings.perPage},function(r){
			
			var results = r.responseData.results;
			$('#more').remove();
			
			if(results.length){
				
					//daca au fost returnate rezultate,le adaugam intr un pageContainer div,dupa care le punem in #resultaDiv
				var pageContainer = $('<div>',{className:'pageContainer'});
				
				for(var i=0;i<results.length;i++){
					// Creating a new result object and firing its toString method:
					pageContainer.append(new result(results[i]) + '');
				}
				
				if(!settings.append){
					//cand dam o noua cautare resultsDiv devine empty
					resultsDiv.empty();
				}
				
				pageContainer.append('<div class="clear"></div>')
							 .hide().appendTo(resultsDiv)
							 .fadeIn('slow');
				
				var cursor = r.responseData.cursor;
				
				//verificam daca exista mai multe pagini in results
				
				if( +cursor.estimatedResultCount > (settings.page+1)*settings.perPage){
					$('<div>',{id:'more'}).appendTo(resultsDiv).click(function(){
						googleSearch({append:true,page:settings.page+1});
						$(this).fadeOut();
					});
				}
			}
			else {
				
				//nu au fost gasite rezultate pentru search
				
				resultsDiv.empty();
				$('<p>',{className:'notFound',html:'No Results Were Found!'}).hide().appendTo(resultsDiv).fadeIn();
			}
		});
	}
	
	function result(r){
		
		
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
		
		
		this.toString = function(){
			return arr.join('');
		}
	}
	
	
});
