<?php
session_start();
	require_once('config.php');
	/* read the docs!
		by default, I'm just returning the 5 most recent
		pocket items.
		read more here: http://getpocket.com/developer/docs/v3/retrieve
	 */
	$url = 'https://getpocket.com/v3/add';
	$data = array(
		'consumer_key' => $consumer_key, 
		'access_token' => $_SESSION['pocket_user_id'],
        'url'=>$_GET['current_url']
	);
	$options = array(
		'http' => array(
			'method'  => 'POST',
			'content' => http_build_query($data)
		)
	);
	$context  = stream_context_create($options);
	$result = @file_get_contents($url, false, $context);
	echo $result;
    die();
?>