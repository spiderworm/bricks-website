define(
	function() {

		function BrickMessage(type,value) {
			this.type = type;
			this.value = value;
		}

		BrickMessage.TYPES = {
			SET_INFO: 'set-info',
			SET_SIZE: 'set-size'
		};

		BrickMessage.VALUES = {
			FULLSCREEN: 'fullscreen',
			DEFAULT_SIZE: 'default-size'
		};

		BrickMessage.INFO_FIELDS = {
			APP_NAME: 'name',
			DEVELOPER_NAME: 'developer'
		};

		return BrickMessage;

	}
);