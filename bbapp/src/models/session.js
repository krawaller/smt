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
			_.bindAll(this,"login","logout","hasrole","hasroles");
		},
		login: function(user){
			this.user = user;
			Backbone.trigger("loggedin",user);
		},
		logout: function(){
			delete this.user;
			Backbone.trigger("loggedout");
		},
		hasroles: function(roles){
			for(var i=0;i<roles.length;i++){
				if (this.hasrole(roles[i])){
					return true;
				}
			}
			return false;
		},
		hasrole: function(role){
			if (role === "ALL"){
				return true;
			}
			if (!this.user){
				return role === "ANONYMOUS";
			}
			if (this.user && role === "ANONYMOUS"){
				return false;
			}
			var ok = {
				customer: ["bob","kurt"],
				admin: ["god"]
			}[role];
			for(var i=0;i<ok.length;i++){
				if (ok[i] === this.user.name){
					return true;
				}
			}
			return false;
		}
	});
});