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

			this._iframe = new BrickIframe(brick);
			this._iframe.subscribeToMessages(function(messages) {
				messages.each(function() {
					if(this.type === BrickMessage.TYPES.SET_SIZE) {
						if(this.value === BrickMessage.VALUES.FULLSCREEN)
							self.fullscreen();
						else if(this.value === BrickMessage.VALUES.DEFAULT_SIZE)
							self.defaultSize();
						else
							self.setSize(this.value.width,this.value.height);
					}
				});
			});
			this.addSubWidget(this._iframe);

		}
		BrickWidget.prototype = new Widget();
		BrickWidget.prototype.fullscreen = function() {
			if(this._fullscreen === false) {
				this._fullscreen = true;
				this.get$().addClass('fullscreen');
				this._sendSize();
			}
		}
		BrickWidget.prototype.defaultSize = function() {
			if(this._fullscreen) {
				this._fullscreen = false;
				this.get$().removeClass('fullscreen');
				this._sendSize();
			}
		}
		BrickWidget.prototype._sendSize = function() {
			var result = {
				fullscreen: this._fullscreen,
				defaultSize: true
			};
			if(this._fullscreen)
				result.defaultSize = false;

			this._iframe.sendMessage(
				new BrickMessage(BrickMessage.TYPES.SET_SIZE,result)
			);
		}
		BrickWidget.prototype._update = function() {		
		}












		return BrickWidget;

	}
);