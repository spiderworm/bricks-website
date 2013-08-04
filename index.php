<?php

require_once("../Sight/Sight.php");

$sight = new Sight("Bricks");

$sight->routeError(404,"pages/404.html");

$sight->setDefaultTemplate("includes/template.html");

$sight->route(
	"/^bricks\/(.*)$/",
	"bricks/app/$1/index.html",
	function($response,$urlMatches) {
		$response->data->set('defaultTemplate','bricks/includes/template.html');
	}
);

$sight->route(
	"/^.*$/",
	"pages/$0.html"
);

$sight->respond();
