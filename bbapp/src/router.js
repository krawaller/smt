define(['order!src/libs/jquery/jquery',
		'order!src/libs/underscore/underscore',
		'order!src/libs/backbone/backbone',
		'text!src/views/tmpl/main.html',
		'src/models/session',
		'src/views/front',
		'src/views/nav',
		'src/views/msg',
		'src/views/login',
		'src/views/user',
		'src/views/shop',
		'src/views/myorders',
		'src/views/makepayments',
		'src/views/changelog'
		], function($,_,Backbone,mainTemplate,Session,FrontView,NavView,MsgView,LoginView,UserView,ShopView,MyOrdersView,MakePaymentsView,ChangeLogView) {
	return Backbone.Router.extend({
		routes: {
			"":"index",
			"index":"index",
			"front": "index",
			"login": "login",
			"shop": "shop",
			"myorders": "myorders",
			"makepayments": "makepayments",
			"changelog": "changelog"
		},
		viewContainers: {
			"main": "#main",
			"nav": "#nav",
			"user": "#user",
			"msg": "#msg"
		},
		globalEvents: {
			loggedin: function(){ this.navigate("index",{trigger:true}); },
			loggedout: function(){ this.navigate("index",{trigger:true}); },
			navto: function(e){ this.navigate(e.destination,{trigger:true}); }
		},
		authorize: function(view){ // called by publishView, return false if not ok
			if (view.okroles){
				if (!this.session.hasroles(view.okroles)){
					this.navigate("index",{trigger:true});
					Backbone.trigger("notify",{kind:"fail",msg:"You hacker you!"});
					return false;
				}
			}
			return true;
		},
		initialize: function(opts) {
			_.bindAll(this,"authorize");
			opts.$el.html(mainTemplate);
			var session = new Session;
			this.session = session;
			// set up the interface parts
			this.navView = new NavView({session:session});
			this.publishView("nav",this.navView);
			this.publishView("user",new UserView({session:session}));
			this.publishView("msg",new MsgView);
			// global events from backbone object
			for(var evt in this.globalEvents){
				Backbone.on(evt,this.globalEvents[evt],this);
			}
		},
		index: function() { this.publishView("main",new FrontView); },
		login: function(){
			this.publishView("main",new LoginView({session:this.session}));
		},
		shop: function(){
			this.publishView("main",new ShopView({session:this.session}));
		},
		myorders: function(){
			this.publishView("main",new MyOrdersView({session:this.session}));
		},
		makepayments: function(){
			this.publishView("main",new MakePaymentsView({session:this.session}));
		},
		changelog: function(){
			console.log("Publishing unc changelog!")
			this.publishView("main",new ChangeLogView({session:this.session}));
		}
	});
});
