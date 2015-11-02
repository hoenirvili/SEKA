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
	 });

})(jQuery);
	
	/*
	 This function set up functions that we can customize for our slideshow  
	*/
	 $(function() {
    $(".rslides").responsiveSlides({
  auto: true,             
  speed: 500,            
  timeout: 4000,          
  pager: false,           
  nav: false,             
  random: false,          
  pause: false,           
  pauseControls: false,    
  prevText: "Previous",   
  nextText: "Next",      
  maxwidth: "1000",           
  navContainer: "",       
  manualControls: "",     
  namespace: "rslides",   
  before: function(){},   
  after: function(){}     
});
  });
