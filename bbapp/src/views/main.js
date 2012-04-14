define(['src/libs/backbone/backbone','src/libs/underscore/underscore',"src/libs/jquery/jquery"],
function(Backbone,_,$){
	MainView = Backbone.View.extend({
		initialize: function(options){
			this.template = _.template("<p>Halloj halloj hej!!</p>");
		},
		render: function(){
			$(this.el).html(this.template());
		}
	});
	return MainView;
});