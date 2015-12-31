define("event", ['jquery'], function($) {
	//PRIVATE SCOPE
	var options = [];

	//dropDownEvent just adds all the elements that was check into our
	//contianer and loging them
	var dropDownEvent = function() {
		var $target = $(event.currentTarget);
		var val = $target.attr('data-value');
		var $inp = $target.find('input');
		var idx;

		if((idx = options.indexOf(val)) > -1) {
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

	// PUBLIC SCOPE
	return {
		options: options,
		dropDown: dropDownEvent
	};
});
