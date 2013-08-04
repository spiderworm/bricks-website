define(
	function() {

		function BrickMessage(type,value) {
			this.type = type;
			this.value = value;
		}

		BrickMessage.TYPES = {
			SET_INFO: 'set-info',
			FULLSCREEN: 'fullscreen'
		};

		BrickMessage.INFO_FIELDS = {
			APP_NAME: 'name',
			DEVELOPER_NAME: 'developer'
		};

		return BrickMessage;

	}
);