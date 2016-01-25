define("twitter", ["template", "apicfg", "jquery"], function(template, apicfg, $) {

    // main request link
    var req;
    // hold the first json var temp;
    // hold every id
    var tempi;
    var temp;

    var request = function(queryString, category) {
        //build the request


        req = apicfg.twitter.url +"?q="+ '"'+queryString+'"';

        // twitter doesn't support calls from javascript directly
        //see https://twittercommunity.com/t/any-possible-way-to-call-authorized-twitter-api-method-directly-from-javascript/8014
        $.getJSON('src/php/twitter_proxy.php?url='+encodeURIComponent(req), pageJSON);

    };

    /**
     * FULL PAGE CONTENT
     *
     */
    var pageJSON = function(result) {
        var i;
        temp = result;
        //loading animation
        console.log(result);
        for (i=0; i<result.statuses.length; i++) {
            username=result.statuses[i].user.screen_name;
            image=result.statuses[i].user.profile_image_url_https;
            profileUrl="https://twitter.com/intent/user?user_id="+result.statuses[i].user.id;
            text=result.statuses[i].text


            $('.twitter-results > ul').append(
                template.twitterResults(image, username,text,profileUrl).fullpage()
            ).appendTo('.search-result-wrapper');

        }
    };





    return {
        request: request
    };
});
