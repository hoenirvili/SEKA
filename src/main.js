
// configuration for requireJs
requirejs.config ({
	baseUrl: "src",
	shim : {
		bootstrap: {
			"deps": ['jquery']
		}
	},
	paths: {
		// requirejs plugins
		domReady: "lib/require-2.1.22/plugin/domReady",
		// lib
		jquery: 'lib/jquery/jquery-2.1.4.min',
		bootstrap: 'lib/bootstrap-3.3.5/js/bootstrap.min',
		// js
		application: "js/application",
		apicfg: "js/api_config",
		template: "js/template",
		dom: "js/dom",
		search: "js/search",
		facebook: "js/facebook",
		google: "js/google",
        twitter:"js/twitter",
		duckduckgo:"js/duckduckgo"
	}
});
