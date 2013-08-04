define(
	[
		'jquery',
		'EventModel'
	],
	function(
		$,
		EventModel
	) {

		function Widget($elem,$contents) {
			EventModel.apply(this);
			this._$ = $elem;
			this._$contents = $contents || $elem;
		}
		Widget.prototype = new EventModel();

		Widget.prototype.get$ = function() {
			return this._$;
		}

		Widget.prototype.getContents$ = function() {
			return this._$contents;
		}

		Widget.prototype.addSubWidget = function(widget,addToDOM) {
			if(addToDOM !== false)
				this._$contents.append(widget.get$());
		}

		return Widget;

	}
);