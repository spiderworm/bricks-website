define(
	[
		'Bricks'
	],
	function(
		Bricks
	) {


		function UserBricks(user) {
			Bricks.apply(this);
		}
		UserBricks.prototype = new Bricks();


		return UserBricks;
		
	}
);