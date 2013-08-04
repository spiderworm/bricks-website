define(
	[
	],
	function(
	) {

		function Iterable() {

		}
		Iterable.prototype.add = function(item) {
			this._items.push(item);
		}
		Iterable.prototype.count = function() {
			return this._items.length;
		}
		Iterable.prototype.each = function(callback) {
			for(var i=0; i<this._items.length; i++) {
				callback.apply(this._items[i]);
			}
		}

		return Iterable;
	}
);