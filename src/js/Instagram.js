define("instagram", ["template", "apicfg", "jquery"], function(template, apicfg, $) {
    var request = function(queryString, category) {
    	getImages(queryString);

    }
    return {
        request: request
    };
});

function getImages(queryString){
    
    //setari aplicatie
	window.Instagram = {
    config: {},
    BASE_URL: 'https://api.instagram.com/v1',


    init: function( opt ) {
        opt = opt || {};
        this.config.client_id = opt.client_id;
    },

    //lista cu stiri populare
    popular: function( callback ) {
        var endpoint = this.BASE_URL + '/media/popular?client_id=' + this.config.client_id;
        this.getJSON( endpoint, callback );
    },

    //lista cu cele mai recente stiri
    tagsByName: function( name, callback ) {
        var endpoint = this.BASE_URL + '/tags/' + name + '/media/recent?client_id=' + this.config.client_id;
        this.getJSON( endpoint, callback );
    },

    getJSON: function( url, callback ) {
        $.ajax({
            type: 'GET',
            url: url,
            dataType: 'jsonp',
            success: function( response ) {
                if ( typeof callback === 'function' ) callback( response );
            }
        });
    }
};

Instagram.init({
    client_id: 'd49da08a520f47cbb6e7618f077f33ef'
});

    Instagram.tagsByName(queryString, function( response ) {
        var $instagram = $( '.instagram-results' );
            $instagram.html('');

        for ( var i = 0; i < response.data.length; i++ ) {
            imageUrl = response.data[i].images.low_resolution.url;
            username = response.data[i].user.username;
            $instagram.append( '<li class=".instaImages"><img class="instaResult" alt="'+ username +'" src="' + imageUrl + '"></img></li>' );
        }
    });
}



