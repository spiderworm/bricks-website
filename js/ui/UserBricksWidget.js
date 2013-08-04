define(
	[
		'ui/Widget',
		'ui/BricksWidget'
	],
	function(
		Widget,
		BricksWidget
	) {

		function UserBricksWidget(userBricks) {
			var $elem = $('<div class="user-bricks-widget"></div>');
			Widget.apply(this,[$elem]);

			this._bricksWidget = new BricksWidget(userBricks);
			this.addSubWidget(this._bricksWidget);
		}
		UserBricksWidget.prototype = new Widget();

		return UserBricksWidget;

	}
);