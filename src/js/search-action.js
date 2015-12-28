(function($) {

	"use strict";

	var options = [];
	
	function searchAction() {
		// it's a good practice to create and cache all
		// local var in the top of the function/clouj etc..
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
			filterSearchAction(queryString, filters);
		// if query string is empty show error
		} else {
			$('[data-toggle="tooltip"]').tooltip();
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
			},0);// first in queue
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
	//FACEBOOK
		var url		= "https://graph.facebook.com/search?q=",
			token	= "&access_token=1523007798014505|NTm64aS3PIH_-Mfm8NAyQ1NGsp0",
			type	= "&type=page",
			limit	= "&limit=25";

		//cache all vars
		var i;

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
					facebookRequest(queryString, url, type, limit, token);
					break;
				}
			}//for
		} else {
			//TODO Make all requests
			//facebook
			facebookRequest(queryString, url, type, limit, token);
		}
	}

	// make facebook request inserting all elements into html
	function facebookRequest(queryString, url, type, limit, token) {
		//build the request
		var req = url + queryString + type + limit + token;
		//make requests
		var temp;
		var tempi;
		var getData = $.ajax({
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
							console.log(tempi);
							console.log(results);
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
	}
})(jQuery);

