(function() {




	function Events() {
		this._handlers = {};
	}
	Events.prototype._on = function(type,callback) {
		if(!this._handlers[type])
			this._handlers[type] = [];

		var handler = new Events.Handler(this,type,callback);
		this._handlers[type].push(handler);
		return handler;
	}
	Events.prototype._subscribe = function(type,callback,args) {
		var handler = this._on(type,callback);
		handler.fire(args);
		return handler;
	}
	Events.prototype._fire = function(type,args) {
		var handlers = this.__getHandlersCopy(type);

		for(var i=0; i<handlers.length; i++) {
			handlers[i].fire(args);
		}
	}
	Events.prototype.__getHandlers = function(type) {
		if(!this._handlers[type])
			this._handlers[type] = [];

		return this._handlers[type];
	}
	Events.prototype.__getHandlersCopy = function(type) {
		return [].concat(this.__getHandlers(type));
	}
	Events.prototype.__addHandler = function(type,handler) {
		var handlers = this.__getHandlers(type);
		handlers.push(handler);
	}
	Events.prototype.__removeHandler = function(type,handler) {
		var handlers = this.__getHandlers(type);
		var i = handlers.indexOf(handler);
		if(i > -1)
			handlers.splice(i,1);
		if(handlers.length === 0)
			this.__removeHandlerType(type);
	}
	Events.prototype.__removeHandlerType = function(type) {
		delete this._handlers[type];
	}




	Events.Handler = function (eventObject,type,callback) {
		this._eventObject = eventObject;
		this._callback = callback;
		this._type = type;
		this._on = true;
		this.asynchronous = true;
	}
	Events.Handler.prototype.off = function() {
		if(this._on) {
			this._on = false;
			this._eventObject.__removeHandler(this._type,this);
		}
	}
	Events.Handler.prototype.on = function() {
		if(!this._on) {
			this._on = true;
			this._eventObject.__addHandler(this._type,this);
		}
	}
	Events.Handler.prototype.fire = function(args) {
		if(this.asynchronous) {
			var handler = this;
			setTimeout(function() {
				handler._callback.apply(handler._eventObject,args);
			}, 0);
		} else {
			this._callback.apply(this._eventObject,args);
		}
	}



	Brick.Messenger = function() {
		Events.apply(this);
		var messenger = this;
		window.addEventListener('message',function(e) {
			if(e.source === window.parent) {
				try {
					var result = JSON.parse(e.data);
				} catch(e) {
					return;
				}
				if(!result.hasOwnProperty('type'))
					return;
				var message = new Brick.Message(result.type,result.value);
				messenger._fire(Brick.Messenger.MESSAGE_RECEIVED,[message]);
			}
		});
	}
	Brick.Messenger.MESSAGE_RECEIVED = 'message-received';
	Brick.Messenger.prototype = new Events();
	Brick.Messenger.prototype._onMessage = function(handler) {
		this._on(Brick.Messenger.MESSAGE_RECEIVED,handler);
	}
	Brick.Messenger.prototype._sendMessage = function(brickMessage) {
		var messages = [];
		messages.push(brickMessage);
		this._sendMessages(messages);
	}
	Brick.Messenger.prototype._sendMessages = function(brickMessages) {
		var result = [];
		for(var i=0; i<brickMessages.length; i++) {
			result.push({
				type: brickMessages[i].type,
				value: brickMessages[i].value
			});
		}
		result = JSON.stringify(result);
		window.parent.postMessage(result,"*");
	}








	function Brick() {
		Brick.Messenger.apply(this);
		var brick = this;
		window.addEventListener('keydown',function(e) {
			if (e.keyCode == 27) {
				brick.defaultSize();
			}
		},true);
		this._onMessage(function(brickMessage) {
			if(brickMessage.type === Brick.MESSAGES.SET_SIZE)
				brick._fire(Brick.EVENTS.SIZE_UPDATE,[brickMessage.value]);
		});
	}
	Brick.EVENTS = {
		SIZE_UPDATE: 'size-update'
	}
	Brick.MESSAGES = {
		SET_SIZE: 'set-size',
		SET_INFO: 'set-info',
		FULLSCREEN: 'fullscreen',
		DEFAULT_SIZE: 'default-size'
	}
	Brick.prototype = new Brick.Messenger();
	Brick.prototype.fullscreen = function() {
		this._sendMessage(
			new Brick.Message(Brick.MESSAGES.SET_SIZE,Brick.MESSAGES.FULLSCREEN)
		);
	}
	Brick.prototype.defaultSize = function() {
		this._sendMessage(
			new Brick.Message(Brick.MESSAGES.SET_SIZE,Brick.MESSAGES.DEFAULT_SIZE)
		);
	}
	Brick.prototype.onSizeUpdate = function(handler){
		this._on(Brick.EVENTS.SIZE_UPDATE,handler);
	}
	Brick.prototype.setInfo = function(vars) {
		var message = new Brick.Message(Brick.MESSAGES.SET_INFO,vars);
		this._sendMessage(message);
	}







	Brick.Message = function(type,value) {
		this.type = type;
		this.value = value;
	}






	window.brick = new Brick();

})();