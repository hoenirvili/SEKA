define("dom",
    ["jquery", "template", "search", "bootstrap", "pocket", "suri"],
    function ($, template, search, bootstrap, pocket, suri) {
        "use strict";

        // for our animation
        var counter = 0;
        // array to store our options filter
        var options = [];
        //category object

        var category = {
            type: 'web'
        };


        var destroyPreviousSearch = function () {
            var res = [
                $('.facebook-results> ul > li'),
                $('.duckduckgo-results > ul > li'),
                $('.twitter-results > ul > li'),
                $('.google-results > ul'),
				$('.instagram-results > ul')
            ], i, resLen = res.length;

            for (i = 0; i < resLen; i++) {
                if (res[i]) {
                    res[i].remove();
                }
            }
        };

        var searchAction = function () {
            //clean
            destroyPreviousSearch();
            // it's a good practice to create and cache all
            // local var in the top of the function/clouj etc..
            var queryString = $('#search-query').val(),
                filters = options.length;
            // test if query string is empty
            if (queryString !== "") {
                // don't show the tooltip anymore
                $('[data-toggle="tooltip"]').tooltip('destroy');
                //redirect
                search.action(queryString, filters, options, category.type);
                // if query string is empty show error
            } else {
                $('[data-toggle="tooltip"]').tooltip();
            }
        };

        var checkForPocket = function () {
            if (suri.getURLParameter('dopocket') !== null) {
                suri.changeUrlParam('dopocket', null);
                pocket.addItem()
            }
        }

        var checkForVars = function () {


            if (suri.getURLParameter('category') !== null) {
                category.type = suri.getURLParameter('category');
            }

            var params = ['Instagram', 'Facebook', 'DuckDuckGo', 'Google', 'Twitter'];
            for (var i in params) {
                var param=suri.getURLParameter(params[i])
                if ( param!== null) {
                    options.push(params[i]);
                }
            }

            if (suri.getURLParameter('s') !== null) {
                searchAction();
            }

        }

        var dropDownEvent = function () {
            var $target = $(event.currentTarget),
                val = $target.attr('data-value'),
                $inp = $target.find('input'),
                idx;

            if (( idx = options.indexOf(val)) > -1) {
                options.splice(idx, 1);
                setTimeout(function () {
                    $inp.prop('checked', false);
                }, 0);
                suri.changeUrlParam(val, null);
            } else {
                options.push(val);
                setTimeout(function () {
                    $inp.prop('checked', true);
                }, 0);// first in queue
                suri.changeUrlParam(val, 1)
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

        var slideTextChange = function () {
            if (counter > 2) {
                counter = 0;
            }
            $('#textslide').html(template.quotes[counter]);
            setTimeout(callbackSlideTextChange, 5000);
            counter++;
        };

        var callbackSlideTextChange = function () {
            slideTextChange();
        };

        var toggleMenu = function () {
            var menu = $('.menu');
            var button = $('.menu-button');
            menu.toggleClass('menu-open');
            button.toggleClass('hide-menu-button');
        };

        var animationLoading = function () {
            $(".showbox").fadeOut("slow");
        };

        var buttonEnter = function () {
            var button = $('#search-button');
            var field = $('html');
            if (button && field) {
                field.keyup(function (event) {
                    if (event.keyCode === 13) {
                        button.click();
                    }
                });//field
            }//if
        }

        var afterDoomLoading = function () {
            $(document).ready(function () {
                slideTextChange();
                checkForPocket();
                checkForVars();
                buttonEnter();
                $('.menu-button').on('click', toggleMenu);
                $('.menu-close').on('click', toggleMenu);
                $('.dropdown-menu a').on('click', dropDownEvent);
                $('#search-button').on('click', searchAction);
                $('ul.icons li').on('click', filterCategory);
                $('#save_to_pocket').on('click', pocket.init);
            });
        };

        //TODO: fix carrot
        var arrow = $('<span>', {className: 'arrow'}).appendTo('ul.icons');

        var filterCategory = function () {
            var el = $(this);

            if (el.hasClass('active'))
                return false;

            el.siblings().removeClass('active');
            el.addClass('active');

            arrow.stop().animate({
                left: el.position().left,
                marginLeft: (el.width() / 2) - 4
            });

            category.type = el.attr('data-searchType');
            if (category.type !== null) {
                suri.changeUrlParam('category', category.type)
            }
            $('#more').fadeOut();
        };

        return {
            init: function () {
                animationLoading();
                afterDoomLoading();
            }
        };
    });
