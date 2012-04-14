define(['order!src/libs/underscore/underscore', 'order!src/libs/jquery/jquery', 'order!src/libs/backbone/backbone-min','src/libs/backbone/publisher','src/libs/backbone/publishee'],
function(_,$,BB,publisher,publishee) {
	Backbone.View = Backbone.View.extend(publishee,publisher);
	Backbone.Router = Backbone.Router.extend(publisher);
	return Backbone.noConflict();
});
