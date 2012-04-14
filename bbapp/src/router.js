define(['order!src/libs/jquery/jquery',
		'order!src/libs/underscore/underscore',
		'order!src/libs/backbone/backbone',
		'src/views/main.js'], function($,_,Backbone,mainView) {
	return Backbone.Router.extend({
		routes: {
			"":"index",
		},
		viewContainers: {
			"main": "#main",
		},
		initialize: function(opts) {

		},
		index: function() { this.publishView("main",new mainView); }
	});
});
