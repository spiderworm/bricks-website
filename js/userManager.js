define(
	[
	],
	function(
	) {

		var user = {};

		function UserManager() {}

		UserManager.prototype.getCurrentUser = function() {
			return user;
		}

		var userManager = new UserManager();
		return userManager;

	}
);