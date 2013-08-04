define(
	[
		'jquery',
		'ui/Widget'
	],
	function(
		$,
		Widget
	) {

		function BrickWidget(brick) {
			var $main = $('<article class="brick"><h1></h1><div class="brick-contents"></div></article>');
			var $contents = $main.find('.brick-contents');
			Widget.apply(this,[$main,$contents]);
		
			$main.find('> h1').text(brick.appName);

			var $ifr = $('<iframe src="' + brick.url + '" width="250" height="250"></iframe>');
			$contents.append($ifr);
		}
		BrickWidget.prototype = new Widget();

		return BrickWidget;

	}
);