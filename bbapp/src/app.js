define(['order!src/libs/underscore/underscore','order!src/libs/jquery/jquery','order!src/libs/backbone/backbone','router'],
function(_,$,Backbone,Router) {
	return {
		initialize: function(){
			var router =  new Router({});
			console.log("ROUTER",typeof router,router);
			Backbone.history.start()
		}
	};
});
