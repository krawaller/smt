/*
This is the navigation panel, always visible to the left.
The router will call the setSection function whenever we
change section. Later. :)
*/
define(['src/libs/backbone/backbone',
		'src/libs/underscore/underscore',
		'src/libs/jquery/jquery'
],
function(Backbone,_,$){
	MainView = Backbone.View.extend({
		tagName: "ul",
		initialize: function(opts){
			this.session = opts.session;
			_.bindAll(this,"render");
			Backbone.on("loggedin",this.render);
			Backbone.on("loggedout",this.render);
		},
		render: function(){
			var links = {
				"front": "ALL",
				"login": "ANONYMOUS",
				"shop": "customer",
				"myorders": "customer",
				"makepayments": "admin",
				"changelog": "ALL"
			};
			this.$el.empty();
			for(var link in links){
				if (this.session.hasrole(links[link])){
					this.$el.append("<li dest="+link+">"+link+"</li>");
				}
			}
		},
		events: {
			"click li": function(e){
				Backbone.trigger("navto",{destination:e.target.getAttribute("dest")});
			}
		}
	});
	return MainView;
});