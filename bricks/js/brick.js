
function Brick() {
	
}
Brick.prototype.fullscreen = function(bool) {
	this._sendMessage(
		new Brick.Message('fullscreen',bool)
	);
}
Brick.prototype.setInfo = function(vars) {
	var message = new Brick.Message('set-info',vars);
	this._sendMessage(message);
}
Brick.prototype._sendMessage = function(brickMessage) {
	var messages = [];
	messages.push(brickMessage);
	this._sendMessages(messages);
}
Brick.prototype._sendMessages = function(brickMessages) {
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



Brick.Message = function(type,value) {
	this.type = type;
	this.value = value;
}

window.brick = new Brick();