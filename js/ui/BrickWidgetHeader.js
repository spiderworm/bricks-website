define(
	[
		'react'
	],
	function(
		React
	) {

		var BrickWidgetHeader = React.createClass({
			getDefaultProps: function() {
				var brick = this.props.brick;
				if(brick) {
					var widget = this;
					brick.subscribe(
						function() {
							widget.forceUpdate();
						}
					);
				}
				return {
					brick: brick
				};
			},
			render: function() {
				return (
					<header>
						<h1>
							{this.props.brick.getDisplayName()}
						</h1>
					</header>
				);
			}
		});

		return BrickWidgetHeader;

	}
);