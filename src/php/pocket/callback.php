<?php
    session_start();
	require_once('config.php');
	/* Now we have to convert our request token into an access token */
	// we set up the callback_uri to include the request_token,
	// so let's get that

	$request_token = $_GET['request_token'];

	$url = 'https://getpocket.com/v3/oauth/authorize';
	$data = array(
		'consumer_key' => $consumer_key, 
		'code' => $request_token
	);
	$options = array(
		'http' => array(
			'method'  => 'POST',
			'content' => http_build_query($data)
		)
	);
	$context  = stream_context_create($options);
	$result = @file_get_contents($url, false, $context);
	// our $result contains our access token
	
	$access_token = explode('&',$result);
	if($access_token[0]!=''){
		$_SESSION['pocket_user_id']=str_replace('access_token=','',$access_token[0]);
        echo $_SESSION['last_url'];
        if($_SESSION['last_url'])
            if(strpos($_SESSION['last_url'],'?')===false)
            {
                header("Location: ".$_SESSION['last_url'].'?dopocket=1');
            }else
            {
                header("Location: ".$_SESSION['last_url'].'&dopocket=1');
            }
	} else{
		echo "Something went wrong. :( ";
	}

?>