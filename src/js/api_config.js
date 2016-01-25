define('apicfg', function() {
	return {
		facebook: {
			url		: "https://graph.facebook.com/search?q=",
			token	: "&access_token=1523007798014505|NTm64aS3PIH_-Mfm8NAyQ1NGsp0",
			type	: "&type=page",
			limit	: "&limit=25"
		},
		duckduckgo: {
			url		: "https://api.duckduckgo.com/?q=",
			format  : "&format=",
			fromat_t: [
				"json",
				"xml"
			],
			pretty: ["&pretty=0", "&pretty=1"],
			no_redirect: ["&no_redirect=0,","&no_redirect=1"],
			no_html : ["&no_html=0", "&no_html=1"],
			misc: "&t=SEKA"
		},
		bing: {},
		google: {
			url			: 'http://ajax.googleapis.com/ajax/services/search/',
			version		: 'v=1.0',
			callback	: 'callback=?'
		},
	};
});
