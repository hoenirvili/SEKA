(function($) {

	"use strict"

	var options = [];

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
				// TODO: make facebook request
					var token="1523007798014505%7CNTm64aS3PIH_-Mfm8NAyQ1NGsp0"
					$.getJSON("https://graph.facebook.com/10152716010956729/photos?fields=source,picture,link,name&"+"&access_token="+token, function(data){
						console.log(data);
					});
					break;
				case "Bing":
					break;	
				}
			}//for
		} else {
			//TODO Make all requests
			console.log("make all request test");
		}
	}	
	function searchAction() {
		// cache all jquery obj $(this)
		// for performance reasons
		var $this = $(this);
		// it's a good practice to create and cache all
		// local var in the top of the function/clouj etc..
		var i;
		var queryString = $('#search-query').val();
		// test if query string is empty
		if (queryString !=="") {
			var filters = options.length;
			filterSearchAction(queryString, filters)
		// if query string is empty show error
		} else {
			// init data toggle and show immediately
			$('[data-toggle="tooltip"]').tooltip().tooltip('show');
		}

	}


	$(document).ready(function() {
		$('.dropdown-menu a').on('click', dropDownEvent);
		$('#search-button').on('click', searchAction);
	});

})(jQuery);
