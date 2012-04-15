/*
This is the frontpage view, published on the index route
Receives the session model from the router
*/
define(['src/libs/backbone/backbone',
		'src/libs/underscore/underscore',
		'src/libs/jquery/jquery',
		'text!src/views/tmpl/login.html'],
function(Backbone,_,$,tmpl){
	return Backbone.View.extend({
		okroles: ["ANONYMOUS"],
		initialize: function(opts){
			this.template = _.template(tmpl);
			this.session = opts.session;
		},
		render: function(){
			this.$el.html(this.template()).find(".loader").hide();
		},
		events: {
			"click #submit": "login"
		},
		login: function(e){
			// TODO - do some fakking serverside checking here
			e.preventDefault();
			this.$(".loader").show();
			var me = this;
			setTimeout(function(){
				console.log("name",me.$("#who").val());
				me.session.login({name:me.$("#who").val()});
			},1000);
		}
	});
});