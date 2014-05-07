define(
	[
		"react",
		"../userManager",
		"jsx!./UserBricksWidget"
	],
	function(
		React,
		userManager,
		UserBricksWidget
	) {

		var BricksUI = React.createClass({
			getDefaultProps: function() {
				return {
					user: userManager.getCurrentUser()
				};
			},
			getInitialState: function() {
				return {};
			},
			render: function() {
				var user = this.props.user;
				return (
					<article className="bricks-ui">
						<h1>Bricks!</h1>
						<UserBricksWidget user={user}></UserBricksWidget>
					</article>
				);
			}
		});

		return BricksUI;

	}
);