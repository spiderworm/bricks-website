define(
	[
		'UserBricks',
		'util/InstanceStore'
	],
	function(
		UserBricks,
		InstanceStore
	) {

		function UserBrickManager() {
			this._store = new InstanceStore();
		}
		UserBrickManager.prototype.getForUser = function(user) {
			var userBricks = this._store.get(user);
			if(!userBricks) {
				userBricks = new UserBricks(user);
				this._store.add(userBricks,[user]);
			}
			return userBricks;
		}


		var userBrickManager = new UserBrickManager();
		return userBrickManager;

	}
)