define(
	[
		'react',
		'../BrickMessage',
		'../BrickMessages',
		'../Mailbox'
	],
	function(
		React,
		BrickMessage,
		BrickMessages,
		Mailbox
	) {



		var BrickWidgetIframe = React.createClass({
			getDefaultProps: function() {
				this.__inbox = new Mailbox();

				var widget = this;

				this.__inbox.subscribeToMessages(function(messages) {
					var brick = widget.props.brick;
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
					widget.props.onMessages(messages);
				});

				this.props.outbox.subscribeToMessages(function(messages) {
					widget.__sendMessages(messages);
				});

				return {};
			},
			componentDidMount: function() {
				var widget = this;

				function handleMesage(event) {
					if(event.source === widget.getDOMNode().contentWindow) {
						widget.__handleRawMessages(event.data);
					}
				}

				window.addEventListener("message", handleMesage, false);
			},
			componentWillUnmount: function() {

			},
			render: function() {
				var brick = this.props.brick;

				return (
					<iframe src={brick.url} width="250" height="250"></iframe>
				);
			},
			__handleRawMessages: function(rawText) {
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
				this.__inbox.addMessages(messages);
			},
			__sendMessages: function(brickMessages){
				var win = this.getDOMNode().contentWindow;
				brickMessages.each(function() {
					win.postMessage(JSON.stringify(this),"*");
				});
			}
		});

		return BrickWidgetIframe;

	}
);