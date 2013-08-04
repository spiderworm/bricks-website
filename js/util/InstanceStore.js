define(
	function() {

		function InstanceStore() {
			this._items = [];
		}
		InstanceStore.prototype.get = function(signature) {
			for(var i=0; i<this._items.length; i++) {
				if(this._items[i].matchesSignature(signature)) {
					return this._items[i].instance;
				}
			}
			return null;
		}
		InstanceStore.prototype.add = function(instance,signature) {
			this._items.push(
				new Item(instance,signature)
			);
		}



		function Item(instance,signature) {
			this.instance = instance;
			this.signature = signature;
		}
		Item.prototype.matchesSignature = function(signature) {
			if(signature.length !== this.signature.length)
				return false;
			for(var i=0; i<signature.length; i++) {
				if(signature[i] !== this.signature[i])
					return false;
			}
			return true;
		}



		return InstanceStore;

	}
);