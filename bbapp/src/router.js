define(['order!src/libs/jquery/jquery',
		'order!src/libs/underscore/underscore',
		'order!src/libs/backbone/backbone',
		'text!src/views/tmpl/main.html',
		'src/views/front',
		'src/views/nav',
		'src/views/login',
		'src/views/user',
		'src/models/session'
		], function($,_,Backbone,mainTemplate,FrontView,NavView,LoginView,UserView,Session) {
	return Backbone.Router.extend({
		routes: {
			"":"index",
			"index":"index",
			"login": "login"
		},
		viewContainers: {
			"main": "#main",
			"nav": "#nav",
			"user": "#user"
		},
		globalEvents: {
			loggedin: function(){ this.navigate("index",{trigger:true}); },
			loggedout: function(){ this.navigate("index",{trigger:true}); },
			navto: function(e){ this.navigate(e.destination,{trigger:true}); }
		},
		initialize: function(opts) {
			opts.$el.html(mainTemplate);
			var session = new Session;
			this.session = session;
			this.navView = new NavView({session:session});
			this.publishView("nav",this.navView);
			this.publishView("user",new UserView({session:session}));
			// global events from backbone object
			for(var evt in this.globalEvents){
				Backbone.on(evt,this.globalEvents[evt],this);
			}
		},
		index: function() { this.publishView("main",new FrontView); },
		login: function(){ // TODO - redirect if already chosen
			this.publishView("main",new LoginView({session:this.session}));
		}
	});
});
