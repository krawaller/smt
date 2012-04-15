/*
This is the msg panel! It listens to the global 'notify' event, and adds msgs as 
it hears them.
*/
define(['src/libs/backbone/backbone',
		'src/libs/underscore/underscore',
		'src/libs/jquery/jquery'
],
function(Backbone,_,$){
	MainView = Backbone.View.extend({
		tagName: "ul",
		className: "msg",
		initialize: function(opts){
			_.bindAll(this,"addmsg");
			Backbone.on("notify",this.addmsg);
		},
		addmsg: function(o){
			var msg = $("<li class='"+o.kind+"'>"+o.msg+"</li>"),
				me = this;
			this.$el.append(msg);
			setTimeout(function(){
				msg.remove();
			},2000)
		}
	});
	return MainView;
});