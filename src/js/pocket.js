define ("pocket", ["dom"], function(dom) {

    var request = function() {
        $.getJSON('src/php/pocket/connect.php?current_url='+encodeURI(window.location.href), handleConnect);
    };

    var addItem= function() {
        $.getJSON('src/php/pocket/api.php?current_url='+encodeURI(window.location.href), handleAddItem);
    };


    var handleClick= function ()
    {
        if($('#pocket').length>0)
        {
            addItem();
        }
        else
        {
            request();
        }
    }

    var handleConnect = function(result) {
        console.log(result);
        window.location.href=result.url;

    };

    var handleAddItem = function(result) {
       if(result.status)
       {
           alert("Added succesfully to pocket");
       }

    };

    return {
        makerequest: request,
        addItem:addItem,
        init:handleClick,
    };
});

