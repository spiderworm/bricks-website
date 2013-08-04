define(
	[
		'jquery',
		'ui/Widget',
		'BrickMessage',
		'BrickMessages'
	],
	function(
		$,
		Widget,
		BrickMessage,
		BrickMessages
	) {

		var MESSAGETYPES = {
			SETINFO: 'set-info',
			FULLSCREEN: 'fullscreen'
		};

		MESSAGE_INFO_FIELDS = {
			APP_NAME: 'name',
			DEVELOPER_NAME: 'developer'
		};

		function BrickWidget(brick) {
			var $main = $('<article class="brick"><h1></h1><div class="brick-contents"></div></article>');
			var $contents = $main.find('.brick-contents');
			Widget.apply(this,[$main,$contents]);
		
			this._fullscreen = false;

			var self = this;
			
			this._brick = brick;
			this._brick.subscribe(function() {
				self._update();
			});

			var iframe = new BrickIframe(brick.url);
			iframe.subscribeToMessages(function(messages) {
				messages.each(function() {
					if(this.type === MESSAGETYPES.SETINFO) {
						self._setInfo(this.value);
					}
					if(this.type === MESSAGETYPES.FULLSCREEN) {
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
		BrickWidget.prototype._setInfo = function(values) {
			if(values[MESSAGE_INFO_FIELDS.APP_NAME])
				this._brick.appName = values[MESSAGE_INFO_FIELDS.APP_NAME];
			if(values[MESSAGE_INFO_FIELDS.DEVELOPER_NAME])
				this._brick.developerName = values[MESSAGE_INFO_FIELDS.DEVELOPER_NAME];
			this._brick.updated();
		}
		BrickWidget.prototype._update = function() {		
			this.get$().find('> h1').text(this._brick.getDisplayName());
		}







		var MESSAGESRECEIVED = 'messages-received';

		function BrickIframe(url) {

			var $ifr = $('<iframe src="' + url + '" width="250" height="250"></iframe>');

			Widget.apply(this,[$ifr]);

			var self = this;
			function handleMesage(event) {
				if(event.source === $ifr[0].contentWindow) {
					self._handleRawMessage(event.data);
				}
			}

			window.addEventListener("message",handleMesage, false);
		}
		BrickIframe.prototype = new Widget();
		BrickIframe.prototype.subscribeToMessages = function(callback) {
			return this._subscribe(
				MESSAGESRECEIVED,
				function(brickMessages) {
					if(brickMessages && brickMessages.count() > 0)
						callback(brickMessages);
				},
				null
			);
		}
		BrickIframe.prototype._handleRawMessage = function(rawText) {
			var messages = new BrickMessages();
			var rawMessages = [];
			try {
				rawMessages = JSON.parse(rawText);
			} catch(e) {
				debugger;
			}
			for(var i=0; i<rawMessages.length; i++) {
				var message = new BrickMessage(rawMessages[i].type,rawMessages[i].value);
				messages.add(message);
			}
			this._fire(MESSAGESRECEIVED,[messages]);
		}






		return BrickWidget;

	}
);