/*
This is the frontpage view, published on the index route
*/
define(['src/libs/backbone/backbone',
		'src/libs/underscore/underscore',
		'src/libs/jquery/jquery',
		'text!src/views/tmpl/front.html'],
function(Backbone,_,$,tmpl){
	MainView = Backbone.View.extend({
		initialize: function(options){
			this.template = _.template(tmpl);
		},
		render: function(){
			$(this.el).html(this.template());
		}
	});
	return MainView;
});