define ("animation", ['jquery', 'template','event'], function($, template, event) {
		"use strict";
		//PRIVATE SCROPE
		var counter = 0;
		
		var changeText = function() {
			if( $('#textslide').length) {
				if (counter > 2) counter = 0;
				$("#textslide").html(template.quotes[counter]);
				setTimeout(function() { changeText(); }, 5000);
				counter++;
			}
		};

		var toggleMenu = function() {
			var menu = $('.menu');
			var button = $('.menu-button');
			menu.toggleClass('menu-open');
			button.toggleClass('hide-menu-button');
		};

		var loadAnimation = function() {
			$(".showbox").fadeOut("slow");
		};

		var onReadyState = function() {
					//toggle menu
					$('.menu-button').on('click',toggleMenu);
					$('.menu-close').on('click',toggleMenu);
					//animation text change
					changeText();
					event.dropDown();
		};
		//
		//PUBLIC SCOPE
		return {
			init : function() {
				$(document).load(loadAnimation());
				$(window).ready(onReadyState);
			}
		};
}); // define
