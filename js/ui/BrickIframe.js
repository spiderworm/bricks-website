define(
	[
		'ui/Widget',
		'BrickMessage',
		'BrickMessages'
	],
	function(
		Widget,
		BrickMessage,
		BrickMessages
	) {

		var MESSAGESRECEIVED = 'messages-received';

		function BrickIframe(brick) {

			var $ifr = $('<iframe src="' + brick.url + '" width="250" height="250"></iframe>');

			Widget.apply(this,[$ifr]);

			this.subscribeToMessages(function(messages) {
				messages.each(function() {
					if(this.type === BrickMessage.TYPES.SET_INFO) {
						var values = this.value;
						if(values[BrickMessage.INFO_FIELDS.APP_NAME])
							brick.appName = values[BrickMessage.INFO_FIELDS.APP_NAME];
						if(values[BrickMessage.INFO_FIELDS.DEVELOPER_NAME])
							brick.developerName = values[BrickMessage.INFO_FIELDS.DEVELOPER_NAME];
						brick.updated();
					}
				});
			});

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
		BrickIframe.prototype.sendMessage = function(brickMessage){
			this._$[0].contentWindow.postMessage(JSON.stringify(brickMessage),"*");
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

		return BrickIframe;

	}
);