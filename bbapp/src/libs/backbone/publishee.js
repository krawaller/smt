/*
A module designed to be mixed in with Views that are published by objects using the Publisher mixin.
Defines the 'close' function called by publishers, and also the 'listenTo' function that should be
used instead of 'on'.
*/

define([],function(){
	return {
		_boundEvents: [],
		listenTo: function(obj,event,callback,context){
			obj.on(event,callback);
			this._boundEvents.push({obj:obj,evt:event,fun:callback,ctx:context});
		},
		close: function(){
			this.remove();
			this.off();
			this.onClose && this.onClose(); // call eventual user-defined cleanup func
			var e, evts = this._boundEvents;
			while(e=evts.shift()){
				e.obj.off(e.evt,e.fun,e.ctx);
			}
		}
	};
});