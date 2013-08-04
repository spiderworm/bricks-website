define(
	[
		'ui/Widget',
	],
	function(
		Widget
	) {

		function BrickWidgetHeader(brick) {
			var $main = $('<header><h1></h1></header>');
			Widget.apply(this,[$main]);

			this._brick = brick;

			brick.subscribe(function() {
				$main.find('> h1').text(brick.getDisplayName());
			});
		}

		BrickWidgetHeader.prototype = new Widget();

		return BrickWidgetHeader;

	}
);