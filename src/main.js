
// configuration for requireJs
requirejs.config ({
	baseUrl: "src",
	paths: {
		// requirejs plugins
		domReady: "lib/require-2.1.22/plugin/domReady",
		// lib
		jquery: 'lib/jquery/jquery-2.1.4.min',
		bootstrap: 'lib/bootstrap-3.3.5/js/bootstrap.min',
		// js
		application: "js/application",
		template: "js/template",
		animation: "js/animation",
		search: "js/search",
		event: "js/event",
		apiConfigs: "js/api_config"
	}
});
