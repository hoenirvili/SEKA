define('search', ['jquery','bootstrap','event', 'api'], function($, bootstrap, event, api) {
	"use strict";

	var clickSearch = function() {
		// it's a good practice to create and cache all
		// local var in the top of the function/clouj etc..
		var queryString = $('#search-query').val();
		var filters = event.options.length;
		var hrefPage = window.location.href;
		// test if query string is empty
		if (queryString !=="") {
			// don't show the tooltip anymore
			bootstrap.$('[data-toggle="tooltip"]').tooltip('destroy');

			//redirect
			if (hrefPage.indexOf("search.html") <0)
				window.location.href = "search.html";
			filterSearchAction(queryString, filters);
		// if query string is empty show error
		} else {
			$('[data-toggle="tooltip"]').tooltip();
		}
	};

	var searchAction = function() {
		$('#search-button').on('click', clickSearch);
	};


	var filterSearchAction = function(queryString, filters) {
		//cache all vars
		var i;

		if(filters) {
			for (i=0; i<filters; i++) {
				switch(event.options[i]) {

				case "DuckDuckGo":
					break;

				case "Bing":
					break;

				case "Google":
					break;
				case "Facebook":
					facebookRequest(queryString, api.facebook.url, api.facebok.type, api.facebook.limit, api.facebook.token);
					break;
				}
			}//for
		} else {
			//facebook
			facebookRequest(queryString, api.facebook.url, api.facebook.type, api.facebook.limit, api.facebook.token);
		}
	};

	// make facebook request inserting all elements into html
	var  facebookRequest = function(queryString, url, type, limit, token) {
		//build the request
		var req = url + queryString + type + limit + token;
		//make requests
		var temp;
		var tempi;
		$.ajax({
			type: 'GET',
			url: req,
			datType: 'json',
			success: function(result) {
				var i;
				temp = result;
				for (i=0; i<result.data.length; i++) {
					temp.data[result.data[i].id] = result.data[i];
					$.ajax({
						type: 'GET',
						url: 'https://graph.facebook.com/' + result.data[i].id + '/?fields=about' + token,
						dataType: 'json',
						success: function(results) {
							tempi = results.id;
							 $('.facebook-results > ul').append(
								'<li>'+
								 	'<div class="result-img">'+
										'<img src="http://graph.facebook.com/' + temp.data[tempi].id + '/picture" height="50" width="50" alt="' +temp.data[tempi].name+ '" />'+
									'</div>'+
									'<div class="result-title">'+
										'<a href="http://facebook.com/'+temp.data[tempi].id+' ">' +temp.data[tempi].name + '</a>'+
									'</div>'+
									'<div class="result-excerpt">'+
										results.about+
									'</div>'+
								'</li>').appendTo('.search-result-wrapper');
						}//function
					});
				}
			}
		});
	};

	return {
		searchAction: searchAction
	};

});
