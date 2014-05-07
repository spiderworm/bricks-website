define(
	[
		'react',
		'jsx!./BrickWidget'
	],
	function(
		React,
		BrickWidget
	) {

		var UserBrickWidget = React.createClass({
			render: function() {
				return (
					<BrickWidget brick={this.props.userBrick}></BrickWidget>
				);
			}
		});

		return UserBrickWidget;

	}
);