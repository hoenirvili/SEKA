define("dom", 
["jquery", "template", "search", "bootstrap"], 
function($, template, search) {
	"use strict";
	
	var counter = 0;
	var options = [];
	
	var searchAction = function() {
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
			search.action(queryString,filters, options);
		// if query string is empty show error
		} else {
			$('[data-toggle="tooltip"]').tooltip();
		}
	};

	var dropDownEvent = function () {
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
	};

	var slideTextChange = function() {
		if (counter > 2) {
			counter = 0;
		}
		$('#textslide').html(template.quotes[counter]);
		setTimeout(callbackSlideTextChange, 5000);
		counter++;
	};
	
	var callbackSlideTextChange = function(){
		slideTextChange();
	};

	var toggleMenu = function () {
		var menu = $('.menu');
		var button = $('.menu-button');
		menu.toggleClass('menu-open');
		button.toggleClass('hide-menu-button');
	};

	var animationLoading = function() {
		$(".showbox").fadeOut("slow");
	};

	var afterDoomLoading = function() {
		$(document).ready(function() {
			slideTextChange();
			$('.menu-button').on('click', toggleMenu);
			$('.menu-close').on('click', toggleMenu);
			$('.dropdown-menu a'). on('click', dropDownEvent);
			$('#search-button').on('click', searchAction);
		});
	};

	return {
		init: function() {
			animationLoading();
			afterDoomLoading();
		},
	};
});
