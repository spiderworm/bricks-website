define(
	[
		'jquery'
	],
	function(
		$
	) {

		function Widget($elem,$contents) {
			this._$ = $elem;
			this._$contents = $contents || $elem;
		}

		Widget.prototype.get$ = function() {
			return this._$;
		}

		Widget.prototype.getContents$ = function() {
			return this._$contents;
		}

		Widget.prototype.addSubWidget = function(widget) {
			this._$contents.append(widget.get$());
		}

		return Widget;

	}
);