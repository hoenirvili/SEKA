define('apicfg', function() {
	return {
		facebook: {
			url		: "https://graph.facebook.com/search?q=",
			token	: "&access_token=1523007798014505|NTm64aS3PIH_-Mfm8NAyQ1NGsp0",
			type	: "&type=page",
			limit	: "&limit=25"
		},
		duckduckgo: {},
		bing: {},
		google: {
			url		: 'http://ajax.googleapis.com/ajax/services/search/',
			version		: 'v=1.0',
			callback	: 'callback=?'
		},
        twitter:
        {
            url		: 'search/tweets.json',
            version		: '',
            token       :'2594907146-SbFG8jbQdjzDNtdfJvJzXx5cA59H8uuffM09SmD',
            callback	: ''
        }
	};
});
