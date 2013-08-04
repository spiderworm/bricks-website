define(
	[
		'EventModel'
	],
	function(
		EventModel
	) {

		var BRICKS_ADDED = "bricks-added";

		function Bricks() {
			EventModel.apply(this);
			this._bricks = [];
		}
		Bricks.prototype = new EventModel();
		Bricks.prototype.subscribe = function(callback) {
			this._subscribe(
				BRICKS_ADDED,
				callback,
				[copyArray(this._bricks)]
			);
		}
		Bricks.prototype.onRemove = function() {

		}
		Bricks.prototype.add = function(arr) {
			for(var i=0; i<arr.length; i++) {
				this._bricks.push(arr[i]);
			}
			this._fire(BRICKS_ADDED,[copyArray(arr)]);
		}
		Bricks.prototype.toArray = function() {
			return copyArray(this._bricks);
		}


		function copyArray(arr) {
			return [].concat(arr);
		}

		return Bricks;

	}
);