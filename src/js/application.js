define("application", ["animation"],function(animation) {
	return {
		//Start application
		start: function() {
			animation.init();
		}
	};
});
