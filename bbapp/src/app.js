define(['order!src/libs/underscore/underscore','order!src/libs/jquery/jquery','order!src/libs/backbone/backbone','router'],
function(_,$,Backbone,Router) {
	return {
		initialize: function(){
			var router =  new Router({
				$el: $("#wrapper")
			});
			Backbone.history.start({pushState: false});
		}
	};
});
