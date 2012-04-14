/*
Sets up backbone! Loads all the plugins, and augments some BB objects with my mixins.
We also mix in the Events into Backbone itself, to use that for global events.
*/

define(['order!src/libs/underscore/underscore',
		'order!src/libs/jquery/jquery',
		'order!src/libs/backbone/backbone-min',
		'order!src/libs/backbone/backbone-relational',
		'order!src/libs/backbone/backbone-localstorage',
		'src/libs/backbone/publisher',
		'src/libs/backbone/publishee'],
function(_,$,BB,rel,store,publisher,publishee) {
	Backbone.View = Backbone.View.extend(publishee,publisher);
	Backbone.Router = Backbone.Router.extend(publisher);
	_.extend(Backbone,Backbone.Events);
	console.log("DSALÖ","FFSSS",Backbone);
	return Backbone;
});
