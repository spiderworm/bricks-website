define(
	[
		'react',
		'jsx!./BrickWidgetHeader',
		'jsx!./BrickWidgetIframe',
		'../BrickMessage',
		'../BrickMessages',
		'../Mailbox'
	],
	function(
		React,
		BrickWidgetHeader,
		BrickWidgetIframe,
		BrickMessage,
		BrickMessages,
		Mailbox
	) {

		var BrickWidget = React.createClass({
			getDefaultProps: function() {
				this.__outbox = new Mailbox();

				var brick = this.props.brick;
				if(brick) {
					var widget = this;
					brick.subscribe(function() {
						widget.forceUpdate();
					});
				}
				return {
					brick: brick
				};
			},
			getInitialState: function() {
				return {
					fullscreen: false
				};
			},
			render: function() {

				var brick = this.props.brick;
				var fullscreen = this.state.fullscreen;
				var widget = this;

				return (
					<section className={"brick" + (fullscreen ? " fullscreen" : "")}>
						<BrickWidgetHeader brick={brick}></BrickWidgetHeader>
						<div className="brick-contents">
							<BrickWidgetIframe
								onMessages={function(message){widget.__handleMessages(message);}}
								outbox={this.__outbox}
								brick={brick}
							></BrickWidgetIframe>
						</div>
					</section>
				);

			},
			fullscreen: function() {
				if(this.state.fullscreen === false) {
					this.setState({fullscreen: true});
					this._sendSize();
				}
			},
			defaultSize: function() {
				if(this.state.fullscreen) {
					this.setState({fullscreen: false});
					this._sendSize();
				}
			},
			_sendSize: function() {
				var result = {
					fullscreen: this.state.fullscreen,
					defaultSize: true
				};
				if(this.state.fullscreen)
					result.defaultSize = false;

				var messages = new BrickMessages();
				messages.add(new BrickMessage(BrickMessage.TYPES.SET_SIZE,result));

				this.__sendMessages(messages);
			},
			__sendMessages: function(messages) {
				this.__outbox.addMessages(messages);
			},
			__handleMessages: function(messages) {
				var widget = this;
				messages.each(function() {
					if(this.type === BrickMessage.TYPES.SET_SIZE) {
						if(this.value === BrickMessage.VALUES.FULLSCREEN)
							widget.fullscreen();
						else if(this.value === BrickMessage.VALUES.DEFAULT_SIZE)
							widget.defaultSize();
						else
							widget.setSize(this.value.width,this.value.height);
					}
				});
			}
		});

		return BrickWidget;

	}
);