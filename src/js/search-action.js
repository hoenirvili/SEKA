(function($) {

	"use strict"

	var options = [];


	
	function searchAction() {
		// cache all jquery obj $(this)
		// for performance reasons
		var $this = $(this);
		// it's a good practice to create and cache all
		// local var in the top of the function/clouj etc..
		var i;
		var queryString = $('#search-query').val();
		var filters = options.length;
		var hrefPage = window.location.href;
		// test if query string is empty
		if (queryString !=="") {
			// don't show the tooltip anymore
			$('[data-toggle="tooltip"]').tooltip('destroy');

			//redirect 
			if (hrefPage.indexOf("search.html") <0)
				window.location.href = "search.html";
			filterSearchAction(queryString, filters)
		// if query string is empty show error
		} else {
			$('[data-toggle="tooltip"]').tooltip()
		} 
	}

	$(document).ready(function() {
		$('.dropdown-menu a').on('click', dropDownEvent);
		$('#search-button').on('click', searchAction);
	});


	//dropDownEvent just adds all the elements that was check into our
	//contianer and loging them
	function dropDownEvent() {
		var $target = $(event.currentTarget),
			val = $target.attr('data-value'),
			$inp = $target.find('input'), 
			idx;

		if(( idx = options.indexOf(val)) > -1) {
			options.splice(idx, 1);
			setTimeout(function(){
				$inp.prop('checked',false);
			}, 0);
		} else {
			options.push(val);
			setTimeout(function() {
				$inp.prop('checked',true);
			},0);
		}
		// this blur method removes the focus of the
		// element that has been checked/clicked
		$(event.target).blur();
		// return false;
		// replacing the return false statement
		event.preventDefault();
		event.stopPropagation();
		// intersting enough when return false is triggered
		// it also stops callback execution.
	}

	function filterSearchAction(queryString, filters) {
		//cache all vars
		var i;

		//FACEBOOK
		var url		= "https://graph.facebook.com/search?q=",
			token	= "&access_token=1523007798014505|NTm64aS3PIH_-Mfm8NAyQ1NGsp0",
			type	= "&type=page",
			limit	= "&limit=25";


		if(filters) {
			for (i=0; i<filters; i++) {
				switch(options[i]) {

				case "DuckDuckGo":
					break;

				case "Bing":
					break;

				case "Google":
					break;
				case "Facebook":
					facebookRequest(queryString, url,token,type,limit);
					
					break;
				case "Bing":
					break;	
				}
			}//for
		} else {
			//TODO Make all requests
			//facebook
			facebookRequest(queryString, url,token,type,limit);
		}
	}	
	// make facebook request inserting all elements into html
	function facebookRequest(queryString, url, token, type, limit) {
		//build the request
		var req = url + queryString + type + limit + token;
		var aboutReq;
		//make the request
		$.getJSON(req, function(results){
			console.log(results);
			//TODO make request based on other request
			return false;
			
			$.each(results.data ,function() {
				$('.facebook-results > ul').append(
					'<li>'+
						'<div class="result-img">' +
							'<img src="http://graph.facebook.com/' + this.id + '/picture" height="50" width="50" alt="' + this.name+ '" />'+
						'</div>'+
						'<div class="result-title">'+
							'<a href="http://facebook.com/'+ this.id+' ">' + this.name + '</a>'+
						'</div>'+
					'</li>'
				).appendTo('search-result-wrapper');
			
			});//each

			aboutReq = 'https://graph.facebook.com/'+this.id+'/?fields=about'+token;

			$.getJSON(aboutReq, function(results) {
				$.each(result, function() {
					$('.facebook-results > ul').append(
						'<div class="result-excerpt">'+
						this.about +
						'</div>'
					).appendTo('search-result-wrapper');
				});//each
			});//getjson


		});//getJson
	}


})(jQuery);
