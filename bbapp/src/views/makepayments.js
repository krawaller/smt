/*

*/
define(['src/libs/backbone/backbone',
		'src/libs/underscore/underscore',
		'src/libs/jquery/jquery',
		'text!src/views/tmpl/makepayments.html'],
function(Backbone,_,$,tmpl){
	return Backbone.View.extend({
		okroles: ["admin"],
		initialize: function(options){
			this.template = _.template(tmpl);
		},
		render: function(){
			$(this.el).html(this.template());
		}
	});
});