define(
	[
		'jquery',
		'ui/Widget',
		'ui/BrickWidget',
		'util/InstanceStore'
	],
	function(
		$,
		Widget,
		BrickWidget,
		InstanceStore
	) {

		function BricksWidget(bricks) {
			var $main = $('<div class="bricks-widget"></div>');
			Widget.apply(this,[$main]);
			var self = this;

			this._brickWidgets = new InstanceStore();

			if(bricks) {

				bricks.subscribe(function(bricks) {
					self._addBricks(bricks);
				});

				bricks.onRemove(function(bricks) {
					self._removeBricks(bricks);
				});
			}
		}

		BricksWidget.prototype = new Widget();
		BricksWidget.prototype._addBricks = function(bricks) {
			for(var i=0; i<bricks.length; i++) {
				this._addBrick(bricks[i]);
			}
		}

		BricksWidget.prototype._addBrick = function(brick) {
			var brickWidget = this._brickWidgets.get([brick]);
			if(!brickWidget) {
				brickWidget = new BrickWidget(brick);
				this._brickWidgets.add(brickWidget,[brick]);
			}
			if(brickWidget.get$()[0].parentNode !== this.getContents$()[0])
				this.getContents$().append(brickWidget.get$());
		}

		return BricksWidget;


	}
);