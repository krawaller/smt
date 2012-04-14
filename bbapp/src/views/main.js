define(['src/libs/backbone/backbone','src/libs/underscore/underscore',"src/libs/jquery/jquery"],
function(Backbone,_,$){
	MainView = Backbone.View.extend({
		initialize: function(options){
			this.template = _.template("<p>Halloj halloj hej!!</p>");
		},
		render: function(){
			console.log("WTF=!=!=!=!",$);
			for(var p in $){
				console.log(p,$[p]);
			}
			$(this.el).html(this.template());
		}
	});
	return MainView;
});