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
	
	function searchAction() {
		// it's a good practice to create and cache all
		// local var in the top of the function/clouj etc..
		var i;

		for (i=0; i<options.length; i++) 
		{
			switch(options[i]) {
				case "DuckDuckGo":
					break;

				case "Bing":
					break;

				case "Google":
					break;

				case "Facebook":
					console.log("test");
					break;

				case "Bing":
					break;	
			}
		}
	}


	$(document).ready(function() {
		$('.dropdown-menu a').on('click', dropDownEvent);
		$('#search-button').on('click', searchAction);
	});

})(jQuery);
