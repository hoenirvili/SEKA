

define("suri",[], function() {

    var getURLParameter=function(name) {
        return decodeURIComponent((new RegExp('[?|&]' + name + '=' + '([^&;]+?)(&|#|;|$)').exec(location.search)||[,""])[1].replace(/\+/g, '%20'))||null;
    }

    var changeUrlParam=function(param, value) {
        var currentURL = window.location.href+'&';
        var change = new RegExp('('+param+')=([^&]*)&', 'g');
        if(value!==null) {
            var newURL = currentURL.replace(change, '$1=' + value + '&');
        }else
        {
            var newURL = currentURL.replace(change, '');
        }

        if (getURLParameter(param) !== null){
            try {
                window.history.replaceState('', '', newURL.slice(0, - 1) );
            } catch (e) {
                console.log(e);
            }
        } else {
            var currURL = window.location.href;
            if (currURL.indexOf("?") !== -1){
                window.history.replaceState('', '', currentURL.slice(0, - 1) + '&' + param + '=' + value);
            } else {
                window.history.replaceState('', '', currentURL.slice(0, - 1) + '?' + param + '=' + value);
            }
        }
    }

    return {
        getURLParameter:getURLParameter,
        changeUrlParam:changeUrlParam
    };
});
