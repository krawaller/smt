/*
This is the navigation panel, always visible to the left.
The router will call the setSection function whenever we
change section. Later. :)
*/
define(['src/libs/backbone/backbone',
		'src/libs/underscore/underscore',
		'src/libs/jquery/jquery',
		'text!src/views/tmpl/nav.html'],
function(Backbone,_,$,tmpl){
	MainView = Backbone.View.extend({
		initialize: function(opts){
			this.template = _.template(tmpl);
			this.session = opts.session;
		},
		render: function(){
			$(this.el).html(this.template());
		}
	});
	return MainView;
});