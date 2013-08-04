define(
	[
		'Iterable'
	],
	function(
		Iterable
	) {

		function BrickMessages() {
			Iterable.apply(this);
			this._items = [];
		}
		BrickMessages.prototype = new Iterable();

		return BrickMessages;

	}
);