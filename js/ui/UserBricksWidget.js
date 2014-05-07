define(
	[
		"react",
		"jsx!./UserBrickWidget",
		"../userBrickManager",
		"../UserBrick"
	],
	function(
		React,
		UserBrickWidget,
		userBrickManager,
		UserBrick
	) {

		var UserBricksWidget = React.createClass({
			getDefaultProps: function() {
				var user = this.props.user;
				var userBricks;
				if(user) {
					userBricks = userBrickManager.getForUser(user);

					var brickArray = [];

					brickArray.push(
						new UserBrick(user,"test one","./bricks/one")
					);

					brickArray.push(
						new UserBrick(user,"Regex Visualizer","http://www.regexplained.co.uk/")
					);

					brickArray.push(
						new UserBrick(user,"Calculator","./bricks/calculator")
					);

					userBricks.add(brickArray);

					var widget = this;
					userBricks.subscribe(function() {
						widget.forceUpdate();
					});
				}
				return {
					user: null,
					userBricks: userBricks
				};
			},
			render: function() {
			
				return (
					<section className="user-bricks-widget">
						<h1>Your Bricks</h1>
						{this.props.userBricks.toArray().map(function(userBrick) {
							return <UserBrickWidget userBrick={userBrick}></UserBrickWidget>;
						})}
					</section>
				);

			}
		});

		return UserBricksWidget;

	}
);