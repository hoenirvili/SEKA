<?php
session_start();
?>
<!DOCTYPE html>
<html lang="en">

<head>
    <title>SEKA - Search Engine Keywords-based Analyzer</title>
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <link href='https://fonts.googleapis.com/css?family=Lato:400,700,400italic' rel='stylesheet' type='text/css'>
    <link rel="stylesheet" href="src/lib/font-awesome-4.5.0/css/font-awesome.min.css" type="text/css">
    <link rel="stylesheet" href="src/lib/bootstrap-3.3.5/css/bootstrap.min.css" type="text/css">
    <link rel="stylesheet" href="css/index.css" type="text/css">
    <link rel="stylesheet" href="css/media.css" type="text/css">
    <link rel="stylesheet" href="css/search.css" type="text/css">
    <link rel="stylesheet" href="css/google.css" type="text/css">
</head>

<body class="search-action">
<div class="container-fluid">
    <div class="container after-search">

        <!-- HEADER PAGE -->
        <header class="row">
            <div class="col-md-4 col-sm-4 col-xs-4">
                <div class="wrapper-logo">
                    <div class="logo"></div>
                    <p class="bottom-logo-text">SE
                        <i class="k-color-search">K</i>A</p>
                </div>
            </div>
            <div class="col-md-6 col-sm-6 col-xs-5"></div>

            <!-- MENU HANDLER HERE -->
            <div class="col-md-2 col-sm-2 col-xs-3">
                <div class="menu">
                    <button class="btn btn-default pull-right menu-button">
                        <i class="fa fa-bars"></i>
                    </button>
                    <nav class="menu-side">
                        <div class="row">
                            <div class="col-md-12">
                                <i class ="fa fa-close pull-right close-menu menu-close"></i>
                            </div>
                            <div class="col-md-12">
                                <ul class="list-menu">
                                    <li><a id="save_to_pocket" href="#">Save to pocket</a></li>
                                </ul>
                            </div><!-- col-md-12 -->
                        </div><!--row-->
                    </nav><!--menu-side-->
                </div><!--menu-->
            </div><!--col-md-2 -->
        </header>




        <!-- SEARCH -->
        <div class="row">
            <div class="col-md-2"></div>
            <div class="col-md-8">
                <div class="custom-search-input">
                    <div data-container="body" data-trigger="hover" data-animation="false" data-toggle="tooltip" data-placement="top" title="Please enter valid string" class="input-group">
                        <input type="text" value="<?php if(isset($_GET['s'])) echo rawurlencode($_GET['s']); ?>" class="form-control input-lg search-bar"  maxlength=75 placeholder="Search" id="search-query" aria-describedby="search-query" />
                        <!--DropDown search filter-->
                        <div class="wrapper-filter">
                            <div class="input-group-btn">
                                <button type="button" class="btn btn-default btn-sm dropdown-toggle" data-toggle="dropdown">
                                    <span class="caret"></span>
                                </button>

                                <ul class="dropdown-menu">
                                    <li>
                                        <a href="#" class="small" data-value="DuckDuckGo" tabIndex="-1">
                                            <input <?php if(isset($_GET['DuckDuckGo'])) echo 'checked'; ?> type="checkbox"/>
                                            &nbsp;DuckDuckGo
                                        </a>
                                    </li>

                                    <li>
                                        <a href="#" class="small" data-value="Instagram" tabIndex="-1">
                                            <input <?php if(isset($_GET['Instagram'])) echo 'checked'; ?> type="checkbox"/>
                                            &nbsp;Instagram
                                        </a>
                                    </li>

                                    <li>
                                        <a href="#" class="small" data-value="Google" tabIndex="-1">
                                            <input <?php if(isset($_GET['Google'])) echo 'checked'; ?> type="checkbox"/>
                                            &nbsp;Google
                                        </a>
                                    </li>

                                    <li>
                                        <a href="#" class="small" data-value="Facebook" tabIndex="-1">
                                            <input <?php if(isset($_GET['Facebook'])) echo 'checked'; ?> type="checkbox"/>
                                            &nbsp;Facebook
                                        </a>
                                    </li>

                                    <li>
                                        <a href="#" class="small" data-value="Twitter" tabIndex="-1">
                                            <input <?php if(isset($_GET['Twitter'])) echo 'checked'; ?> type="checkbox"/>
                                            &nbsp;Twitter
                                        </a>
                                    </li>
                                </ul>
                            </div>
                        </div><!-- wrapper filer -->
							<span class="input-group-btn">
								<button class="btn btn-green" type="submit" id="search-button">
                                    <i class="fa fa-search"></i>
                                </button>
							</span>
                    </div><!--input-group-->
                </div><!--custom-seach-input-->

                <ul class="icons">
                    <li class="web <?php if(isset($_GET['category'])&&$_GET['category']=='web') echo ' active ' ?>"  title="Web Search" data-searchType="web">Web</li>
                    <li class="images<?php if(isset($_GET['category'])&&$_GET['category']=='images') echo ' active ' ?>" title="Image Search" data-searchType="images">Images</li>
                    <li class="news<?php if(isset($_GET['category'])&&$_GET['category']=='news') echo ' active ' ?>" title="News Search" data-searchType="news">News</li>
                    <li class="videos<?php if(isset($_GET['category'])&&$_GET['category']=='videos') echo ' active ' ?>" title="Video Search" data-searchType="video">Videos</li>
                </ul>


                <!--RESULTS-->
                <div class="search-results-wrapper">
                    <div class="result-category web-results facebook-results">
                        <ul>
                        </ul>
                    </div>
                    <div class="result-category web-results twitter-results">
                        <ul>
                        </ul>
                    </div>
                    <div class="result-category web-results google-results">
                        <ul>
                        </ul>
                    </div>
                    <div class="result-category web-results duckduckgo-results">
                        <ul>
                        </ul>
                    </div>

                </div><!--search result wrapper-->

            </div><!--col-md-8-->
            <div class="col-md-1"></div>
        </div><!--row-->
    </div><!--contianer-->
</div><!--container-fluid ( MAIN-CONTAINER)-->

<div class="showbox">
    <div class="loader">
        <svg class="circular" viewBox="25 25 50 50">
            <circle class="path" cx="50" cy="50" r="20" fill="none" stroke-width="2" stroke-miterlimit="10"/>
        </svg>
    </div>
</div>
<?php
if(isset($_SESSION['pocket_user_id']))
{
    echo '<div id="pocket"></div>';
}
?>
<script src="src/lib/require-2.1.22/require.js" type="text/javascript"></script>
<script src="src/lib/jquery-min/jquery-min.js"  type="text/javascript" ></script>
<script type=text/javascript>
    // afterloading src/main
    // configuration file
    require(["src/main"], function() {
        // load our own library scripts
        require(["application"], function(application) {
            // start the application
            application.start();
        });
    });
</script>
</body>
</html>
