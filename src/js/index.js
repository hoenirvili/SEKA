/**
 * We pass our jquery object
 * into self invoking lambda function
 * We've making this lambda function a
 * self contain module.
 */
(function($) {
	/**
 	 * Just internet explorer compatibility issues
	 * in case of anything else.
	 */
	 "use strict"
	 /**
	 * function that check's if
	 * we have the class it will remove
	 * or if we don't have the class it will
	 * be added to the our button.
	 */

	/**
	 * cache values
	 */
	var counter = 0;
	// var searchButton = $("#search");
	// searchButton.attr('window.location.href','result.html');

	function changeText(){

        if($('#textslide').length) {
		var quotes = [3];

		quotes[0] = "<h6 class=text-center > 							\
			 			Search Engine Analyzer for 						\
							<a href=#>facebook</a> 						\
							<a href=#>twitter </a> 						\
							and 										\
							<a href=#> duckduckgo</a> 					\
					</h6>";
		quotes[1] = "<h6 class=text-center >							\
		 				Search Engine Analyzer that is 					\
							<a href=#>specialized</a>					\
						 	to help you search some things..			\
					</h6>";
		quotes[2] = "<h6 class=text-center > 							\
						This is another									\
						<a href=#>example</a> 							\
						of good search engine. 							\
					</h6>"

		if (counter > 2){
			counter = 0;
		}
            document.getElementById("textslide").innerHTML = quotes[counter];
            setTimeout(function () {
                    changeText()
                },
                5000);
            counter++;
        }
	}
	 function openMenu() {
		var $this = $(this),
			menu = $('.menu');

		menu.toggleClass('menu-open');
		$this.toggleClass('hide-menu-button');
	}

	function closeMenu() {
		//var $this = $(this);
		var menu = $('.menu');
		var button = $('.menu-button');
		menu.toggleClass('menu-open');
		//make button reappear
		button.toggleClass('hide-menu-button');

	}

	/**
	 * If the document is loaded execute this function
	 */
	 $(document).ready(function() {
		 $('.menu-button').on('click',openMenu);
		 $('.menu-close').on('click', closeMenu);
		 changeText();
	 });
})(jQuery);
