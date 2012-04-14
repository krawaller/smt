/*
A simple bootstrapper, that will just load the application and initialize it.
It is also responsible for configuring require.js (although I can't get the
paths to work, so no other files uses them :P)
*/
require.config({
	paths: {
		loader: 'src/libs/backbone/loader',
		jQuery: 'src/libs/jquery/jquery',
		Underscore: 'src/libs/underscore/underscore',
		Backbone: 'src/libs/backbone/backbone',
		router: 'src/router',
		app: 'src/app',
		order: 'src/libs/require/order', // require.js plugin, automagically loaded
		text: 'src/libs/require/text' // require.js plugin, automagically loaded
	}
});

require(['app'], function(App) {
	App.initialize();
});
