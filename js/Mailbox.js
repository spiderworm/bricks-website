define(
	[
		'./EventModel'
	],
	function(
		EventModel
	) {

		var MESSAGESRECEIVED = 'messages-received';

		function Mailbox() {
			EventModel.apply(this);
		}
		Mailbox.prototype = new EventModel();
		Mailbox.prototype.subscribeToMessages = function(callback) {
			var handler = this._subscribe(
				MESSAGESRECEIVED,
				function(brickMessages) {
					if(brickMessages && brickMessages.count() > 0)
						callback(brickMessages);
				},
				null
			);
			handler.asynchronous = false;
			return handler;
		}
		Mailbox.prototype.addMessages = function(messages) {
			this._fire(MESSAGESRECEIVED,[messages]);
		}

		return Mailbox;

	}
);