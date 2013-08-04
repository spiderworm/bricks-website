define(
	[
		'EventModel'
	],
	function(
		EventModel
	) {

		var UPDATED = 'UPDATED';

		function Brick(appName,url) {
			EventModel.apply(this);
			this.appName = appName;
			this.url = url;
		}
		Brick.prototype = new EventModel();
		Brick.prototype.subscribe = function(handler) {
			this._subscribe(UPDATED,handler,[this]);
		}
		Brick.prototype.updated = function() {
			this._fire(UPDATED);
		}
		Brick.prototype.getDisplayName = function() {
			return this.appName;
		}

		return Brick;

	}
);