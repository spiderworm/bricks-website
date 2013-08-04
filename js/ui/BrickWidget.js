define(
	[
		'jquery',
		'ui/Widget',
		'ui/BrickIframe',
		'ui/BrickWidgetHeader',
		'BrickMessage'
	],
	function(
		$,
		Widget,
		BrickIframe,
		BrickWidgetHeader,
		BrickMessage
	) {

		function BrickWidget(brick) {
			var $main = $('<article class="brick"><div class="brick-contents"></div></article>');
			var $contents = $main.find('.brick-contents');
			Widget.apply(this,[$main,$contents]);
		
			this._fullscreen = false;

			this._header = new BrickWidgetHeader(brick);
			this.addSubWidget(this._header,false);
			this.getContents$().before(this._header.get$());

			var self = this;
			
			this._brick = brick;
			this._brick.subscribe(function() {
				self._update();
			});

			var iframe = new BrickIframe(brick);
			iframe.subscribeToMessages(function(messages) {
				messages.each(function() {
					if(this.type === BrickMessage.TYPES.FULLSCREEN) {
						self.fullscreen(this.value);
					}
				});
			});
			this.addSubWidget(iframe);

		}
		BrickWidget.prototype = new Widget();
		BrickWidget.prototype.fullscreen = function(bool) {
			if(this._fullscreen === true && bool === false) {
				this._fullscreen = false;
				this.get$().removeClass('fullscreen');
			} else if(this._fullscreen === false && bool === true) {
				this._fullscreen = true;
				this.get$().addClass('fullscreen');
			}
		}
		BrickWidget.prototype._update = function() {		
		}












		return BrickWidget;

	}
);