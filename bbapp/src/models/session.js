/*
Object initialized and owned by the router, injected into interested views. Holds the 
authentication information, and functions to query for roles etc.

Eventually, this object will query the cookie for data.
*/
define(['src/libs/backbone/backbone',
		'src/libs/underscore/underscore',
		'src/libs/jquery/jquery'],
function(Backbone,_,$){
	return Backbone.Model.extend({
		initialize: function(otps){
			
		},
		login: function(user){
			this.user = user;
			Backbone.trigger("loggedin",user);
		},
		logout: function(){
			delete this.user;
			Backbone.trigger("loggedout");
		}
	});
});