/*
This is the little user login status fragment in the top right!
*/
define(['src/libs/backbone/backbone',
		'src/libs/underscore/underscore',
		'src/libs/jquery/jquery',
		'text!src/views/tmpl/user.html'],
function(Backbone,_,$,tmpl){
	return Backbone.View.extend({
		initialize: function(opts){
			this.template = _.template(tmpl);
			var me = this;
			this.session = opts.session;
			Backbone.on("loggedin",function(e){
				me.$("#name").html(e.name);
				me.$("#loggedin").show();
				me.$("#loggedout").hide();
			});
			Backbone.on("loggedout",function(){
				me.$("#loggedout").show();
				me.$("#loggedin").hide();
			});
		},
		render: function(){
			this.$el.html(this.template()).find("#loggedin").hide();
		},
		events: {
			"click button.logout": "logout",
			"click button.login": "login"
		},
		login: function(e){
			e.preventDefault();
			Backbone.trigger("navto",{destination:"login"});
		},
		logout: function(e){
			e.preventDefault();
			this.session.logout();
			Backbone.trigger("loggedout");
		}
	});
});