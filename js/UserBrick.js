define(
	[
		'Brick'
	],
	function(
		Brick
	) {

		function UserBrick(user,appName,url) {
			Brick.apply(this,[appName,url]);
			this.user = user;
			this.name = null;
		}

		UserBrick.prototype = new Brick();
		UserBrick.prototype.getDisplayName = function() {
			return this.name || this.appName;
		}

		return UserBrick;
	}
);